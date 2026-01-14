import { useState } from 'react'
import { CalendarItem } from './item'
import { Cell } from './types'
import { useCalendar } from '@/hooks/use-calendar'
import { cn } from '@/lib/utils'

export const Calendar = () => {
    const [month] = useState<number>(3)
    const [year] = useState<number>(2026)

    const { days, firstDayOfMonth, daysInMonth, weeksCount, lastDayOfMonth } = useCalendar({
        month,
        year,
    })

    return (
        <div className={cn(['grid grid-cols-7', `grid-rows-${weeksCount}`])}>
            {days.map((day, index) => {
                const key = `calendar-item-${day?.day}-${month}-${year}-${index}`
                if (!day?.day) return <div key={key} />

                const getPosition = (): Cell => {
                    console.log(day.day, index / 7, weeksCount)
                    if (day.day === 1 && index < 6) return Cell.TOP_LEFT
                    if (day.day === 1 && index === 6) return Cell.TOP_RIGHT_LEFT
                    if (index === 6) return Cell.TOP_RIGHT
                    if (index < 6) return Cell.TOP
                    if (index === 7 && firstDayOfMonth !== 1) return Cell.TOP_LEFT
                    if (index / 7 > 1 && index / 7 < 2 && index % 7 < firstDayOfMonth - 1)
                        return Cell.TOP

                    if (day.day === daysInMonth && lastDayOfMonth === 1)
                        return Cell.BOTTOM_RIGHT_LEFT
                    if (index / 7 === weeksCount - 1) return Cell.BOTTOM_LEFT
                    if (
                        index % 7 === 6 &&
                        index / 7 > weeksCount - 2 &&
                        index / 7 < weeksCount - 1 &&
                        lastDayOfMonth !== 7
                    )
                        return Cell.BOTTOM_RIGHT
                    if (day.day === daysInMonth) return Cell.BOTTOM_RIGHT
                    if (index / 7 >= weeksCount - 1 && index / 7 <= weeksCount) return Cell.BOTTOM
                    if (
                        index / 7 > weeksCount - 2 &&
                        index / 7 < weeksCount - 1 &&
                        index % 7 > lastDayOfMonth - 1
                    )
                        return Cell.BOTTOM

                    if (index % 7 === 0) return Cell.LEFT
                    if (index % 7 === 6) return Cell.RIGHT

                    return Cell.CENTER
                }

                return <CalendarItem key={key} day={day.day.toString()} position={getPosition()} />
            })}
        </div>
    )
}
