'use server';

import { FormState, LoginSchema } from "./formSchema";
import { createSession, deleteSession } from "./session";
import { Users } from "@/db/schema";
import { db } from "@/db";
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";

export async function login(state: FormState, formData: FormData) {
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
    const user = await db.select().from(Users);

    if (email !== user[0].email || !(await bcrypt.compare(password, user[0].password))) {
        return {
            message: 'Invalid Credentials'
        }
    }

    await createSession(user[0].id);
    
    if (user[0].isAdmin) {
        redirect('/admin/dashboard');
    } else {
        redirect('/dashboard')
    }
}

export async function logout() {
    await deleteSession();
}