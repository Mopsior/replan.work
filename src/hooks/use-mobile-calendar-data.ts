import { useMemo } from 'react'
import { getCurrentWeekIndex } from '@/utils/get-current-week-index'
import { getWeekDayByDay } from '@/utils/get-week-by-day'
import { getWeekIndexByDay } from '@/utils/get-week-index-by-day'
import type { CalendarDay, MobileCalendarEvent, MobileWeekData } from '../features/calendar/types'

interface UseMobileCalendarDataParams {
    days: Array<CalendarDay | null>
    firstDayOfMonth: number
    weeksCount: number
    month: number
    year: number
    events?: MobileCalendarEvent[]
}

export const useMobileCalendarData = ({
    days,
    firstDayOfMonth,
    weeksCount,
    month,
    year,
    events,
}: UseMobileCalendarDataParams) => {
    const eventsByDay = useMemo(() => {
        if (!events) return undefined

        const groupedEvents = new Map<number, MobileCalendarEvent[]>()

        for (const event of events) {
            const eventDay = new Date(event.date).getDate()
            const eventsForDay = groupedEvents.get(eventDay)

            if (eventsForDay) {
                eventsForDay.push(event)
            } else {
                groupedEvents.set(eventDay, [event])
            }
        }

        return groupedEvents
    }, [events])

    const weeks = useMemo(() => {
        const initialWeeks: MobileWeekData[] = Array.from(
            { length: weeksCount },
            (_, weekIndex) => ({
                weekIndex,
                days: [],
            }),
        )

        for (const day of days) {
            if (!day) continue

            const weekIndex = getWeekIndexByDay(day.day, firstDayOfMonth)
            const week = initialWeeks[weekIndex]

            if (!week) continue

            week.days.push({
                day,
                weekDay: getWeekDayByDay(day.day, firstDayOfMonth),
                events: eventsByDay?.get(day.day),
            })
        }

        return initialWeeks
    }, [days, firstDayOfMonth, weeksCount, eventsByDay])

    const currentWeekIndex = useMemo(
        () =>
            getCurrentWeekIndex({
                month,
                year,
                firstDayOfMonth,
            }),
        [month, year, firstDayOfMonth],
    )

    return {
        weeks,
        currentWeekIndex,
    }
}
