import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminEvents() {
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
        </>
    )
}