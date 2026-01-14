export interface ItemProps {
    day: string
    position: Cell
}

export enum Cell {
    TOP = 'top',
    TOP_RIGHT = 'top-right',
    TOP_LEFT = 'top-left',
    TOP_RIGHT_LEFT = 'top-right-left',
    LEFT = 'left',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    BOTTOM_RIGHT = 'bottom-right',
    BOTTOM_LEFT = 'bottom-left',
    BOTTOM_RIGHT_LEFT = 'bottom-right-left',
    CENTER = 'center',
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
