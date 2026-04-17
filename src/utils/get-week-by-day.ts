import { getDayOffset } from './get-day-offset'

export const getWeekDayByDay = (day: number, firstDayOfMonth: number) =>
    getDayOffset(day, firstDayOfMonth) % 7
