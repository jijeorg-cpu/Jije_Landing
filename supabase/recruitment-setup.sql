-- ONE-TIME SETUP: run only in the new jije-recruitment-production project.
-- Confirm Free plan and Canada Central (ca-central-1) in Supabase first.
-- This script contains no passwords and copies no development or marketplace data.
-- It deliberately refuses an existing public application schema.
-- Never put this script in a build command or application startup hook.

BEGIN;

DO $guard$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
  ) OR EXISTS (
    SELECT 1 FROM pg_type t JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE n.nspname = 'public'
      AND t.typname IN ('application_type', 'application_status')
  ) THEN
    RAISE EXCEPTION 'Setup stopped: this is not an empty recruitment database. Check the project; do not delete existing objects.';
  END IF;
END;
$guard$;

CREATE TYPE public.application_type AS ENUM ('vendor', 'driver');
CREATE TYPE public.application_status AS ENUM (
  'New', 'Contacted', 'Under Review', 'Approved', 'Declined'
);

CREATE TABLE public.waitlist_entries (
  id serial PRIMARY KEY,
  email text NOT NULL UNIQUE,
  created_at timestamp DEFAULT now()
);

CREATE TABLE public.recruitment_applications (
  id serial PRIMARY KEY,
  application_type public.application_type NOT NULL,
  status public.application_status NOT NULL DEFAULT 'New',
  source text NOT NULL DEFAULT 'jije.ca',
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  city_area text NOT NULL,
  contact_consent boolean NOT NULL,
  marketing_consent boolean NOT NULL DEFAULT false,
  business_name text,
  business_type text,
  business_address text,
  website_or_instagram text,
  business_description text,
  current_operations text,
  vehicle_type text,
  is_at_least_18 boolean,
  delivery_experience text,
  preferred_availability text,
  delivery_interest text,
  additional_comments text,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX recruitment_application_type_email_unique
  ON public.recruitment_applications (application_type, email);

-- No browser/Data API policies: submissions go through the existing backend.
-- RLS is enabled AND the default Supabase API-role grants are removed.
-- Trusted server-side Postgres connections and authorized SQL/Table Editor
-- administrators retain access. Never expose that connection in client code.
ALTER TABLE public.waitlist_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruitment_applications ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.waitlist_entries, public.recruitment_applications
  FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON SEQUENCE public.waitlist_entries_id_seq,
  public.recruitment_applications_id_seq
  FROM PUBLIC, anon, authenticated, service_role;

COMMIT;

-- Verification returns metadata only, never applicant information.
SELECT c.relname AS table_name, c.relrowsecurity AS row_level_security_enabled
FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relname IN ('waitlist_entries', 'recruitment_applications')
ORDER BY c.relname;
