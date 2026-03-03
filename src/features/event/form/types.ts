import { RadioGroupProps } from '@base-ui/react/radio-group'
import { HTMLAttributes, Ref, RefObject } from 'react'
import { calendars } from '@/db/schema'
import { TimePickerType, TimePickerVariant } from '@/features/inputs/types'

export type Calendar = typeof calendars.$inferSelect

export interface CalendarSelectProps {
    value: string
    onValueChange: RadioGroupProps['onValueChange']
}

export interface CalendarListProps extends CalendarSelectProps, HTMLAttributes<HTMLDivElement> {
    calendars: Calendar[]
    isLoading: boolean
}

export interface TimePickerFieldProps {
    ref: Ref<HTMLInputElement>
    firstRef?: RefObject<HTMLInputElement | null> | undefined
    secondRef?: RefObject<HTMLInputElement | null> | undefined
    type: TimePickerType
    variant?: TimePickerVariant
}
