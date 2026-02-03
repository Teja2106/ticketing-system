import "dotenv/config";
import { db } from "@/db";
import { Admin } from "@/db/schema";
import { eq } from "drizzle-orm";
import { uuidv7 } from 'uuidv7';
import bcrypt from 'bcrypt';

async function ensureAdmin() {
    const adminEmail = process.env.ADMIN_EMAIL!;

    const existing = await db
        .select()
        .from(Admin)
        .where(eq(Admin.email, adminEmail));

    if (existing.length === 0) {
        console.log('No admin found. Creating one...');

        const password = process.env.ADMIN_PASSWORD!;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        await db.insert(Admin).values({
            id: uuidv7(),
            fullName: 'Admin',
            email: adminEmail,
            password: hashedPassword,
        });

        console.log('Admin created.');
    } else {
        console.log('Admin already exists.');
    }

    process.exit(0);
}

ensureAdmin();