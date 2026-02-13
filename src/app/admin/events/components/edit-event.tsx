'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit2Icon } from "lucide-react";
import { EventType } from "./delete-event";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect, useState } from "react";
import { updateEventForm } from "@/auth/actions";
import { Spinner } from "@/components/ui/spinner";

export default function EditEvent({ event, isLive }: { event: EventType, isLive: boolean }) {
    const [state, action, pending] = useActionState(updateEventForm, undefined);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (state?.success) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOpen(false);
        }
    }, [state]);

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant={'ghost'} title={isLive ? 'Live events cannot be edited' : ''} disabled={isLive} className={`w-full rounded-lg bg-muted hover:bg-muted/80 py-2 h-12 ${isLive ? 'cursor-not-allowed opacity-60 disabled:pointer-events-auto' : ''}`}>
                        <Edit2Icon /> Edit
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Event: {event.eventName}</DialogTitle>
                    </DialogHeader>

                    <form className="grid gap-4" action={action}>
                        <div>
                            <Input type="hidden" name="id" defaultValue={event.id} />
                        </div>
                        <div>
                            <Label className="ml-1.5 mb-2">Event Name</Label>
                            <Input type="text" name="eventName" defaultValue={event.eventName} />
                            {state?.errors?.eventName && (<p className="text-red-500 ml-1.5">{state.errors.eventName}</p>)}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <Label className="ml-1.5 mb-2">Date</Label>
                                <Input type="date" name="date" defaultValue={event.date} />
                            </div>

                            <div>
                                <Label className="ml-1.5 mb-2">Time</Label>
                                <Input type="time" name="time" defaultValue={event.time} />
                            </div>
                        </div>

                        <div>
                            <Label className="ml-1.5 mb-2">Capacity</Label>
                            <Input type="tel" name="capacity" defaultValue={event.capacity} />
                        </div>

                        <div>
                            <Label className="ml-1.5 mb-2">Location</Label>
                            <Input type="text" name="location" defaultValue={event.location} />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button type="button" variant={'ghost'} onClick={() => setOpen(false)}>Cancel</Button>
                            <Button>{pending ? <Spinner /> : 'Submit'}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}