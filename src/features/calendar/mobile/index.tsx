import { useSearch } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { useCalendar } from '@/hooks/use-calendar'
import { useEvents } from '@/hooks/use-events'
import { useMobileCalendarData } from '@/hooks/use-mobile-calendar-data'
import { Route } from '@/routes/app/route'
import { MobileFooter } from './footer'
import { MobileWeek } from './week'

export const MobileCalendar = () => {
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
    const didInitialScrollRef = useRef(false)

    const { weeks, currentWeekIndex } = useMobileCalendarData({
        days,
        firstDayOfMonth,
        weeksCount,
        month,
        year,
        events,
    })

    useEffect(() => {
        didInitialScrollRef.current = false
    }, [month, year])

    useEffect(() => {
        if (didInitialScrollRef.current) return
        if (!currentWeekRef.current) return
        if (!events) return
        currentWeekRef.current.scrollIntoView({
            block: 'start',
        })
        didInitialScrollRef.current = true
    }, [month, year, events])

    useEffect(() => {
        if (!error) return

        toast.error(t('calendar.event.fetchError'))
        console.error(error)
    }, [error, t])

    return (
        <div className='space-y-24 h-full w-full md:hidden scroll-smooth snap-mandatory snap-y pt-0 p-8 pb-16 overflow-y-auto scroll-pb-20'>
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
