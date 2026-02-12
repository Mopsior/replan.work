import { useSearch } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { useCalendar } from '@/hooks/use-calendar'
import { useEvents } from '@/hooks/use-events'
import { Route } from '@/routes/app/route'
import { EventType } from '@/types/enums'
import { Event } from './event'
import { formatTime } from './format-time'
import { getDuration } from './get-duration'
import { getPosition } from './get-position'
import { CalendarItem } from './item'

export const CalendarGrid = () => {
    const { userId } = Route.useLoaderData()
    const { t } = useTranslation()
    const { month, year } = useSearch({
        from: Route.fullPath,
    })

    const { days, firstDayOfMonth, daysInMonth, weeksCount, lastDayOfMonth } = useCalendar({
        month,
        year,
    })

    const { data: events, isLoading, error } = useEvents(userId, month, year)

    if (error) {
        toast.error(t('calendar.event.fetchError'))
        console.error(error)
    }

    const today = new Date()

    return days.map((day, index) => {
        const key = `calendar-item-${day?.day}-${month}-${year}-${index}`
        if (!day?.day) return <div key={key} />

        const eventsForDay = events?.filter((event) => {
            const eventDate = new Date(event.date)
            return eventDate.getDate() === day.day
        })

        const totalTime = eventsForDay?.reduce(
            (acc, event) => acc + getDuration(event.startTime, event.endTime),
            0,
        )

        return (
            <CalendarItem
                key={key}
                day={day.day.toString()}
                position={getPosition(
                    day,
                    index,
                    firstDayOfMonth,
                    daysInMonth,
                    weeksCount,
                    lastDayOfMonth,
                )}
                isWeekday={index % 7 === 5 || index % 7 === 6}
                isFreeDay={day.isFree}
                isToday={
                    day.day === today.getDate() &&
                    month === today.getMonth() + 1 &&
                    year === today.getFullYear()
                }
                isLoading={isLoading}
                eventsCount={eventsForDay?.length}
                totalTime={totalTime ? formatTime(totalTime) : undefined}
            >
                {eventsForDay &&
                    eventsForDay.map((event, index) => {
                        if (index >= 2) return null
                        return (
                            <Event
                                key={`event-${event.id}`}
                                title={event.title ?? event.calendarName}
                                time={event.startTime}
                                eventType={event.eventType as EventType}
                                color={event.calendarColor ?? undefined}
                                isOneLiner={eventsForDay.length > 1}
                            />
                        )
                    })}
            </CalendarItem>
        )
    })
}
