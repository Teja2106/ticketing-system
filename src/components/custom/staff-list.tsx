import { db } from "@/db";
import { Staff } from "@/db/schema";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";

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
                        <TableRow className="border-b">
                            <TableHead>Staff Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {staff.map((s) => (
                            <TableRow key={s.id} className="border-b">
                                <TableCell className="font-medium">
                                    {s.fullName}
                                </TableCell>

                                <TableCell>
                                    { s.role }
                                </TableCell>

                                <TableCell className="text-right space-x-2">
                                    <Button variant={'ghost'} size={'sm'} className="cursor-pointer">Edit</Button>
                                    <Button variant={'destructive'} size={'sm'} className="cursor-pointer">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}