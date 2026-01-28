import { pgEnum, pgTable, text, time, timestamp, uuid } from 'drizzle-orm/pg-core'
import { calendars } from './calendars'
import { EventType } from '@/types/enums'

export const eventTypeEnum = pgEnum('event_type', Object.values(EventType) as [string, ...Array<string>])

export const events = pgTable('events', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    userId: text('user_id').notNull(),
    calendarId: uuid('calendar_id')
        .references(() => calendars.id)
        .notNull(),
    title: text('title').notNull(),
    eventType: eventTypeEnum('event_type').notNull(),
    startTime: time('start_time').notNull(),
    endTime: time('end_time').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})
