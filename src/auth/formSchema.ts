import { z } from 'zod';

export type LoginFormState =
    | {
        errors?: {
            email?: string[];
            password?: string[];
        };
        message?: string;
    }
    | undefined;

export type AddStaffFormState =
    | {
        errors?: {
            fullName?: string[];
            role?: string[];
            email?: string[];
            password?: string[];
        };
        message?: string;
    }
    | undefined;

export type SessionPayload = {
    userId: string;
    role: 'admin' | 'staff'
    expiresAt: Date;
};

export const LoginSchema = z.object({
    email: z.email({ message: 'Invalid email address.' }).trim(),
    password: z.string().min(1, { message: 'Password is mandatory field' }).max(16, { message: 'Exceeded the maximum character limit.' }).trim()
});

export const AddStaffSchema = z.object({
    fullName: z.string().min(1, { message: 'Name is mandatory field.' }).max(20, { message: 'Exceeded the maximum character limit.' }).trim(),
    role: z.string().min(1, { message: 'Role is mandatory field.' }).max(20, { message: 'Exceeded the maximum character limit.' }).trim(),
    email: z.email({ message: 'Invalid email address.' }).trim(),
    password: z.string().min(1, { message: 'Password is mandatory field.' }).max(16, { message: 'Exceeded the maximum character limit.' }).trim()
});