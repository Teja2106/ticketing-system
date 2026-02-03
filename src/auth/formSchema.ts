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
            email?: string[];
            password?: string[];
        };
        message?: string;
    }
    | undefined;

export type SessionPayload = {
    userId: string;
    expiresAt: Date;
};

export const LoginSchema = z.object({
    email: z.email({ message: 'Invalid email address.' }).trim(),
    password: z.string().min(1, { message: 'This field is mandatory.' }).max(16, { message: 'Exceeded the maximum character limit.' }).trim()
});

export const AddStaffSchema = z.object({
    fullName: z.string().min(1, { message: 'This field is mandatory' }).max(20, { message: 'Exceeded the maximum character limit.' }).trim(),
    email: z.email({ message: 'Invalid email address.' }).trim(),
    password: z.string().min(1, { message: 'This field is mandatory.' }).max(16, { message: 'Exceeded the maximum character limit.' }).trim()
});