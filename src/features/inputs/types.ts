import { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react'
import { Locale } from 'react-day-picker'
import { enUS, pl } from 'react-day-picker/locale'
import { Field, FieldError } from '@/components/ui/field'
import { InputGroupInput } from '@/components/ui/input-group'
import { RadioGroup } from '@/components/ui/radio-group'

export interface RadioGroupProps extends ComponentProps<typeof RadioGroup> {
    items: Array<{
        title?: string
        description?: string
        icon?: ReactNode
        value: string
    }>
    orientation?: ComponentProps<typeof Field>['orientation']
    coloredTitle?: boolean
}

export interface DatePickerProps {
    date: Date
    setDate: Dispatch<SetStateAction<Date>>
    id?: string
    isInvalid?: boolean
    errors?: ComponentProps<typeof FieldError>['errors']
}

export interface FieldTitleProps {
    children: React.ReactNode
    className?: string
    coloredTitle?: boolean
}

export const I18N_TO_LOCALE: Partial<Record<string, Locale>> = {
    pl: pl,
    'en-US': enUS,
} as const

export interface TimePickerInputProps extends ComponentProps<typeof InputGroupInput> {
    name: string
    isInvalid: boolean
    value?: string
    handleChange: (value: string) => void
    handleBlur: () => void
    type?: TimePickerType
    firstRef?: React.RefObject<HTMLInputElement | null>
    secondRef?: React.RefObject<HTMLInputElement | null>
}

export enum TimePickerType {
    HOURS = 'hours',
    MINUTES = 'minutes',
}
