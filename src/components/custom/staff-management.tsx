import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import AddStaff from "./add-staff";
import StaffList from "./staff-list";

export default function StaffManagement() {
    return (
        <>
            <Card className="w-full mt-4">
                <div className="flex items-center justify-between">
                    <CardHeader className="w-full">
                        <CardTitle>Staff Management</CardTitle>
                        <CardDescription>Manage active onsite event personnel</CardDescription>
                    </CardHeader>

                    <AddStaff />
                </div>

                <Separator />

                <StaffList />
            </Card>
        </>
    )
}