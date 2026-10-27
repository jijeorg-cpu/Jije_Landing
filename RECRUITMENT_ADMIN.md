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
Jíjé admin mailbox. Newly saved applicants also receive a separate, approved plain-text
confirmation. The user approved both bodies and sender details before enablement.

Applicant confirmations use `Jíjé Recruitment <admin@jije.ca>` as the sender, with replies
going to `admin@jije.ca` (the configured `RECRUITMENT_EMAIL_FROM`). Subjects are
`Jíjé — vendor interest registration received` and
`Jíjé — driver interest registration received`. Vendor greetings use the submitted business
name; driver greetings use the submitted first name.

### Approved applicant copy

Vendor body (`[Vendor Name]` is the business name):

```text
Hi [Vendor Name],

Thanks for your interest in partnering with Jíjé!

We’ve received your submission and are excited to explore how we can help your business reach more customers through our marketplace.

Our team will review your information and be in touch with the next steps.

We look forward to working with you!

Please note: This confirms your interest registration only—not approval or account creation or activation. Commercial terms and launch timing are not yet finalized.

The Jíjé Team
```

Driver body:

```text
Hi [First Name],

Thanks for your interest in delivering with Jíjé!

We’ve received your submission and are excited to explore how you could help connect customers with food and groceries through our marketplace.

Our team will review your information and be in touch with the next steps.

We look forward to exploring this opportunity with you!

Please note: This confirms your interest registration only—not approval or account creation or activation. Commercial terms and launch timing are not yet finalized.

The Jíjé Team
```

### Configuration and delivery

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
only. Applicant receipt failures use
`Recruitment receipt failed; application remains saved.` with the same non-personal fields.
Team alerts and applicant confirmations are attempted independently, so either may succeed
when the other fails. The submission still returns success and the application stays in the database.
Duplicate, invalid, rate-limited, and honeypot submissions do not send mail.
Database failures (including concurrent duplicate inserts rejected by the unique constraint)
do not send either email. Duplicate submissions never resend a confirmation.

There is no automatic retry or historical backfill. Review the database regularly; if an
alert fails, use the logged ID to locate the saved application. SMTP acceptance is not a
guarantee of inbox delivery: check spam and Purelymail delivery status when troubleshooting.
Run the isolated mail and route tests without sending live email:
`node --import tsx --test server/recruitment-notifications.test.ts`.

## Privacy review

The current website does not include a privacy policy route. Before deployment, Jíjé should
publish or link an approved privacy policy covering recruitment application data, retention,
access, and contact/marketing consent.
