import { auth } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'
import { and, between, eq } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/db'
import { calendars, events } from '@/db/schema'
import { getDuration } from '@/utils/get-duration'
import { getWeekIndexByDay } from '@/utils/get-week-index-by-day'
import { getSalary, isWeekend, toTimeAmount } from './summary-utils'
import type { Response } from './types'

const GetSummarySchema = z.object({
    userId: z.string(),
    month: z.number().min(1).max(12),
    year: z.number().min(1970).max(2100),
    calendarId: z.uuid().optional(),
})

export const getSummaryFn = createServerFn({ method: 'GET' })
    .inputValidator(GetSummarySchema)
    .handler(async ({ data }) => {
        const { isAuthenticated, userId } = await auth()
        if (!isAuthenticated || !userId) throw new Error('Unauthorized')
        if (userId !== data.userId) throw new Error('Unauthorized')

        const result = await db
            .select({
                id: events.id,
                totalTime: events.totalTime,
                startTime: events.startTime,
                endTime: events.endTime,
                date: events.date,
                salary: calendars.salary,
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
                    data.calendarId ? eq(events.calendarId, data.calendarId) : undefined,
                ),
            )
            .orderBy(events.date, events.startTime)

        const firstDay = new Date(data.year, data.month - 1, 1).getDay()
        const firstDayOfMonth = firstDay === 0 ? 7 : firstDay

        const daysInMonth = new Date(data.year, data.month, 0).getDate()
        const weeksCount = getWeekIndexByDay(daysInMonth, firstDayOfMonth) + 1

        const weeksTotals = Array.from({ length: weeksCount }, () => ({
            totalTimeMs: 0,
            totalWeekendTimeMs: 0,
        }))

        const salaryRate = result[0]?.salary ?? 0

        for (const event of result) {
            const eventDate = new Date(event.date)
            const day = eventDate.getDate()
            const weekIndex = getWeekIndexByDay(day, firstDayOfMonth)
            const duration = event.totalTime
                ? getDuration(event.totalTime)
                : event.startTime && event.endTime
                  ? getDuration(event.startTime, event.endTime)
                  : 0

            if (duration <= 0 || !Number.isFinite(duration)) continue
            if (!weeksTotals[weekIndex]) continue

            if (isWeekend(day, firstDayOfMonth)) {
                weeksTotals[weekIndex].totalWeekendTimeMs += duration
                continue
            }
            weeksTotals[weekIndex].totalTimeMs += duration
        }

        const weeks = weeksTotals.map((week) => ({
            totalTime: toTimeAmount(week.totalTimeMs),
            totalWeekendTime: toTimeAmount(week.totalWeekendTimeMs),
            salary: getSalary(week.totalTimeMs, week.totalWeekendTimeMs, salaryRate),
        }))

        const totalTimeMs = weeksTotals.reduce((acc, week) => acc + week.totalTimeMs, 0)
        const totalWeekendTimeMs = weeksTotals.reduce(
            (acc, week) => acc + week.totalWeekendTimeMs,
            0,
        )

        const response: Response = {
            weeks,
            totalTime: toTimeAmount(totalTimeMs),
            totalWeekendTime: toTimeAmount(totalWeekendTimeMs),
            totalSalary: getSalary(totalTimeMs, totalWeekendTimeMs, salaryRate),
        }

        return response
    })
