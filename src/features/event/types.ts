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
    // TODO: add validation for time fields
    startTime: z.string().optional(),
    endTime: z.string().optional(),
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
