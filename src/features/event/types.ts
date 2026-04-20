import { t } from 'i18next'
import z from 'zod'
import { MAX, MAX_APP_DATE, MIN, MIN_APP_DATE } from '@/types/constants'
import { EventType } from '@/types/enums'
import { Calendar } from './form/types'

export interface EventProps {
    title: string
    time?: string
    color?: string
    eventType: EventType
    isOneLiner?: boolean
    isTotalTime?: boolean
}

export interface TimeLabelProps {
    time?: string
    isTotalTime?: boolean
    visibleOnMobile?: boolean
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
    .refine(
        (data) => {
            if (
                (data.totalTimeHours || data.totalTimeMinutes) &&
                (data.startTimeHours ||
                    data.startTimeMinutes ||
                    data.endTimeHours ||
                    data.endTimeMinutes)
            ) {
                return false
            }
            return true
        },
        {
            message: t('calendar.event.create.form.time.variantsConflict'),
            path: ['date'],
        },
    )

export type FormValues = z.infer<typeof formSchema>

export enum EventDateType {
    BLOCK = 'block',
    TIME = 'hours',
}

export const defaultFormValues = (calendars?: Calendar[]) => {
    const today = new Date()

    return {
        date: new Date(),
        startTimeHours: today.getHours().toString().padStart(2, '0'),
        startTimeMinutes: today.getMinutes().toString().padStart(2, '0'),
        endTimeHours: (today.getHours() + 1).toString().padStart(2, '0'),
        endTimeMinutes: today.getMinutes().toString().padStart(2, '0'),
        eventType: EventType.STATIONARY,
        calendarId: calendars?.[0]?.id ?? '',
        title: calendars?.[0]?.name ?? '',
    } as z.infer<typeof formSchema>
}
