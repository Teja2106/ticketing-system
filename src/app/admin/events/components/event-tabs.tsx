import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpcomingLive from "./upcoming-live";
import PastEvents from "./past-events";
import { db } from "@/db";
import { count, gte, lt } from "drizzle-orm";
import { Event } from "@/db/schema";

export default async function EventTabs() {
    const today = new Date().toISOString().split('T')[0];

    const upcomingEventResult = await db
        .select({ value: count() })
        .from(Event)
        .where(gte(Event.date, today));
    
    const pastEventResult = await db
        .select({ value: count() })
        .from(Event)
        .where(lt(Event.date, today));

    const upcomingEventCount = upcomingEventResult[0]?.value ?? 0;
    const pastEventCount = pastEventResult[0]?.value ?? 0;

    return (
        <Tabs defaultValue="upcoming_live" className="bg-transparent">
            <div className="w-full border-b">
                <TabsList variant={'line'} className="relative bg-transparent gap-5">
                    <TabsTrigger value="upcoming_live" className="text-xl">
                        Upcoming & Live ({ upcomingEventCount })
                    </TabsTrigger>
                    <TabsTrigger value="past_events" className="text-xl">
                        Past Events ({ pastEventCount })
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="upcoming_live">
                <UpcomingLive />
            </TabsContent>

            <TabsContent value="past_events">
                <PastEvents />
            </TabsContent>
        </Tabs>
    )
}