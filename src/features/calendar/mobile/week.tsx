import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { MobileWeekProps } from '../types'
import { MobileDay } from './day'

export const MobileWeek = forwardRef<HTMLDivElement, MobileWeekProps>(
    ({ week, isLoading }, ref) => {
        const { t } = useTranslation()

        return (
            <div ref={ref} className='flex flex-col gap-y-4 first:pt-4'>
                <div className='flex flex-col gap-y-2'>
                    <span className='text-sm text-muted-foreground'>
                        {t('calendar.weekday')} {week.weekIndex + 1}
                    </span>
                    <div className='w-full h-px bg-muted rounded-full' />
                </div>

                <div className='space-y-4 snap-start snap-always scroll-mt-2'>
                    {week.days.map((dayData) => {
                        return (
                            <MobileDay
                                key={`week-${week.weekIndex}-day-${dayData.day.day}`}
                                dayData={dayData}
                                isLoading={isLoading}
                            />
                        )
                    })}
                </div>
            </div>
        )
    },
)

MobileWeek.displayName = 'MobileWeek'
