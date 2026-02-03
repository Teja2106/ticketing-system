import { cache } from "react";
import { verifySession } from "./session";
import { db } from "@/db";
import { Admin, Staff } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getAdmin = cache(async () => {
    const session = await verifySession();

    if (!session) return null;

    const fetchedAdmin = await db
        .select()
        .from(Admin)
        .where(eq(Admin.id, session.userId));
        
    try {
        if (fetchedAdmin.length === 0) return null;

        return userDTO(fetchedAdmin[0]);
    } catch {
        console.log('Failed to fetch admin.');
        return null;
    }
});

export const getStaff = cache(async () => {
    const session = await verifySession();

    if (!session) return null;

    const fetchedStaff = await db
        .select()
        .from(Staff)
        .where(eq(Staff.id, session.userId));

    try {
        if (fetchedStaff.length === 0) return null;

        return userDTO(fetchedStaff[0]);
    } catch {
        console.log('Failed to fetch staff.');
        return null;
    }
});

function userDTO(user: typeof Admin.$inferSelect) {
    return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
    }
}