import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { Event } from "@/db/schema";
import { desc, lt } from "drizzle-orm";
import { CalendarClock, MapPin } from "lucide-react";

export default async function PastEvents() {
    const today = new Date().toISOString().split('T')[0];

    const pastEvents = await db
        .select()
        .from(Event)
        .where(lt(Event.date, today))
        .orderBy(desc(Event.date));

    if (pastEvents.length === 0) {
        return <div>No Past Events.</div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
            {pastEvents.map((event) => (
                <div
                    key={event.id}
                    className="rounded-2xl border bg-card text-card-foreground p-6 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{event.eventName}</h3>
                        <Badge variant={"secondary"}>Past</Badge>
                    </div>

                    <div className="text-sm text-muted-foreground mb-2 flex gap-1.5">
                        <CalendarClock size={20} /> {event.date} • {event.time}
                    </div>

                    <div className="text-sm flex items-center gap-1.5"><MapPin size={20} /> {event.location}</div>
                </div>
            ))}
        </div>
    )
}