'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { createEventForm } from "@/auth/actions";
import { Spinner } from "@/components/ui/spinner";

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export default function CreateEvent({ open, setOpen }: Props) {
    const [state, action, pending] = useActionState(createEventForm, undefined);

    useEffect(() => {
        if(state?.success) {
            setOpen(false);
        }
    });
    
    return (
        <>
            <div className={`px-4 overflow-hidden transition-all duration-700 ease-in-out ${open ? "max-h-150 opacity-100 translate-y-0 pb-4" : "max-h-0 -translate-y-2"}`}>
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Event</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action={action} className="grid gap-4">
                            <div>
                                <Label className="ml-1.5 mb-2">Event Name</Label>
                                <Input type="text" name="eventName" />
                                { state?.errors?.eventName && (<p className="text-red-500 ml-1.5">{ state.errors.eventName }</p>) }
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <Label className="ml-1.5 mb-2">Date</Label>
                                    <Input type="date" name="date" />
                                    { state?.errors?.date && (<p className="text-red-500 ml-1.5">{ state.errors.date }</p>) }
                                </div>

                                <div>
                                    <Label className="ml-1.5 mb-2">Time</Label>
                                    <Input type="time" name="time" />
                                    { state?.errors?.time && (<p className="text-red-500 ml-1.5">{ state.errors.time }</p>) }
                                </div>
                            </div>

                            <div>
                                <Label className="ml-1.5 mb-2">Capacity</Label>
                                <Input type="tel" name="capacity" />
                                { state?.errors?.capacity && (<p className="text-red-500 ml-1.5">{ state.errors.capacity }</p>) }
                            </div>

                            <div>
                                <Label className="ml-1.5 mb-2">Location</Label>
                                <Input type="text" name="location" />
                                { state?.errors?.location && (<p className="text-red-500 ml-1.5">{ state.errors.location }</p>) }
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <Button type="button" variant={'ghost'} onClick={() => setOpen(false)}>Cancel</Button>
                                <Button>{ pending ? <Spinner /> : "Create Event" }</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}