import { auth } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'
import { t } from 'i18next'
import z from 'zod'
import { db } from '@/db'
import { calendars } from '@/db/schema'
import { MAX, MIN } from '@/types/constants'
import { catchError } from '@/utils/catch-error'

const calendarSchema = z.object({
    name: z
        .string()
        .min(
            MIN.CALENDAR_NAME_LENGTH,
            t('appSettings.calendars.form.name.minLength', { count: MIN.CALENDAR_NAME_LENGTH }),
        )
        .max(
            MAX.CALENDAR_NAME_LENGTH,
            t('appSettings.calendars.form.name.maxLength', { count: MAX.CALENDAR_NAME_LENGTH }),
        ),
    color: z
        .string()
        .min(6, t('appSettings.calendars.form.color.tooShort', { charCount: 6 }))
        .max(6, t('appSettings.calendars.form.color.tooLong', { charCount: 6 }))
        .refine(
            (val) => /^([0-9A-F]{3}){1,2}$/i.test(val),
            t('appSettings.calendars.form.color.invalid'),
        ),
    salary: z
        .number()
        .positive(t('appSettings.calendars.form.salary.invalid'))
        .max(150, t('appSettings.calendars.form.salary.invalid'))
        .optional(),
    userId: z.string(),
})

export const createCalendar = createServerFn({ method: 'POST' })
    .inputValidator(calendarSchema)
    .handler(async ({ data }) => {
        const { isAuthenticated, userId } = await auth()
        if (!isAuthenticated || userId !== data.userId) {
            throw new Error('Unauthorized')
        }

        const [error] = await catchError(
            db.insert(calendars).values({
                name: data.name,
                color: data.color,
                salary: data.salary ?? null,
                userId: userId,
            }),
        )

        if (error) {
            throw new Error('Failed to create calendar')
        }

        return { success: true }
    })
