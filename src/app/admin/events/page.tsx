'use client';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PlusIcon } from "lucide-react";
import CreateEvent from "./components/create-event";
import { useState } from "react";

export default function AdminEvents() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex gap-3 items-center mb-2.5 mt-2.5">
                <div>
                    <SidebarTrigger size={'icon-lg'} />
                </div>
                <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-5" />
                <div>
                    <p className="font-semibold text-xl">Events</p>
                </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between mt-4 p-4">
                <div>
                    <p className="font-bold text-3xl">Events Overview</p>
                    <p className="text-neutral-500">Create, manage & track your events</p>
                </div>
                <Button onClick={() => setOpen(!open)} className="cursor-pointer"> <PlusIcon /> Create Event</Button>
            </div>

            <CreateEvent open={open} setOpen={setOpen} />
        </>
    )
}