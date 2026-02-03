'use server';

import { AddStaffFormState, AddStaffSchema, LoginFormState, LoginSchema } from "./formSchema";
import { createSession, deleteSession, verifySession } from "./session";
import { Admin, Staff } from "@/db/schema";
import { db } from "@/db";
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";
import { uuidv7 } from 'uuidv7';
import { eq } from "drizzle-orm";

export async function adminLogin(state: LoginFormState, formData: FormData) {
    const validateFields = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    const { email, password } = validateFields.data;
    const admin = await db.select().from(Admin).where(eq(Admin.email, email));

    if (email !== admin[0].email || !(await bcrypt.compare(password, admin[0].password))) {
        return {
            message: 'Invalid Credentials'
        }
    }

    await createSession(admin[0].id, 'admin');
    
    redirect('/admin/dashboard');
}

export async function staffLogin(state: LoginFormState, formData: FormData) {
    const validateFields = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    const { email, password } = validateFields.data;
    const staff = await db.select().from(Staff).where(eq(Staff.email, email));

    if (email !== staff[0].email || !(await bcrypt.compare(password, staff[0].password))) {
        return {
            message: 'Invalid Credentials'
        }
    }

    await createSession(staff[0].id, 'staff');
    redirect('/staff/dashboard');
}

export async function addStaffForm(state: AddStaffFormState, formData: FormData) {
    const session = await verifySession();

    const validateFields = AddStaffSchema.safeParse({
        fullName: formData.get('fullName'),
        role: formData.get('role'),
        email: formData.get('email'),
        password: formData.get('password')
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    const { fullName, role, email, password } = validateFields.data;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.insert(Staff).values({
        id: uuidv7(),
        createdBy: session.userId,
        fullName: fullName,
        role: role,
        email: email,
        password: hashedPassword,
    });

}

export async function logout() {
    await deleteSession();
}