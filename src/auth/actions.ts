'use server';

import { AddStaffFormState, AddStaffSchema, LoginFormState, LoginSchema, UpdateStaffFormState, UpdateStaffSchema } from "./formSchema";
import { createSession, deleteSession, verifySession } from "./session";
import { Admin, Staff } from "@/db/schema";
import { db } from "@/db";
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";
import { uuidv7 } from 'uuidv7';
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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
            errors: validateFields.error.flatten().fieldErrors,
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

export async function updateStaffForm(state: UpdateStaffFormState, formData: FormData) {
    const id = formData.get('id') as string;

    const validateFields = UpdateStaffSchema.safeParse({
        fullName: formData.get('fullName') || undefined,
        role: formData.get('role') || undefined,
        email: formData.get('email') || undefined
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    const data = validateFields.data;

    const updateData = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    if (Object.keys(updateData).length === 0) return;

    await db
        .update(Staff)
        .set(updateData)
        .where(eq(Staff.id, id));

    revalidatePath('/admin/dashboard');
}

export async function logout() {
    await deleteSession();
}