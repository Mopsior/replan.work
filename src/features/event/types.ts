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

export const formSchema = z.object({
    calendarId: z.uuid(),
    date: z
        .date()
        .min(MIN_APP_DATE, t('calendar.event.create.form.date.minDate'))
        .max(MAX_APP_DATE, t('calendar.event.create.form.date.maxDate')),
    startTimeHours: z
        .string()
        .min(1, t('calendar.event.create.form.startTime.hours.minLength'))
        .max(2, t('calendar.event.create.form.startTime.hours.maxLength'))
        .optional(),
    startTimeMinutes: z
        .string()
        .min(1, t('calendar.event.create.form.startTime.minutes.minLength'))
        .max(2, t('calendar.event.create.form.startTime.minutes.maxLength'))
        .optional(),
    endTimeHours: z
        .string()
        .min(1, t('calendar.event.create.form.endTime.hours.minLength'))
        .max(2, t('calendar.event.create.form.endTime.hours.maxLength'))
        .optional(),
    endTimeMinutes: z
        .string()
        .min(1, t('calendar.event.create.form.endTime.minutes.minLength'))
        .max(2, t('calendar.event.create.form.endTime.minutes.maxLength'))
        .optional(),
    totalTime: z.string().optional(),
    eventType: z.enum(EventType),
    title: z
        .string()
        .max(16, t('calendar.event.create.form.title.maxLength', { charCount: 16 }))
        .optional(),
})

export enum EventDateType {
    BLOCK = 'block',
    TIME = 'hours',
}
