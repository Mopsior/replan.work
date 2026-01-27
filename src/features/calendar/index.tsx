import { t } from 'i18next'
import { CalendarGrid } from './grid'
import { MonthPicker } from './month-picker'
import { cn } from '@/lib/utils'

const weekdays = {
    1: t('calendar.weekdays.1'),
    2: t('calendar.weekdays.2'),
    3: t('calendar.weekdays.3'),
    4: t('calendar.weekdays.4'),
    5: t('calendar.weekdays.5'),
    6: t('calendar.weekdays.6'),
    7: t('calendar.weekdays.7'),
}

export const Calendar = () => {
    return (
        <div className='flex h-dvh w-full flex-col items-center gap-8 p-8 pb-16'>
            <MonthPicker />
            <div className='flex h-full w-full flex-col gap-y-4 overflow-y-auto'>
                <div className='grid h-fit w-full grid-cols-7'>
                    {Object.values(weekdays).map((day, index) => (
                        <div
                            className={cn([
                                'h-fit text-center text-sm',
                                index < 5 ? 'text-foreground' : 'text-muted-foreground',
                            ])}
                            key={`calendar-weekday-${day}`}
                        >
                            {day}
                        </div>
                    ))}
                </div>
                <div className='grid h-full w-full grid-cols-7'>
                    <CalendarGrid />
                </div>
            </div>
        </div>
    )
}
