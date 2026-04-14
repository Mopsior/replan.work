import { useSearch } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useCalendar } from '@/hooks/use-calendar'
import { useEvents } from '@/hooks/use-events'
import { cn } from '@/lib/utils'
import { Route } from '@/routes/app/route'
import { EventType } from '@/types/enums'
import { Event } from '../event/event'
import { RectangleSkeleton } from '../skeletons/input'
import { getMonthName } from './get-month-name'
import { getWeekDay } from './get-week-day'

export const MobileCalendar = () => {
    const { t } = useTranslation()

    const { userId } = Route.useLoaderData()
    const { month, year } = useSearch({
        from: Route.fullPath,
    })

    const { days, firstDayOfMonth, daysInMonth, weeksCount } = useCalendar({
        month,
        year,
    })

    const { data: events, isLoading } = useEvents(userId, month, year)

    const today = new Date()
    const currentWeekRef = useRef<HTMLDivElement>(null)

    const getCurrentWeekIndex = () => {
        if (today.getMonth() + 1 !== month || today.getFullYear() !== year) {
            return -1
        }
        return Math.floor((today.getDate() + firstDayOfMonth - 2) / 7)
    }

    const currentWeekIndex = getCurrentWeekIndex()

    useEffect(() => {
        if (currentWeekRef.current) {
            currentWeekRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }, [month, year])

    return (
        <div className='space-y-24 h-full w-full md:hidden scroll-smooth snap-mandatory snap-y pt-0 p-8 pb-16 overflow-y-auto scroll-pb-20'>
            {Array.from({ length: weeksCount }).map((_, weekIndex) => (
                <div
                    key={`week-${weekIndex}`}
                    ref={currentWeekIndex === weekIndex ? currentWeekRef : null}
                    className='flex flex-col gap-y-4 first:pt-4'
                >
                    <div className='flex flex-col gap-y-2'>
                        <span className='text-sm text-muted-foreground'>
                            {t('calendar.weekday')} {weekIndex + 1}
                        </span>
                        <div className='w-full h-px bg-muted rounded-full' />
                    </div>
                    <div className='space-y-4 snap-start snap-always scroll-mt-2'>
                        {days.map((day, index) => {
                            if (!day?.day)
                                return <Fragment key={`week-${weekIndex}-day-empty-${index}`} />

                            const weekDay = (day.day + firstDayOfMonth - 2) % 7
                            const weekDayName = getWeekDay(weekDay)
                            const week =
                                day.day + firstDayOfMonth - 2 >= daysInMonth
                                    ? weeksCount
                                    : Math.floor((day.day + firstDayOfMonth - 2) / 7) + 1

                            if (week === weekIndex + 1) {
                                const eventsForDay = events?.filter((event) => {
                                    const eventDate = new Date(event.date)
                                    return eventDate.getDate() === day.day
                                })
                                return (
                                    <div
                                        className='space-y-2.5'
                                        key={`week-${weekIndex}-day-${day?.day}`}
                                    >
                                        <div className='flex items-end gap-x-2'>
                                            <h3
                                                className={cn([
                                                    'text-2xl',
                                                    weekDay === 5 || weekDay === 6
                                                        ? 'text-muted-foreground'
                                                        : 'text-foreground',
                                                    day.day === today.getDate() &&
                                                        month === today.getMonth() + 1 &&
                                                        year === today.getFullYear() && [
                                                            'bg-primary relative',
                                                            'before:absolute before:-left-1 before:top-0 before:w-1 before:h-full before:bg-primary before:rounded-l',
                                                            'after:absolute after:-right-1 after:top-0 after:w-1 after:h-full after:bg-primary after:rounded-r',
                                                            'text-background',
                                                        ],
                                                ])}
                                            >
                                                {day?.day}
                                            </h3>
                                            <p className='text-xl text-muted-foreground'>
                                                {weekDayName}
                                            </p>
                                        </div>
                                        {eventsForDay && eventsForDay.length > 0
                                            ? eventsForDay.map((event) => {
                                                  return (
                                                      <Event
                                                          key={`event-${event.id}`}
                                                          title={event.title ?? event.calendarName}
                                                          time={event.startTime ?? event.totalTime!}
                                                          isTotalTime={!!event.totalTime}
                                                          eventType={event.eventType as EventType}
                                                          color={event.calendarColor ?? undefined}
                                                      />
                                                  )
                                              })
                                            : !isLoading && (
                                                  <p className=' text-sm text-muted-foreground'>
                                                      {t('calendar.event.empty')}
                                                  </p>
                                              )}
                                        {!eventsForDay && isLoading && (
                                            <RectangleSkeleton className='w-full h-14' />
                                        )}
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            ))}
            <div className='snap-center snap w-full flex items-center justify-center flex-col space-y-2 pb-24 pt-8'>
                <p className='text-sm text-muted-foreground'>
                    {t('goto', { name: t('gotoDestination.nextMonth') })}
                </p>
                <Button variant='outline' className='px-3'>
                    {getMonthName(month + 1)}
                    <ChevronRight />
                </Button>
            </div>
        </div>
    )
}
