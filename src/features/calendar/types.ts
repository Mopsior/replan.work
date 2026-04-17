import { t } from 'i18next'
import { HTMLAttributes, ReactNode } from 'react'

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

interface BaseListItemProps {
    name: string
    itemColor: string
}

export interface ListItemProps extends BaseListItemProps, HTMLAttributes<HTMLDivElement> {
    addon?: ReactNode
}

export interface ListItemEditableProps extends BaseListItemProps {
    id: string
    salary?: number
}

export interface ListItemRadioItemProps extends BaseListItemProps {
    value: string
}

export const weekdays = {
    1: t('calendar.weekdays.1'),
    2: t('calendar.weekdays.2'),
    3: t('calendar.weekdays.3'),
    4: t('calendar.weekdays.4'),
    5: t('calendar.weekdays.5'),
    6: t('calendar.weekdays.6'),
    7: t('calendar.weekdays.7'),
}

export interface MobileCalendarEvent {
    id: string
    date: string | Date
    title?: string | null
    calendarName: string
    startTime?: string | null
    totalTime?: string | null
    eventType: string
    calendarColor?: string | null
}

export interface MobileDayData {
    day: CalendarDay
    weekDay: number
    events?: MobileCalendarEvent[]
}

export interface MobileWeekData {
    weekIndex: number
    days: MobileDayData[]
}

export interface MobileDayProps {
    dayData: MobileDayData
    isLoading: boolean
}

export interface MobileWeekProps {
    week: MobileWeekData
    isLoading: boolean
}

export interface MobileFooterProps {
    month: number
}
