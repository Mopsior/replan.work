import { t } from 'i18next'
import z from 'zod'
import { FormVariant } from '@/types/enums'

export const formSchema = z.object({
    name: z
        .string()
        .min(1, t('appSettings.calendars.form.name.required'))
        .max(16, t('appSettings.calendars.form.name.maxLength')),
    color: z
        .string()
        .min(6, t('appSettings.calendars.form.color.tooShort', { charCount: 6 }))
        .max(6, t('appSettings.calendars.form.color.tooShort', { charCount: 6 }))
        .refine(
            (val) => /^([0-9A-F]{3}){1,2}$/i.test(val),
            t('appSettings.calendars.form.color.invalid'),
        ),
    salary: z
        .number()
        .positive(t('appSettings.calendars.form.salary.invalid'))
        .max(150, t('appSettings.calendars.form.salary.invalid'))
        .optional(),
})

export interface CalendarFormProps {
    setIsOpen: (open: boolean) => void
    variant: FormVariant
    defaultValues?: {
        name: string
        color: string
        salary?: number
    }
    id?: string
}

export interface RemoveCalendarProps {
    id: string
    setIsOpen: (isOpen: boolean) => void
}
