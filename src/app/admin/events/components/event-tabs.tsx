import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EventTabs() {
    return (
        <Tabs defaultValue="upcoming_live" className="bg-transparent">
            <div className="w-full border-b">
                <TabsList variant={'line'} className="relative bg-transparent gap-5">
                    <TabsTrigger value="upcoming_live" className="text-xl">
                        Upcoming & Live
                    </TabsTrigger>
                    <TabsTrigger value="past_events" className="text-xl">
                        Past Events
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="upcoming_live">
                Upcoming & Live
            </TabsContent>

            <TabsContent value="past_events">
                Past Events
            </TabsContent>
        </Tabs>
    )
}