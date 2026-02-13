import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { Event } from "@/db/schema";
import { gte } from "drizzle-orm";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import DeleteEvent from "./delete-event";
import EditEvent from "./edit-event";
import ManageLocations from "./manage-locations";

export default async function UpcomingLive() {
    const today = new Date().toISOString().split("T")[0]; //YYYY-MM-DD

    const events = await db
        .select()
        .from(Event)
        .where(gte(Event.date, today))
        .orderBy(Event.date);

    if (events.length === 0) {
        return (
            <div>
                No upcoming events.
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                {events.map((event) => {

                    const capacityFilled = Math.min(10, event.capacity);
                    // replace later with real ticket count

                    const percent = Math.floor((capacityFilled / event.capacity) * 100);

                    const now = new Date();

                    const eventTime = event.time.toString().split(".")[0];
                    const eventDateTime = new Date(`${event.date}T${eventTime}`);

                    const isLive = now >= eventDateTime;

                    return (
                        <div key={event.id} className="rounded-2xl border bg-card text-card-foreground p-6 shadow-sm">
                            {/* Title */}
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-lg">
                                    {event.eventName}
                                </h3>

                                <Badge variant={isLive ? 'default' : 'outline'}>{isLive ? 'Live' : 'Upcoming'}</Badge>
                            </div>

                            {/* Date + Time */}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                <div className="flex items-center gap-1">
                                    <Calendar size={16} />
                                    {event.date}
                                </div>

                                <div className="flex items-center gap-1">
                                    <Clock size={16} />
                                    {event.time}
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-2 text-sm mb-4">
                                <MapPin size={16} className="text-muted-foreground" />
                                {event.location}
                            </div>

                            {/* Capacity */}
                            <div className="flex items-center justify-between text-sm mb-1">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Users size={16} />
                                    Capacity
                                </div>

                                <span className="font-medium">
                                    {capacityFilled} / {event.capacity}
                                </span>
                            </div>

                            {/* Occupancy */}
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Occupancy</span>
                                <span className="font-semibold">{percent}%</span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-5">
                                <div
                                    className="h-full bg-linear-to-r from-orange-500 to-teal-500 rounded-full"
                                    style={{ width: `${percent}%` }}
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-3">
                                <ManageLocations event={event} />

                                <div className="grid grid-cols-2 gap-2">
                                    <EditEvent event={event} isLive={isLive} />
                                    <DeleteEvent event={event} isLive={isLive} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}