import { Cell } from './types'
import type { CalendarDay } from './types'

export const getPosition = (
    day: CalendarDay,
    index: number,
    firstDayOfMonth: number,
    daysInMonth: number,
    weeksCount: number,
    lastDayOfMonth: number,
): Cell => {
    if (day.day === 1 && index < 6) return Cell.TOP_LEFT
    if (day.day === 1 && index === 6) return Cell.TOP_RIGHT_LEFT
    if (index === 6) return Cell.TOP_RIGHT
    if (index < 6) return Cell.TOP
    if (index === 7 && firstDayOfMonth !== 1) return Cell.TOP_LEFT
    if (index / 7 > 1 && index / 7 < 2 && index % 7 < firstDayOfMonth - 1) return Cell.TOP

    if (day.day === daysInMonth && lastDayOfMonth === 1) return Cell.BOTTOM_RIGHT_LEFT
    if (index / 7 === weeksCount - 1) return Cell.BOTTOM_LEFT
    if (
        index % 7 === 6 &&
        index / 7 > weeksCount - 2 &&
        index / 7 < weeksCount - 1 &&
        lastDayOfMonth !== 7
    )
        return Cell.BOTTOM_RIGHT
    if (day.day === daysInMonth && lastDayOfMonth !== 7) return Cell.BOTTOM_RIGHT_FIXED_WIDTH
    if (day.day === daysInMonth) return Cell.BOTTOM_RIGHT
    if (index / 7 >= weeksCount - 1 && index / 7 <= weeksCount) return Cell.BOTTOM
    if (index / 7 > weeksCount - 2 && index / 7 < weeksCount - 1 && index % 7 > lastDayOfMonth - 1)
        return Cell.BOTTOM_TOP

    if (index % 7 === 0 && index / 7 === weeksCount - 2) return Cell.LEFT_FIXED
    if (index % 7 === 0) return Cell.LEFT
    if (index % 7 === 6) return Cell.RIGHT

    if (index / 7 > weeksCount - 2 && index / 7 < weeksCount - 1) return Cell.CENTER_FIXED_BOTTOM
    return Cell.CENTER
}
