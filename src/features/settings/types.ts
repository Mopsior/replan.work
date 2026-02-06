import { t } from 'i18next'
import z from 'zod'

export const COLOR_PALETTE = [
    { hex: 'FF0000', tailwind: 'bg-red-600' },
    { hex: '0EA5E9', tailwind: 'bg-sky-500' },
    { hex: '10B981', tailwind: 'bg-emerald-500' },
    { hex: 'F59E0B', tailwind: 'bg-amber-500' },
    { hex: '8B5CF6', tailwind: 'bg-violet-500' },
    { hex: 'EC4899', tailwind: 'bg-pink-500' },
    { hex: '422006', tailwind: 'bg-yellow-950' },
    { hex: '404040', tailwind: 'bg-neutral-700' },
] as const

export const formSchema = z.object({
    name: z
        .string()
        .min(1, t('appSettings.calendars.create.form.name.required'))
        .max(16, t('appSettings.calendars.create.form.name.maxLength')),
    color: z
        .string()
        .min(6)
        .max(6)
        .refine(
            (val) => /^([0-9A-F]{3}){1,2}$/i.test(val),
            t('appSettings.calendars.create.form.color.invalid'),
        ),
    salary: z
        .number()
        .positive(t('appSettings.calendars.create.form.salary.invalid'))
        .max(150, t('appSettings.calendars.create.form.salary.invalid'))
        .optional(),
})
