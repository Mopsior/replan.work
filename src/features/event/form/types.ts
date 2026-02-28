import { RadioGroupProps } from '@base-ui/react/radio-group'
import { HTMLAttributes } from 'react'
import { calendars } from '@/db/schema'

export type Calendar = typeof calendars.$inferSelect

export interface CalendarSelectProps {
    value: string
    onValueChange: RadioGroupProps['onValueChange']
}

export interface CalendarListProps extends CalendarSelectProps, HTMLAttributes<HTMLDivElement> {
    calendars: Calendar[]
    isLoading: boolean
}
