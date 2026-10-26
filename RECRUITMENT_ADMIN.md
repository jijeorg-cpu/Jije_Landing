# Recruitment application administration

Vendor and driver interest registrations are stored in the existing PostgreSQL database in
`recruitment_applications`. They are recruitment leads only and do not create marketplace
accounts.

## Review applications

Authorized team members can use the Replit Database SQL editor:

```sql
SELECT
  id,
  application_type,
  status,
  business_name,
  first_name,
  last_name,
  email,
  phone,
  city_area,
  vehicle_type,
  created_at
FROM recruitment_applications
ORDER BY created_at DESC;
```

## Update review status

Valid statuses are `New`, `Contacted`, `Under Review`, `Approved`, and `Declined`.

```sql
UPDATE recruitment_applications
SET status = 'Contacted', updated_at = NOW()
WHERE id = 123;
```

## CSV export

Use the Database table export control when available, or run this from an authorized shell:

```bash
psql "$DATABASE_URL" -c "\copy (SELECT * FROM recruitment_applications ORDER BY created_at DESC) TO 'recruitment-applications.csv' CSV HEADER"
```

Keep exports outside public application directories and share them only with authorized Jíjé
team members because they contain personal information.

## Email notifications

New vendor and driver applications send a plain-text team notification using Purelymail,
after the database insert succeeds. The sender and recipient are configured as the existing
Jíjé admin mailbox. Applicant receipts are not enabled; their wording needs separate approval.

Server-only configuration:

- `PURELYMAIL_SMTP_USER`: full mailbox address.
- `PURELYMAIL_SMTP_PASSWORD`: mailbox SMTP password, preferably a dedicated app password,
  stored only in Replit Secrets. An app password is required when two-factor authentication
  is enabled. Never put the password in source control or logs.
- `RECRUITMENT_EMAIL_FROM`: authorized sender email address.
- `RECRUITMENT_EMAIL_TO`: team recipient email address.

Purelymail uses `smtp.purelymail.com`, port 465, with SSL/TLS and certificate verification.
See https://purelymail.com/docs/setup/technical for provider instructions.
Keep these settings available in each environment where notifications should run.

The notification includes the application ID, contact details, city/area, and business or
vehicle summary. Full responses remain in the database. Keep mailbox access restricted to
authorized reviewers.

SMTP has bounded connection/socket timeouts. A delivery/configuration failure is logged as
`Recruitment notification failed; application remains saved.` with the application ID/type
only. The submission still returns success and the application stays in the database.
Duplicate, invalid, rate-limited, and honeypot submissions do not send mail.

There is no automatic retry or historical backfill. Review the database regularly; if an
alert fails, use the logged ID to locate the saved application. SMTP acceptance is not a
guarantee of inbox delivery: check spam and Purelymail delivery status when troubleshooting.

## Privacy review

The current website does not include a privacy policy route. Before deployment, Jíjé should
publish or link an approved privacy policy covering recruitment application data, retention,
access, and contact/marketing consent.
