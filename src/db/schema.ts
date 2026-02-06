import { pgTable, uuid, text, timestamp, date, time, integer } from "drizzle-orm/pg-core";

export const Admin = pgTable('admin', {
    id: uuid('id').primaryKey(),
    fullName: text('full_name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow()
});

export const Staff = pgTable('staff', {
    id: uuid('id').primaryKey(),
    createdBy: uuid('created_by').references(() => Admin.id, { onDelete: 'cascade' }).notNull(),
    fullName: text('full_name').notNull(),
    role: text('role').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow()
});

export const Event = pgTable('events', {
    id: uuid('id').primaryKey(),
    createdBy: uuid('created_by').references(() => Admin.id, { onDelete: 'cascade' }).notNull(),
    eventName: text('event_name').notNull(),
    date: date('date').notNull(),
    time: time('time').notNull(),
    capacity: integer('capacity').notNull(),
    location: text('location').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
});