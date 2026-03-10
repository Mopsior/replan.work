import { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react'
import { Locale } from 'react-day-picker'
import { enUS, pl } from 'react-day-picker/locale'
import { FieldError } from '@/components/ui/field'
import { InputGroupInput } from '@/components/ui/input-group'
import { RadioGroup as BaseRadioGroup } from '@/components/ui/radio-group'

export type RadioGroupItemType = {
    title?: string
    description?: string
    icon?: ReactNode
    value: string
}

export interface RadioGroupProps extends ComponentProps<typeof BaseRadioGroup> {
    items: RadioGroupItemType[]
    variant?: RadioGroupVariant
}

export enum RadioGroupVariant {
    DEFAULT = 'default',
    SMALL = 'small',
    DYNAMIC = 'dynamic',
}

export interface RadioGroupItemProps {
    item: RadioGroupItemType
}

export interface FieldTitleProps {
    children: React.ReactNode
    className?: string
}

export interface DatePickerProps {
    date: Date
    setDate: Dispatch<SetStateAction<Date>>
    id?: string
    isInvalid?: boolean
    errors?: ComponentProps<typeof FieldError>['errors']
}

export const I18N_TO_LOCALE: Partial<Record<string, Locale>> = {
    pl: pl,
    'en-US': enUS,
} as const

export enum TimePickerVariant {
    DEFAULT = 'default',
    WIDE = 'wide',
}

export interface TimePickerProps {
    children: React.ReactNode
    variant?: TimePickerVariant
}

export enum TimePickerType {
    HOURS = 'hours',
    MINUTES = 'minutes',
}

export interface TimePickerInputProps extends ComponentProps<typeof InputGroupInput> {
    name: string
    isInvalid: boolean
    value?: string
    handleChange: (value: string) => void
    handleBlur: () => void
    type?: TimePickerType
    firstRef?: React.RefObject<HTMLInputElement | null>
    secondRef?: React.RefObject<HTMLInputElement | null>
    variant?: TimePickerVariant
}

export const hoursSuffix = (hours: number) => {
    if (hours === 1) return 'one'
    if ((hours >= 2 && hours <= 4) || hours === 0) return 'few'
    return 'many'
}
