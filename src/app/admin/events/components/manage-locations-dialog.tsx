'use client';

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addCheckInLocationsForms } from "@/auth/actions";
import { Spinner } from "@/components/ui/spinner";

export default function ManageLocationsDialog({eventId, eventName, children}: {eventId: string; eventName: string; children: React.ReactNode;}) {
    const [open, setOpen] = useState(false);
    const [state, action, pending] = useActionState(addCheckInLocationsForms, undefined);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full rounded-lg hover:bg-muted/80 py-2 font-medium text-white h-12 bg-muted">
                    <MapPin />
                    Manage Locations
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Check-in Locations</DialogTitle>
                    <DialogDescription>{eventName}</DialogDescription>
                </DialogHeader>

                <Separator />

                <div className="flex justify-end">
                    <Button onClick={() => setOpen(!open)}>
                        <PlusIcon /> Add Location
                    </Button>
                </div>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-125 opacity-100 translate-y-0 mt-4" : "max-h-0 opacity-0 -translate-y-2"}`}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Location</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <form action={action} className="grid gap-4">
                                <input type="hidden" name="eventId" value={eventId} />

                                <div>
                                    <Label className="ml-1.5 mb-2">
                                        Location Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input name="locationName" />
                                    { state?.errors?.locationName && (<p className="ml-1.5 text-red-500">{ state.errors.locationName }</p>) }
                                </div>

                                <div>
                                    <Label className="ml-1.5 mb-2">Description</Label>
                                    <Textarea name="description" />
                                    { state?.errors?.description && (<p className="ml-1.5 text-red-500">{ state.errors.description }</p>) }
                                </div>

                                <div className="flex justify-end gap-2 pt-2">
                                    <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>

                                    <Button>{ pending ? <Spinner /> : 'Add Check-in Location' }</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                {children}
            </DialogContent>
        </Dialog>
    );
}