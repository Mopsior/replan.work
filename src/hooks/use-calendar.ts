import { useMemo } from 'react'
import type {
    CalendarDay,
    HolidayData,
    UseCalendarParams,
    UseCalendarReturn,
} from '@/features/calendar/types'
import holidaysData from '@/dataset.json'

/**
 * Generate calendar days
 * @param month - month (1-12, where 1 = january)
 * @param year - year (YYYY format)
 */
export const useCalendar = ({ month, year }: UseCalendarParams): UseCalendarReturn => {
    return useMemo(() => {
        const jsMonth = month - 1
        const firstDay = new Date(year, jsMonth, 1)

        const lastDay = new Date(year, jsMonth + 1, 0)
        const daysInMonth = lastDay.getDate()

        let firstDayOfWeek = firstDay.getDay()
        firstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek

        let lastDayOfWeek = lastDay.getDay()
        lastDayOfWeek = lastDayOfWeek === 0 ? 7 : lastDayOfWeek

        const days: Array<CalendarDay | null> = []

        for (let i = 1; i < firstDayOfWeek; i++) {
            days.push(null)
        }

        const holidays: HolidayData = holidaysData

        for (let day = 1; day <= daysInMonth; day++) {
            days.push({
                day,
                date: new Date(year, jsMonth, day),
                isFree: holidays[year][month].includes(day),
            })
        }

        return {
            days,
            firstDayOfMonth: firstDayOfWeek,
            daysInMonth,
            weeksCount: Math.ceil(days.length / 7),
            lastDayOfMonth: lastDayOfWeek,
        }
    }, [month, year])
}
