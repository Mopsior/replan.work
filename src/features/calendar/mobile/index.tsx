import { useSearch } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { useCalendar } from '@/hooks/use-calendar'
import { useEvents } from '@/hooks/use-events'
import { useMobileCalendarData } from '@/hooks/use-mobile-calendar-data'
import { Route } from '@/routes/app/route'
import { CalendarProps } from '../types'
import { MobileFooter } from './footer'
import { MobileWeek } from './week'

export const MobileCalendar = ({ didInitialScroll, setDidInitialScroll }: CalendarProps) => {
    const { t } = useTranslation()

    const { userId } = Route.useLoaderData()
    const { month, year } = useSearch({
        from: Route.fullPath,
    })

    const { days, firstDayOfMonth, weeksCount } = useCalendar({
        month,
        year,
    })

    const { data: events, isLoading, error } = useEvents(userId, month, year)

    const currentWeekRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)

    const { weeks, currentWeekIndex } = useMobileCalendarData({
        days,
        firstDayOfMonth,
        weeksCount,
        month,
        year,
        events,
    })

    useEffect(() => {
        if (didInitialScroll) return
        if (!currentWeekRef.current) return
        if (!events) return
        currentWeekRef.current.scrollIntoView({
            block: 'start',
        })
        setDidInitialScroll(true)
    }, [month, year, events, didInitialScroll, setDidInitialScroll])

    useEffect(() => {
        if (!error) return

        toast.error(t('calendar.event.fetchError'))
        console.error(error)
    }, [error, t])

    return (
        <div
            className='space-y-24 h-full w-full md:hidden scroll-smooth snap-mandatory snap-y pt-0 p-8 pb-16 overflow-y-auto scroll-pb-20'
            ref={listRef}
        >
            {weeks.map((week) => (
                <MobileWeek
                    key={`week-${week.weekIndex}`}
                    ref={currentWeekIndex === week.weekIndex ? currentWeekRef : null}
                    week={week}
                    isLoading={isLoading}
                />
            ))}
            <MobileFooter month={month} />
        </div>
    )
}
