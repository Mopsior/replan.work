import { t } from 'i18next'
import z from 'zod'
import { MAX_APP_DATE, MIN_APP_DATE } from '@/types/constants'
import { EventType } from '@/types/enums'

export interface EventProps {
    title: string
    time?: string
    color?: string
    eventType: EventType
    isOneLiner?: boolean
    isTotalTime?: boolean
}

export const formSchema = z
    .object({
        date: z
            .date()
            .min(MIN_APP_DATE, t('calendar.event.create.form.date.minDate'))
            .max(MAX_APP_DATE, t('calendar.event.create.form.date.maxDate')),
        startTimeHours: z
            .string()
            .min(1, t('calendar.event.create.form.time.start.hours.minLength'))
            .max(2, t('calendar.event.create.form.time.start.hours.maxLength'))
            .optional(),
        startTimeMinutes: z
            .string()
            .min(1, t('calendar.event.create.form.time.start.minutes.minLength'))
            .max(2, t('calendar.event.create.form.time.start.minutes.maxLength'))
            .optional(),
        endTimeHours: z
            .string()
            .min(1, t('calendar.event.create.form.time.end.hours.minLength'))
            .max(2, t('calendar.event.create.form.time.end.hours.maxLength'))
            .optional(),
        endTimeMinutes: z
            .string()
            .min(1, t('calendar.event.create.form.time.end.minutes.minLength'))
            .max(2, t('calendar.event.create.form.time.end.minutes.maxLength'))
            .optional(),
        totalTimeHours: z
            .string()
            .min(1, t('calendar.event.create.form.time.total.hours.minLength'))
            .max(2, t('calendar.event.create.form.time.total.hours.maxLength'))
            .optional(),
        totalTimeMinutes: z
            .string()
            .min(1, t('calendar.event.create.form.time.total.minutes.minLength'))
            .max(2, t('calendar.event.create.form.time.total.minutes.maxLength'))
            .optional(),
        eventType: z.enum(EventType),
        calendarId: z.uuid(),
        title: z
            .string()
            .max(16, t('calendar.event.create.form.title.maxLength', { charCount: 16 }))
            .optional(),
    })
    .refine(
        (data) => {
            if (
                data.startTimeHours &&
                data.startTimeMinutes &&
                data.endTimeHours &&
                data.endTimeMinutes
            ) {
                const startMinutes =
                    Number.parseInt(data.startTimeHours) * 60 +
                    Number.parseInt(data.startTimeMinutes)
                const endMinutes =
                    Number.parseInt(data.endTimeHours) * 60 + Number.parseInt(data.endTimeMinutes)
                return endMinutes > startMinutes
            }
            return true
        },
        {
            message: t('calendar.event.create.form.time.endBeforeStart'),
            path: ['endTimeHours'],
        },
    )

export enum EventDateType {
    BLOCK = 'block',
    TIME = 'hours',
}
