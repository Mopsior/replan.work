import { useSearch } from '@tanstack/react-router'
import { CalendarItem } from './item'
import { getPosition } from './get-position'
import { useCalendar } from '@/hooks/use-calendar'
import { Route } from '@/routes/app/route'

export const CalendarGrid = () => {
    const { month, year } = useSearch({
        from: Route.fullPath,
    })

    const { days, firstDayOfMonth, daysInMonth, weeksCount, lastDayOfMonth } = useCalendar({
        month,
        year,
    })

    const today = new Date()

    return days.map((day, index) => {
        const key = `calendar-item-${day?.day}-${month}-${year}-${index}`
        if (!day?.day) return <div key={key} />

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
            />
        )
    })
}
