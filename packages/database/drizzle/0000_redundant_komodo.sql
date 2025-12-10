CREATE TABLE IF NOT EXISTS "garage_booking" (
	"id" text PRIMARY KEY NOT NULL,
	"vehicle_details" json NOT NULL,
	"service_type" text NOT NULL,
	"description" text,
	"address" text,
	"date" timestamp NOT NULL,
	"time_slot" text NOT NULL,
	"estimated_cost" numeric(10, 2),
	"final_cost" numeric(10, 2),
	"status" text DEFAULT 'scheduled' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "garage_partner" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"pincode" text NOT NULL,
	"phone" text NOT NULL,
	"email" text,
	"owner_name" text NOT NULL,
	"gst_number" text,
	"specialization" text[] NOT NULL,
	"vehicle_types" text[] NOT NULL,
	"services" text[] NOT NULL,
	"working_hours" json NOT NULL,
	"rating" real DEFAULT 4 NOT NULL,
	"total_reviews" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "garage_service_booking" (
	"id" text PRIMARY KEY NOT NULL,
	"booking_id" text NOT NULL,
	"vehicle_type" text NOT NULL,
	"brand" text NOT NULL,
	"model" text NOT NULL,
	"year" integer NOT NULL,
	"variant" text,
	"transmission" text,
	"registration_number" text NOT NULL,
	"selected_services" text[] NOT NULL,
	"booking_date" timestamp NOT NULL,
	"time_slot" text NOT NULL,
	"pickup_drop" boolean DEFAULT false NOT NULL,
	"additional_notes" text,
	"customer_name" text NOT NULL,
	"mobile" text NOT NULL,
	"email" text,
	"address" text NOT NULL,
	"payment_method" text NOT NULL,
	"payment_status" text DEFAULT 'pending' NOT NULL,
	"total_amount" numeric(10, 2) NOT NULL,
	"final_amount" numeric(10, 2),
	"status" text DEFAULT 'confirmed' NOT NULL,
	"garage_partner_id" text NOT NULL,
	"estimated_completion_time" timestamp,
	"actual_completion_time" timestamp,
	"service_notes" text,
	"paid_at" timestamp,
	"cancelled_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "garage_service_booking_booking_id_unique" UNIQUE("booking_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "health_insurance" (
	"id" text PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"members" json NOT NULL,
	"premium" numeric(10, 2) NOT NULL,
	"coverage" numeric(10, 2) NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"documents" json,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inspection" (
	"id" text PRIMARY KEY NOT NULL,
	"vehicle_id" text NOT NULL,
	"address" text NOT NULL,
	"date" timestamp NOT NULL,
	"time_slot" text NOT NULL,
	"status" text DEFAULT 'scheduled' NOT NULL,
	"report" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "inspection_vehicle_id_unique" UNIQUE("vehicle_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "insurance" (
	"id" text PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"vehicle_details" json NOT NULL,
	"premium" numeric(10, 2) NOT NULL,
	"coverage" numeric(10, 2) NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"documents" json,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lead" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text NOT NULL,
	"vehicle_type" text,
	"brand" text,
	"model" text,
	"year" integer,
	"message" text,
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notification" (
	"id" text PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"recipient_type" text NOT NULL,
	"recipient_id" text NOT NULL,
	"booking_id" text,
	"is_read" boolean DEFAULT false NOT NULL,
	"scheduled_for" timestamp,
	"sent_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "otp" (
	"id" text PRIMARY KEY NOT NULL,
	"phone" text NOT NULL,
	"code" text NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment" (
	"id" text PRIMARY KEY NOT NULL,
	"booking_id" text NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"payment_method" text NOT NULL,
	"payment_gateway" text,
	"transaction_id" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"gateway_response" json,
	"refund_amount" numeric(10, 2),
	"refunded_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sell_order" (
	"id" text PRIMARY KEY NOT NULL,
	"vehicle_type" text NOT NULL,
	"brand" text NOT NULL,
	"model" text NOT NULL,
	"variant" text,
	"year" integer NOT NULL,
	"kilometers" text NOT NULL,
	"condition" json,
	"registration_no" text,
	"location" text,
	"seller_name" text NOT NULL,
	"seller_email" text,
	"seller_phone" text NOT NULL,
	"seller_address" text,
	"inspection_date" timestamp,
	"inspection_time" text,
	"inspection_address" text,
	"estimated_price_min" numeric(10, 2),
	"estimated_price_max" numeric(10, 2),
	"final_price" numeric(10, 2),
	"status" text DEFAULT 'PENDING' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"phone" text NOT NULL,
	"email_verified" timestamp,
	"phone_verified" timestamp,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicle" (
	"id" text PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"brand" text NOT NULL,
	"model" text NOT NULL,
	"variant" text NOT NULL,
	"year" integer NOT NULL,
	"fuel_type" text NOT NULL,
	"kilometers" text NOT NULL,
	"city" text NOT NULL,
	"condition" json NOT NULL,
	"images" text[] NOT NULL,
	"documents" json,
	"estimated_price" numeric(10, 2),
	"final_price" numeric(10, 2),
	"status" text DEFAULT 'pending' NOT NULL,
	"listing_type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "garage_booking" ADD CONSTRAINT "garage_booking_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "garage_service_booking" ADD CONSTRAINT "garage_service_booking_garage_partner_id_garage_partner_id_fk" FOREIGN KEY ("garage_partner_id") REFERENCES "public"."garage_partner"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "health_insurance" ADD CONSTRAINT "health_insurance_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inspection" ADD CONSTRAINT "inspection_vehicle_id_vehicle_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicle"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "insurance" ADD CONSTRAINT "insurance_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notification" ADD CONSTRAINT "notification_booking_id_garage_service_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."garage_service_booking"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payment" ADD CONSTRAINT "payment_booking_id_garage_service_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."garage_service_booking"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "garage_partner_city_idx" ON "garage_partner" USING btree ("city");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "garage_partner_phone_idx" ON "garage_partner" USING btree ("phone");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "garage_partner_is_active_idx" ON "garage_partner" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "garage_service_booking_mobile_idx" ON "garage_service_booking" USING btree ("mobile");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "garage_service_booking_status_idx" ON "garage_service_booking" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "garage_service_booking_date_idx" ON "garage_service_booking" USING btree ("booking_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "garage_service_booking_partner_idx" ON "garage_service_booking" USING btree ("garage_partner_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "lead_phone_idx" ON "lead" USING btree ("phone");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "lead_status_idx" ON "lead" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "lead_created_at_idx" ON "lead" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "otp_phone_idx" ON "otp" USING btree ("phone");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "otp_expires_at_idx" ON "otp" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sell_order_seller_phone_idx" ON "sell_order" USING btree ("seller_phone");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sell_order_status_idx" ON "sell_order" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sell_order_created_at_idx" ON "sell_order" USING btree ("created_at");