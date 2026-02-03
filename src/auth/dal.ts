import { cache } from "react";
import { verifySession } from "./session";
import { db } from "@/db";
import { Admin, Staff } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUser = cache(async () => {
    const session = await verifySession();

    if (!session) return null;

    if (session.role === 'admin') {
        const admin = await db
            .select()
            .from(Admin)
            .where(eq(Admin.id, session.userId));

        if (admin.length === 0) return null;

        return userDTO(admin[0], 'admin');
    }

    if (session.role === 'staff') {
        const staff = await db
            .select()
            .from(Staff)
            .where(eq(Staff.id, session.userId));

        if (staff.length === 0) return null;

        return userDTO(staff[0], 'staff');
    }

    return null;
});

function userDTO(user: typeof Admin.$inferSelect | typeof Staff.$inferSelect, role: 'admin' | 'staff') {
    return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role
    }
}