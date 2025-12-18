-- Add role column to user table for staff/admin authorization
ALTER TABLE "user" ADD COLUMN "role" text DEFAULT 'user' NOT NULL;

-- Make garagePartnerId nullable for manual staff assignment
ALTER TABLE "garage_service_booking" ALTER COLUMN "garage_partner_id" DROP NOT NULL;
