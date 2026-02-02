import { pgTable, uuid, text, boolean } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
    id: uuid('id').primaryKey(),
    fullName: text('full_name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    isAdmin: boolean('is_admin').default(false)
});