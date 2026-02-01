import { cache } from "react";
import { verifySession } from "./session";
import { db } from "@/db";
import { Users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUser = cache(async () => {
    const session = await verifySession();

    if (!session) return null;

    const fetchedUser = await db
        .select()
        .from(Users)
        .where(eq(Users.id, session.userId));
        
    try {
        if (fetchedUser.length === 0) return null;

        return userDTO(fetchedUser[0]);
    } catch {
        console.log('Failed to fetch user.');
        return null;
    }
});

function userDTO(user: typeof Users.$inferSelect) {
    return {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin ?? false
    }
}