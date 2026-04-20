import { getDayOffset } from './get-day-offset'

export const getWeekIndexByDay = (day: number, firstDayOfMonth: number) =>
    Math.floor(getDayOffset(day, firstDayOfMonth) / 7)
