'use server';

import { AddStaffFormState, AddStaffSchema, EventFormState, CreateEventSchema, LoginFormState, LoginSchema, UpdateStaffFormState, UpdateStaffSchema, UpdateEventSchema, CheckInLocationsState, CheckInLocationsSchema } from "./formSchema";
import { createSession, deleteSession, verifySession } from "./session";
import { Admin, Staff, Event, CheckinLocation } from "@/db/schema";
import { db } from "@/db";
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";
import { uuidv7 } from 'uuidv7';
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { sendMail } from "@/lib/mails";

export async function adminLogin(state: LoginFormState, formData: FormData) {
    const validateFields = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            values: {
                email: formData.get('email') as string
            }
        }
    }

    const { email, password } = validateFields.data;
    const admin = await db.select().from(Admin).where(eq(Admin.email, email));

    if (!admin.length) {
        return {
            message: 'Invalid Credentials'
        }
    }

    const user = admin[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return {
            message: 'Invalid Credentials',
            values: {
                email: email
            }
        }
    }

    await createSession(user.id, 'admin');

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

    if (!staff.length) {
        return {
            message: 'Invalid Credentials'
        }
    }

    const user = staff[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return {
            message: 'Invalid Credentials',
            values: {
                email: email
            }
        }
    }

    await createSession(user.id, 'staff');
    redirect('/staff/dashboard');
}

export async function logout() {
    await deleteSession();
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

    await sendMail(email, { name: fullName, email: email });
    revalidatePath('/admin/dashboard');
    return { success: true }
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

export async function deleteStaff(formData: FormData) {
    const id = formData.get('id') as string;

    if (!id) return;

    await db.delete(Staff).where(eq(Staff.id, id));

    revalidatePath('/admin/dashboard');
}

export async function createEventForm(state: EventFormState, formData: FormData) {
    const session = await verifySession();

    const validateFields = CreateEventSchema.safeParse({
        eventName: formData.get('eventName'),
        date: formData.get('date'),
        time: formData.get('time'),
        capacity: formData.get('capacity'),
        location: formData.get('location')
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    const { eventName, date, time, capacity, location } = validateFields.data;

    await db.insert(Event).values({
        id: uuidv7(),
        createdBy: session.userId,
        eventName: eventName,
        date: date,
        time: time,
        capacity: Number(capacity),
        location: location
    });

    revalidatePath('/admin/events');

    return { success: true };
}

export async function updateEventForm(state: EventFormState, formData: FormData) {
    const id = formData.get('id') as string;

    const validateFields = UpdateEventSchema.safeParse({
        eventName: formData.get('eventName') || undefined,
        date: formData.get('date') || undefined,
        time: formData.get('time') || undefined,
        capacity: formData.get('capacity') || undefined,
        location: formData.get('location') || undefined
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    const data = validateFields.data;

    const updateData: Record<string, unknown> = {};

    if (data.eventName !== undefined) updateData.eventName = data.eventName;
    if (data.date !== undefined) updateData.date = data.date;
    if (data.time !== undefined) updateData.time = data.time;
    if (data.location !== undefined) updateData.location = data.location;

    if (data.capacity !== undefined) {
        updateData.capacity = Number(data.capacity);
    }

    if (Object.keys(updateData).length === 0) return;

    await db
        .update(Event)
        .set(updateData)
        .where(eq(Event.id, id));

    revalidatePath('/admin/events');

    return { success: true };
}

export async function deleteEvent(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) return;

    await db.delete(Event).where(eq(Event.id, id));

    revalidatePath('/admin/events');
}

export async function addCheckInLocationsForms(state: CheckInLocationsState, formData: FormData) {
    const eventId = formData.get('eventId') as string;

    const validateFields = CheckInLocationsSchema.safeParse({
        locationName: formData.get('locationName'),
        description: formData.get('description')
    });
    
    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    const { locationName, description } = validateFields.data;

    await db.insert(CheckinLocation).values({
        id: uuidv7(),
        eventId: eventId,
        locationName: locationName,
        description: description || null
    });

    revalidatePath('/admin/events');

    return { success: true }
}

export async function deleteCheckInLocations(formData: FormData) {
    const id = formData.get('id') as string;

    if (!id) return;

    await db
        .delete(CheckinLocation)
        .where(eq(CheckinLocation.id, id));

    revalidatePath('/admin/events');
}