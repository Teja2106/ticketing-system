import { db } from "@/db"
import { CheckinLocation } from "@/db/schema"
import { eq } from "drizzle-orm"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteCheckInLocations } from "@/auth/actions";

export default async function LocationsList({ eventId }: { eventId: string }) {
    const locations = await db
        .select()
        .from(CheckinLocation)
        .where(eq(CheckinLocation.eventId, eventId));

    if (locations.length === 0) {
        return (
            <p className="text-sm text-muted-foreground text-center py-6">
                No check-in locations added yet.
            </p>
        )
    }
    return (
        <>
            <div>
                {locations.map((loc) => (
                    <Card key={loc.id}>
                        <CardHeader className="px-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-1.5">
                                    <MapPin size={20} />
                                    {loc.locationName}
                                </CardTitle>

                                <form action={deleteCheckInLocations}>
                                    <Input type="hidden" name="id" value={loc.id} />
                                    <Button variant={'ghost'} className="text-red-400 hover:text-red-600 hover:bg-red-500/10">
                                        <Trash2 />
                                    </Button>
                                </form>
                            </div>
                        </CardHeader>

                        <CardContent className="pt-0">
                            <p className="text-sm text-muted-foreground">
                                {loc.description || "No description"}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}