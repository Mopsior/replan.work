import { useTranslation } from 'react-i18next'
import { EventType } from '@/types/enums'
import { Event } from '../event/event'

export const MobileCalendar = () => {
    const { t } = useTranslation()

    return (
        <div className='space-y-24 h-full w-full md:hidden scroll-smooth snap-mandatory snap-y pt-0 p-8 pb-16 overflow-y-auto scroll-pb-20'>
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={`week-${index}`} className='flex flex-col gap-y-4 first:pt-4'>
                    <div className='flex flex-col gap-y-2'>
                        <span className='text-sm text-muted-foreground'>
                            {t('calendar.weekday')} {index + 1}
                        </span>
                        <div className='w-full h-px bg-muted rounded-full' />
                    </div>
                    <div className='space-y-4 snap-center snap-always'>
                        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                            <div className='space-y-2.5' key={`week-${index}-day-${day}`}>
                                <div className='flex items-end gap-x-2'>
                                    <h3 className='text-2xl text-foreground'>{day}</h3>
                                    <p className='text-xl text-muted-foreground'>
                                        {t('calendar.weekdays.1')}
                                    </p>
                                </div>
                                <Event
                                    title='Spotkanie z klientem'
                                    time='12:00'
                                    eventType={EventType.STATIONARY}
                                    color='0EA5E9'
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
