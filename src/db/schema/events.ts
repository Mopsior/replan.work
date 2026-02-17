import { date, pgEnum, pgTable, text, time, timestamp, uuid } from 'drizzle-orm/pg-core'
import { EventType } from '@/types/enums'
import { calendars } from './calendars'

export const eventTypeEnum = pgEnum(
    'event_type',
    Object.values(EventType) as [string, ...Array<string>],
)

export const events = pgTable('events', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    userId: text('user_id').notNull(),
    calendarId: uuid('calendar_id')
        .references(() => calendars.id)
        .notNull(),
    title: text('title'),
    eventType: eventTypeEnum('event_type').notNull(),
    startTime: time('start_time'), // must be null when totalTime is provided
    endTime: time('end_time'), // must be null when totalTime is provided
    totalTime: time('total_time'), //must be null when startTime/endTime is provided
    date: date('date', {
        mode: 'date',
    }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})
