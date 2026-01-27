import { cva } from 'class-variance-authority'
import { ChevronDown, CircleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Cell } from './types'
import { Event } from './event'
import type { ItemProps } from './types'
import { EventType } from '@/types/enums'
import { cn } from '@/lib/utils'

const cellVariants = cva(
    'border-border p-1 min-h-28 h-full relative flex flex-col items-center gap-y-1 justify-between',
    {
        variants: {
            position: {
                [Cell.TOP]: 'border-l border-t',
                [Cell.TOP_RIGHT]: 'border-t border-l border-r rounded-tr-md',
                [Cell.TOP_LEFT]: 'border-l border-t rounded-tl-md',
                [Cell.TOP_RIGHT_LEFT]: 'border-t border-x rounded-t-md',
                [Cell.LEFT]: 'border-l border-t',
                [Cell.LEFT_FIXED]: 'border-l border-y',
                [Cell.RIGHT]: 'border-r border-l border-t',
                [Cell.BOTTOM]: 'border-l border-b',
                [Cell.BOTTOM_TOP]: 'border-l border-y',
                [Cell.BOTTOM_RIGHT]: 'border-b border-r border-t border-l rounded-br-md',
                [Cell.BOTTOM_RIGHT_FIXED_WIDTH]:
                    'col-span-2 w-[calc(50%+1px)] border-b border-r border-l rounded-br-md',
                [Cell.BOTTOM_LEFT]: 'border-b border-l rounded-bl-md',
                [Cell.BOTTOM_RIGHT_LEFT]: 'border-b border-x rounded-b-md',
                [Cell.CENTER]: 'border-l border-t',
                [Cell.CENTER_FIXED_BOTTOM]: 'border-l border-y',
            },
            isWeekday: {
                false: null,
                true: 'text-muted-foreground',
            },
            isFreeDay: {
                false: null,
                true: 'bg-destructive/10',
            },
        },
    },
)

export const CalendarItem = ({ day, position, isWeekday, isFreeDay, isToday }: ItemProps) => {
    const { t } = useTranslation()
    const eventsLength = 3 // TODO: replace with real logic

    return (
        <div className={cellVariants({ position, isWeekday, isFreeDay })}>
            <div className='flex w-full flex-col items-center gap-y-1'>
                <span
                    className={cn([
                        'text-sm',
                        isToday && [
                            'bg-primary text-background flex items-center justify-center rounded-md',
                            day.length > 1 ? 'px-1' : 'px-2',
                        ],
                    ])}
                >
                    {day}
                </span>
                {isFreeDay && (
                    <CircleAlert className='text-destructive absolute top-1.5 right-1.5 size-4' />
                )}
                <Event
                    title='Teatr'
                    time='10:00'
                    eventType={EventType.STATIONARY}
                    /* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */
                    isOneLiner={eventsLength > 1}
                />
                {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
                {eventsLength > 1 && (
                    <Event
                        title='Teatr'
                        time='10:00'
                        eventType={EventType.STATIONARY}
                        /* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */
                        isOneLiner={eventsLength > 1}
                    />
                )}
            </div>
            <div className='flex w-full flex-col items-center gap-y-1'>
                {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
                {eventsLength > 2 ? (
                    <div className='flex flex-row items-center gap-x-1'>
                        <span className='text-muted-foreground text-xs'>
                            {t('calendar.event.more')}
                        </span>
                        <ChevronDown className='text-muted-foreground size-3' />
                    </div>
                ) : (
                    <span className='text-muted-foreground text-xs'>{t('exampleDuration')}</span>
                )}
            </div>
        </div>
    )
}
