import { t } from 'i18next'

/**
 * Calculate the start (Monday) and end (Sunday) dates of a week
 * @param date - The date to calculate the week for
 * @returns Object with Monday, Sunday, and ISO week number
 */
export const getWeekBoundaries = (date: Date) => {
    const parsedDate = new Date(date)
    const day = parsedDate.getDay()

    // getDay() returns 0 (Sunday) - 6 (Saturday)
    // For Mon-Sun week: subtract (day === 0 ? 6 : day - 1) days
    const daysToMonday = day === 0 ? 6 : day - 1

    const monday = new Date(parsedDate)
    monday.setDate(monday.getDate() - daysToMonday)
    monday.setHours(0, 0, 0, 0)

    const sunday = new Date(monday)
    sunday.setDate(sunday.getDate() + 6)
    monday.setHours(0, 0, 0, 0)

    // Calculate ISO week number
    const weekDate = new Date(parsedDate)
    weekDate.setDate(weekDate.getDate() + 4 - (parsedDate.getDay() || 7))
    const yearStart = new Date(weekDate.getFullYear(), 0, 1)
    const weekNumber = Math.ceil(((weekDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)

    return {
        monday,
        sunday,
        weekNumber,
        year: parsedDate.getFullYear(),
    }
}

/**
 * Get week boundaries from week offset relative to current week
 * @param weekOffset - 0 for current week, negative for past, positive for future
 * @returns Object with Monday, Sunday, and week info
 */
export const getWeekBoundariesByOffset = (weekOffset: number) => {
    const today = new Date()
    const offsetDate = new Date(today)
    offsetDate.setDate(offsetDate.getDate() + weekOffset * 7)

    return getWeekBoundaries(offsetDate)
}

/**
 * Calculate week offset between two dates
 * Useful for infinite query pagination
 */
export const calculateWeekOffset = (from: Date, to: Date) => {
    const msPerWeek = 7 * 24 * 60 * 60 * 1000
    return Math.round((to.getTime() - from.getTime()) / msPerWeek)
}

/**
 * Get the week day name in Polish
 */
export const getWeekDayName = (date: Date): string => {
    const days = [
        t('calendar.weekdays.7'),
        t('calendar.weekdays.1'),
        t('calendar.weekdays.2'),
        t('calendar.weekdays.3'),
        t('calendar.weekdays.4'),
        t('calendar.weekdays.5'),
        t('calendar.weekdays.6'),
    ]
    return days[date.getDay()]
}
