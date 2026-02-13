'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PlusIcon } from "lucide-react";
import CreateEvent from "./create-event";

export default function AdminEventsClient() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex gap-3 items-center mb-2.5 mt-2.5">
                <SidebarTrigger size={'icon-lg'} />
                <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-5" />
                <p className="font-semibold text-xl">Events</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between mt-4 p-4">
                <div>
                    <p className="font-bold text-3xl">Events Overview</p>
                    <p className="text-neutral-500">Create, manage & track your events</p>
                </div>

                <Button onClick={() => setOpen(!open)}>
                    <PlusIcon /> Create Event
                </Button>
            </div>

            <CreateEvent open={open} setOpen={setOpen} />
        </>
    );
}