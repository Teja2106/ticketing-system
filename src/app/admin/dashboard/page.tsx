import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import TicketCounter from "@/app/admin/dashboard/components/ticket-counter";
import AddSatff from "@/app/admin/dashboard/components/staff-management";

export default function AdminDashboard() {
    return (
        <>
            <div className="flex gap-3 items-center mb-2.5 mt-2.5">
                <div>
                    <SidebarTrigger size={'icon-lg'} />
                </div>
                <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-5" />
                <div>
                    <p className="font-semibold text-xl">Dashboard Overview</p>
                </div>
            </div>

            <Separator />

            <div className="flex justify-around items-center mt-3 gap-6">
                <TicketCounter />
            </div>

            <div className="">
                <AddSatff />
            </div>
        </>
    )
}