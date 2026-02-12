import { cn } from '@/lib/utils'
import { COLOR_PALETTE } from '@/types/constants'
import { variantIcon, variantTranslation } from './get-variants'
import type { EventProps } from './types'

export const Event = ({ title, time, eventType, color, isOneLiner }: EventProps) => {
    const [hour, minutes] = time?.split(':') ?? []

    return (
        <div className='bg-secondary flex h-fit w-full flex-col rounded-md px-2 py-1'>
            <div className='flex flex-row gap-x-1'>
                {color && (
                    <div
                        className={cn(
                            `my-auto size-2 rounded-lg`,
                            COLOR_PALETTE.find(({ hex }) => hex === color)?.tailwind ?? color,
                        )}
                    />
                )}
                {time && (
                    <span className='text-muted-foreground text-xs font-medium'>
                        {hour}:{minutes}
                    </span>
                )}
                <span className='text-foreground truncate text-xs font-medium'>{title}</span>
            </div>
            {!isOneLiner && (
                <div className='flex flex-row items-center gap-x-1 pl-3'>
                    {variantIcon[eventType]}
                    <span className='text-muted-foreground text-xs font-medium'>
                        {variantTranslation[eventType]}
                    </span>
                </div>
            )}
        </div>
    )
}
