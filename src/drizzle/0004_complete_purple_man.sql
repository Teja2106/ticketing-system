ALTER TABLE "admin" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "admin" DROP COLUMN "is_admin";