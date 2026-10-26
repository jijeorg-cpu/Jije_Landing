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

No outbound email provider is configured in this project, so application persistence does not
depend on email and no notification or acknowledgment emails are currently sent. Add a provider
and recipient environment variable only after the team selects an approved email service.

## Privacy review

The current website does not include a privacy policy route. Before deployment, Jíjé should
publish or link an approved privacy policy covering recruitment application data, retention,
access, and contact/marketing consent.
