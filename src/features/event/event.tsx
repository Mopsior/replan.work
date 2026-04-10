import { cn } from '@/lib/utils'
import { COLOR_PALETTE } from '@/types/constants'
import { variantIcon, variantTranslation } from './get-variants'
import { EventProps, TimeLabelProps } from './types'

const TimeLabel = ({ time, isTotalTime, visibleOnMobile }: TimeLabelProps) => {
    const [hour, minutes] = time?.split(':') ?? []

    return (
        <span
            className={cn([
                'text-muted-foreground font-medium text-sm md:text-xs',
                visibleOnMobile ? 'md:hidden' : 'hidden md:inline',
            ])}
        >
            {isTotalTime
                ? `${Number(hour)}h ${Number(minutes) > 0 && `${minutes}m`}`
                : `${hour}:${minutes}`}
        </span>
    )
}

export const Event = ({
    title,
    time,
    eventType,
    color,
    isOneLiner = false,
    isTotalTime = false,
}: EventProps) => (
    <div
        className={cn([
            'bg-secondary flex h-fit w-full flex-col rounded-md px-3 py-2 md:px-2 md:py-1',
        ])}
    >
        <div
            className={cn([
                'grid grid-cols-[12px_auto_1fr] gap-x-2 md:grid-cols-[8px_auto_1fr] md:gap-x-1',
            ])}
        >
            {color && (
                <div
                    className={cn(
                        'my-auto rounded-lg size-3 md:size-2',
                        COLOR_PALETTE.find(({ hex }) => hex === color)?.tailwind ?? color,
                    )}
                />
            )}
            {time && <TimeLabel time={time} isTotalTime={isTotalTime} />}
            <span className={cn(['text-foreground truncate text-sm md:text-xs md:font-medium'])}>
                {title}
            </span>
        </div>
        {!isOneLiner && (
            <div className={cn(['flex gap-x-1 pl-5 md:pl-3'])}>
                {time && (
                    <div className='grid grid-cols-[auto_16px] gap-x-1 items-center md:hidden'>
                        <TimeLabel time={time} isTotalTime={isTotalTime} visibleOnMobile />
                        <div className='size-1 bg-muted-foreground rounded-full mx-auto' />
                    </div>
                )}
                <div className={cn(['grid items-center gap-x-1 md:grid-cols-[12px_auto]'])}>
                    {variantIcon[eventType]}
                    <span
                        className={cn([
                            'text-muted-foreground font-medium truncate text-sm md:text-xs',
                        ])}
                    >
                        {variantTranslation[eventType]}
                    </span>
                </div>
            </div>
        )}
    </div>
)
