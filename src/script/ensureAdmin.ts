import "dotenv/config";
import { db } from "@/db";
import { Users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { uuidv7 } from 'uuidv7';
import bcrypt from 'bcrypt';

async function ensureAdmin() {
    const adminEmail = process.env.ADMIN_EMAIL!;

    const existing = await db
        .select()
        .from(Users)
        .where(eq(Users.email, adminEmail));

    if (existing.length === 0) {
        console.log('No admin found. Creating one...');

        const uuid = uuidv7();
        const password = process.env.ADMIN_PASSWORD!;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        
        await db.insert(Users).values({
            id: uuid,
            email: adminEmail,
            password: hashedPassword,
            isAdmin: true
        });

        console.log('Admin created.');
    } else {
        console.log('Admin already exists.');
    }

    process.exit(0);
}

ensureAdmin();