import { createServerFn } from '@tanstack/react-start'
import { and, between, eq } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/db'
import { calendars, events } from '@/db/schema'

const GetWeekEventsSchema = z.object({
    userId: z.string(),
    startDate: z.iso.datetime(),
    endDate: z.iso.datetime(),
})

export const getWeekEvents = createServerFn({ method: 'GET' })
    .inputValidator(GetWeekEventsSchema)
    .handler(async ({ data }) => {
        const startDate = new Date(data.startDate)
        const endDate = new Date(data.endDate)

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
            .where(and(eq(events.userId, data.userId), between(events.date, startDate, endDate)))
            .orderBy(events.date, events.startTime)

        return result
    })
