import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";
import pg from "pg";
import { getTableConfig } from "drizzle-orm/pg-core";
import {
  applicationStatusEnum,
  applicationTypeEnum,
  recruitmentApplications,
  waitlistEntries,
} from "../shared/schema";

if (!process.argv.includes("--development-test") || process.env.NODE_ENV === "production") {
  throw new Error("Run only against the development database with --development-test.");
}

// A transaction-local sandbox: no real application table is altered.
// Synthetic roles, schema, rows and default grants are all rolled back.
const suffix = randomBytes(6).toString("hex");
const namespace = `recruitment_setup_test_${suffix}`;
const roles = ["anon", "authenticated", "service_role"] as const;
const testRoles = roles.map((role) => `setup_${role}_${suffix}`);
const source = await readFile("supabase/recruitment-setup.sql", "utf8");
let sql = source.replace(/^BEGIN;\s*$/m, "").replace(/^COMMIT;\s*$/m, "");
sql = sql.replace(/\bpublic\b/g, namespace);
roles.forEach((role, i) => {
  sql = sql.replace(new RegExp(`\\b${role}\\b`, "g"), testRoles[i]);
});

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const client = await pool.connect();
try {
  await client.query("BEGIN");
  await client.query(`CREATE SCHEMA ${namespace}`);
  for (const role of testRoles) await client.query(`CREATE ROLE ${role} NOLOGIN`);
  // Supabase grants Data API roles access to new public tables by default.
  // Simulate that before proving the setup removes it.
  const grantees = `PUBLIC, ${testRoles.join(", ")}`;
  await client.query(
    `ALTER DEFAULT PRIVILEGES IN SCHEMA ${namespace} GRANT ALL ON TABLES TO ${grantees}`,
  );
  await client.query(
    `ALTER DEFAULT PRIVILEGES IN SCHEMA ${namespace} GRANT ALL ON SEQUENCES TO ${grantees}`,
  );
  await client.query(sql);

  for (const table of [waitlistEntries, recruitmentApplications]) {
    const config = getTableConfig(table);
    const { rows } = await client.query(
      `SELECT column_name, is_nullable FROM information_schema.columns
       WHERE table_schema = $1 AND table_name = $2 ORDER BY ordinal_position`,
      [namespace, config.name],
    );
    assert.deepEqual(
      rows.map((row) => [row.column_name, row.is_nullable === "NO"]),
      config.columns.map((column) => [column.name, column.notNull]),
      `${config.name}: bootstrap columns/nullability must match the current backend`,
    );
    for (const role of testRoles) {
      const access = await client.query(
        `SELECT has_table_privilege($1, $2, 'SELECT') AS readable,
         has_table_privilege($1, $2, 'INSERT') AS writable,
         has_sequence_privilege($1, $3, 'USAGE') AS sequence_access`,
        [role, `${namespace}.${config.name}`, `${namespace}.${config.name}_id_seq`],
      );
      assert.deepEqual(access.rows[0], {
        readable: false, writable: false, sequence_access: false,
      });
    }
  }
  for (const type of [applicationTypeEnum, applicationStatusEnum]) {
    const result = await client.query(
      `SELECT e.enumlabel FROM pg_enum e JOIN pg_type t ON t.oid = e.enumtypid
       JOIN pg_namespace n ON n.oid = t.typnamespace
       WHERE n.nspname = $1 AND t.typname = $2 ORDER BY e.enumsortorder`,
      [namespace, type.enumName],
    );
    assert.deepEqual(result.rows.map((row) => row.enumlabel), type.enumValues);
  }
  const rls = await client.query(
    `SELECT relrowsecurity FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
     WHERE n.nspname = $1 AND c.relname IN ('waitlist_entries', 'recruitment_applications')`,
    [namespace],
  );
  assert.equal(rls.rowCount, 2);
  assert(rls.rows.every((row) => row.relrowsecurity));

  const applications = `${namespace}.recruitment_applications`;
  const insert = `INSERT INTO ${applications}
    (application_type, first_name, last_name, email, phone, city_area, contact_consent)
    VALUES ($1, 'Synthetic', 'Test', 'setup-test@example.invalid', '4165550100', 'Toronto', true)
    RETURNING *`;
  for (const type of ["vendor", "driver"]) {
    const saved = (await client.query(insert, [type])).rows[0];
    assert.equal(saved.status, "New");
    assert.equal(saved.source, "jije.ca");
    assert.equal(saved.marketing_consent, false);
    assert(saved.created_at && saved.updated_at && saved.id);
  }
  await client.query("SAVEPOINT duplicate_check");
  await assert.rejects(client.query(insert, ["vendor"]), { code: "23505" });
  await client.query("ROLLBACK TO SAVEPOINT duplicate_check");

  await client.query("SAVEPOINT repeat_check");
  await assert.rejects(client.query(sql), /not an empty recruitment database/);
  await client.query("ROLLBACK TO SAVEPOINT repeat_check");
  console.log("PASS: backend schema, enum values, defaults, duplicate handling, RLS/API grants, and repeat-run protection.");
} finally {
  await client.query("ROLLBACK");
  client.release();
  await pool.end();
}
console.log("PASS: all synthetic schema, roles and test records rolled back; no email or production access.");
