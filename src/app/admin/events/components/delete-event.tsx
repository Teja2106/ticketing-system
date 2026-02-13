'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteEvent } from "@/auth/actions";

export type EventType = {
    id: string;
    createdBy: string;
    eventName: string;
    date: string;
    time: string;
    capacity: number;
    location: string;
    createdAt: Date;
}

export default function DeleteEvent({ event, isLive }: { event: EventType, isLive: boolean }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'destructive'} title={isLive ? 'Live events cannot be deleted' : ''} disabled={isLive} className={`w-full rounded-lg bg-destructive/10 hover:bg-destructive/20 cursor-pointer py-2 h-12 ${isLive ? 'cursor-not-allowed opacity-60 disabled:pointer-events-auto' : 'cursor-pointer'}`}>
                    <Trash2Icon /> Delete
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>This action will delete <span className="font-bold">{event.eventName}</span> event permanently.</DialogDescription>
                </DialogHeader>
                <form action={deleteEvent}>
                    <Input type="hidden" name="id" value={event.id} />
                    <DialogFooter>
                        <Button type="submit" variant={'destructive'} className="cursor-pointer bg-red-300">Delete</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}