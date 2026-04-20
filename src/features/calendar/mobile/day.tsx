import { CircleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { EventType } from '@/types/enums'
import { getWeekDay } from '../../../utils/get-week-day'
import { Event } from '../../event/event'
import { RectangleSkeleton } from '../../skeletons/input'
import { MobileDayProps } from '../types'

export const MobileDay = ({ dayData, isLoading }: MobileDayProps) => {
    const { t } = useTranslation()
    const today = new Date()
    const { day, weekDay, events } = dayData
    const weekDayName = getWeekDay(weekDay)

    const isToday =
        day.date.getDate() === today.getDate() &&
        day.date.getMonth() + 1 === today.getMonth() + 1 &&
        day.date.getFullYear() === today.getFullYear()

    return (
        <div className='space-y-2.5'>
            <div className='flex justify-between items-end gap-x-2'>
                <div className='flex gap-x-2 items-end'>
                    <h3
                        className={cn([
                            'text-2xl',
                            weekDay === 5 || weekDay === 6
                                ? 'text-muted-foreground'
                                : 'text-foreground',
                            isToday && [
                                'text-background relative',
                                'before:content-[""] before:absolute before:inset-0 before:bg-primary before:rounded-md before:-left-1/8 before:top-0 before:w-[125%] before:h-full before:-z-10',
                            ],
                        ])}
                    >
                        {day.day}
                    </h3>
                    <p className='text-xl text-muted-foreground'>{weekDayName}</p>
                </div>
                {day.isFree && (
                    <div className='flex items-center gap-x-2 text-sm text-destructive pb-1'>
                        <CircleAlert size={16} />
                        <p>{t('calendar.event.freeDay')}</p>
                    </div>
                )}
            </div>
            {events && events.length > 0 ? (
                events.map((event) => (
                    <Event
                        key={`event-${event.id}`}
                        title={event.title ?? event.calendarName}
                        time={event.startTime ?? event.totalTime ?? undefined}
                        isTotalTime={!!event.totalTime}
                        eventType={event.eventType as EventType}
                        color={event.calendarColor ?? undefined}
                    />
                ))
            ) : !isLoading ? (
                <p className=' text-sm text-muted-foreground'>{t('calendar.event.empty')}</p>
            ) : !events ? (
                <RectangleSkeleton className='w-full h-14' />
            ) : (
                <p className=' text-sm text-muted-foreground'>{t('calendar.event.empty')}</p>
            )}
        </div>
    )
}
