import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function AdminDashboard() {
    return (
        <>
            <div className="flex gap-3 items-center mb-2.5 mt-2.5">
                <div>
                    <SidebarTrigger size={'icon-lg'} />
                </div>
                <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-5" />
                <div>
                    <p className="font-semibold text-xl">Dashboard</p>
                </div>
            </div>
            <Separator />
        </>
    )
}