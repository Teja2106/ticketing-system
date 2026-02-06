import { db } from "@/db";
import { Staff } from "@/db/schema";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";
import EditStaff from "./edit-staff";
import DeleteStaff from "./delete-staff";

export default async function StaffList() {
    const staff = await db.select().from(Staff);

    if (staff.length === 0) {
        return (
            <div className="p-3 text-center text-neutral-500">
                No Staff Members Added
            </div>
        );
    }

    return (
        <>
            <div className="px-4">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b hover:bg-transparent">
                            <TableHead>Staff Name</TableHead>
                            <TableHead>Assigned Location</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {staff.map((s) => (
                            <TableRow key={s.id} className="border-b hover:bg-transparent">
                                <TableCell className="font-medium">
                                    {s.fullName}
                                </TableCell>

                                <TableCell>
                                    {s.role}
                                </TableCell>

                                <TableCell className="text-right space-x-2">
                                    <EditStaff staff={s} />
                                    <DeleteStaff staff={s} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}