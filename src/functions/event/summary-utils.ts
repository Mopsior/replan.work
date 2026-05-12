import { getWeekDayByDay } from '@/utils/get-week-by-day'
import type { TimeAmount } from './types'

export const toTimeAmount = (ms: number): TimeAmount => {
    const safeMs = ms < 0 ? 0 : ms
    const hours = Math.floor(safeMs / 3600000)
    const minutes = Math.floor((safeMs % 3600000) / 60000)
    return { hours, minutes }
}

export const toFullHours = (ms: number) => {
    const safeMs = ms < 0 ? 0 : ms
    return Math.floor(safeMs / 3600000)
}

export const getSalary = (totalTimeMs: number, totalWeekendTimeMs: number, salaryRate: number) => {
    const weekdayMs = Math.max(0, totalTimeMs - totalWeekendTimeMs)
    const weekdayHours = toFullHours(weekdayMs)
    const weekendHours = toFullHours(totalWeekendTimeMs)
    return (weekdayHours + weekendHours) * salaryRate
}

export const isWeekend = (day: number, firstDayOfMonth: number) => {
    const weekDay = getWeekDayByDay(day, firstDayOfMonth)
    return weekDay === 5 || weekDay === 6
}
