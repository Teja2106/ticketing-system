CREATE TABLE "check_in_location" (
	"id" uuid PRIMARY KEY NOT NULL,
	"event_id" uuid NOT NULL,
	"location_name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
ALTER TABLE "check_in_location" ADD CONSTRAINT "check_in_location_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;