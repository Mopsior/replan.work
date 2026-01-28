import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const calendars = pgTable('calendars', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    userId: text('user_id').notNull(),
    name: varchar('name', { length: 16 }).notNull(),
    color: varchar('color', { length: 6 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})
