import { db } from "@/db";
import { Staff } from "@/db/schema";

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
            <div className="p-4 space-y-2">
                {staff.map((s) => (
                    <div key={s.id} className="border p-3 rounded-md flex justify-between">
                        <p>{s.fullName}</p>
                        <p className="text-sm text-neutral-400">{s.email}</p>
                    </div>
                ))}
            </div>
        </>
    )
}