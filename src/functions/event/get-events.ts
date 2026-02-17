import { createServerFn } from '@tanstack/react-start'
import { and, between, eq } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/db'
import { calendars, events } from '@/db/schema'

const GetEventsSchema = z.object({
    userId: z.string(),
    month: z.number().min(1).max(12),
    year: z.number().min(1970).max(2100),
})

export const getEvents = createServerFn({ method: 'GET' })
    .inputValidator(GetEventsSchema)
    .handler(async ({ data }) => {
        const result = await db
            .select({
                id: events.id,
                userId: events.userId,
                calendarId: events.calendarId,
                title: events.title,
                eventType: events.eventType,
                startTime: events.startTime,
                endTime: events.endTime,
                totalTime: events.totalTime,
                date: events.date,
                createdAt: events.createdAt,
                calendarName: calendars.name,
                calendarColor: calendars.color,
            })
            .from(events)
            .innerJoin(calendars, eq(events.calendarId, calendars.id))
            .where(
                and(
                    eq(events.userId, data.userId),
                    between(
                        events.date,
                        new Date(data.year, data.month - 1, 2, 0, 0, 0, 0),
                        new Date(data.year, data.month, 1, 0, 0, 0, 0),
                    ),
                ),
            )
            .orderBy(events.date, events.startTime)

        return result
    })
