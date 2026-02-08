import { auth } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'
import { t } from 'i18next'
import z from 'zod'
import { db } from '@/db'
import { calendars } from '@/db/schema'
import { catchError } from '@/utils/catch-error'

const calendarSchema = z.object({
    name: z
        .string()
        .min(1, t('appSettings.calendars.form.name.required'))
        .max(16, t('appSettings.calendars.form.name.maxLength')),
    color: z
        .string()
        .min(6)
        .max(6)
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
