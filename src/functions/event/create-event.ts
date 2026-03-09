import { auth } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'
import { t } from 'i18next'
import z from 'zod'
import { db } from '@/db'
import { calendars as calendarsSchema, events } from '@/db/schema'
import { MAX, MAX_APP_DATE, MIN, MIN_APP_DATE, TIME_REGEX } from '@/types/constants'
import { EventType } from '@/types/enums'
import { catchError } from '@/utils/catch-error'

const eventSchema = z
    .object({
        userId: z.string(),
        calendarId: z.uuid(),
        title: z
            .string()
            .trim()
            .min(
                MIN.CALENDAR_NAME_LENGTH,
                t('calendar.event.create.form.title.minLength', {
                    charCount: MIN.CALENDAR_NAME_LENGTH,
                }),
            )
            .max(
                MAX.CALENDAR_NAME_LENGTH,
                t('calendar.event.create.form.title.maxLength', {
                    charCount: MAX.CALENDAR_NAME_LENGTH,
                }),
            )
            .optional(),
        eventType: z.enum(EventType),
        startTime: z.string().regex(TIME_REGEX).optional(),
        endTime: z.string().regex(TIME_REGEX).optional(),
        totalTime: z.string().regex(TIME_REGEX).optional(),
        date: z
            .date()
            .min(MIN_APP_DATE, t('calendar.event.create.form.date.minDate'))
            .max(MAX_APP_DATE, t('calendar.event.create.form.date.maxDate')),
    })
    .refine(
        (data) => {
            if (data.startTime && !data.endTime) return false
            if (!data.startTime && data.endTime) return false
            return true
        },
        {
            message: t('calendar.event.create.form.time.startEndBothOrNeither'),
            path: ['startTime', 'endTime'],
        },
    )
    .refine(
        (data) => {
            if (data.totalTime && (data.startTime || data.endTime)) return false
            return true
        },
        {
            message: t('calendar.event.create.form.time.variantsConflict'),
            path: ['totalTime'],
        },
    )
    .refine(
        (data) => {
            if (!data.startTime || !data.endTime) return true

            const startMinutes =
                Number.parseInt(data.startTime.slice(0, 2)) * 60 +
                Number.parseInt(data.startTime.slice(3, 5))
            const endMinutes =
                Number.parseInt(data.endTime.slice(0, 2)) * 60 +
                Number.parseInt(data.endTime.slice(3, 5))
            return endMinutes > startMinutes
        },
        {
            message: t('calendar.event.create.form.time.endBeforeStart'),
            path: ['startTime', 'endTime'],
        },
    )

export const createEvent = createServerFn({
    method: 'POST',
})
    .inputValidator(eventSchema)
    .handler(async ({ data }) => {
        const { isAuthenticated, userId } = await auth()
        if (!isAuthenticated || userId !== data.userId) throw new Error('Unauthorized')

        const [calendarsError, calendars] = await catchError(
            db
                .select()
                .from(calendarsSchema)
                .where(
                    and(
                        eq(calendarsSchema.userId, data.userId),
                        eq(calendarsSchema.id, data.calendarId),
                    ),
                )
                .limit(1),
        )
        if (calendarsError || calendars.length === 0) throw new Error('Calendar not found')

        const [error] = await catchError(
            db.insert(events).values({
                userId: data.userId,
                calendarId: data.calendarId,
                title: data.title || calendars[0].name,
                eventType: data.eventType,
                startTime: data.startTime ? `${data.startTime}:00` : null,
                endTime: data.endTime ? `${data.endTime}:00` : null,
                totalTime: data.totalTime ? `${data.totalTime}:00` : null,
                date: data.date,
            }),
        )

        if (error) {
            throw new Error('Failed to create event')
        }

        return { success: true }
    })
