import { ReactNode } from 'react'
import type { EventType } from '@/types/enums'

export interface ItemProps {
    day: string
    position: Cell
    isWeekday?: boolean
    isFreeDay?: boolean
    isToday?: boolean
    isLoading?: boolean
    eventsCount?: number
    totalTime?: string
    children?: ReactNode
}

export interface EventProps {
    title: string
    time?: string
    color?: string
    eventType: EventType
    isOneLiner?: boolean
}

export enum Cell {
    TOP = 'top',
    TOP_RIGHT = 'top-right',
    TOP_LEFT = 'top-left',
    TOP_RIGHT_LEFT = 'top-right-left',
    LEFT = 'left',
    LEFT_FIXED = 'left-fixed',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    BOTTOM_TOP = 'bottom-top',
    BOTTOM_RIGHT = 'bottom-right',
    BOTTOM_RIGHT_FIXED_WIDTH = 'bottom-right-fixed-width',
    BOTTOM_LEFT = 'bottom-left',
    BOTTOM_RIGHT_LEFT = 'bottom-right-left',
    CENTER = 'center',
    CENTER_FIXED_BOTTOM = 'center-fixed-bottom',
}

export interface UseCalendarParams {
    month: number
    year: number
}

export interface CalendarDay {
    day: number
    date: Date
    isFree: boolean
}

export interface UseCalendarReturn {
    days: Array<CalendarDay | null>
    firstDayOfMonth: number
    daysInMonth: number
    weeksCount: number
    lastDayOfMonth: number
}

export type HolidayData = {
    [year: string]: {
        [month: string]: Array<number>
    }
}

export interface ListItemProps {
    name: string
    color: string
    salary?: number
    id: string
}
