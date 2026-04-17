import { cn } from '@/lib/utils'
import { weekdays } from '../types'
import { CalendarGrid } from './grid'

export const DesktopCalendar = () => {
    return (
        <div className='flex h-full w-full flex-col gap-y-4 overflow-y-auto not-md:hidden'>
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
    )
}
