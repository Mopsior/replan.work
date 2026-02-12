import { auth } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'
import { t } from 'i18next'
import z from 'zod'
import { db } from '@/db'
import { calendars } from '@/db/schema'
import { catchError } from '@/utils/catch-error'

const calendarSchema = z.object({
    name: z
        .string()
        .min(1, t('appSettings.calendars.form.name.required'))
        .max(16, t('appSettings.calendars.form.name.maxLength'))
        .optional(),
    color: z
        .string()
        .min(6, t('appSettings.calendars.form.color.tooShort', { charCount: 6 }))
        .max(6, t('appSettings.calendars.form.color.tooLong', { charCount: 6 }))
        .refine(
            (val) => /^([0-9A-F]{3}){1,2}$/i.test(val),
            t('appSettings.calendars.form.color.invalid'),
        )
        .optional(),
    salary: z
        .number()
        .positive(t('appSettings.calendars.form.salary.invalid'))
        .max(150, t('appSettings.calendars.form.salary.invalid'))
        .optional(),
    calendarId: z.uuid(),
    userId: z.string(),
})

export const editCalendar = createServerFn({ method: 'POST' })
    .inputValidator(calendarSchema)
    .handler(async ({ data }) => {
        if (!data.name && !data.color && !data.salary) {
            throw new Error('At least one field must be provided for update')
        }
        const { isAuthenticated, userId } = await auth()
        if (!isAuthenticated || userId !== data.userId) {
            throw new Error('Unauthorized')
        }

        const [checkError, checkResults] = await catchError(
            db
                .select({ id: calendars.id })
                .from(calendars)
                .where(and(eq(calendars.id, data.calendarId), eq(calendars.userId, userId)))
                .limit(1),
        )

        if (checkError || checkResults.length === 0) throw new Error('Failed to fetch calendar')

        const [error] = await catchError(
            db
                .update(calendars)
                .set({
                    name: data.name,
                    color: data.color,
                    salary: data.salary,
                })
                .where(and(eq(calendars.id, data.calendarId), eq(calendars.userId, userId))),
        )

        if (error) {
            throw new Error('Failed to edit calendar')
        }

        return { success: true }
    })
