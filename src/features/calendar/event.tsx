import { variantIcon, variantTranslation } from './get-variants'
import type { EventProps } from './types'

export const Event = ({ title, time, eventType, isOneLiner }: EventProps) => {
    return (
        <div className='bg-secondary flex h-fit w-full flex-col rounded-md px-2 py-1'>
            <div className='flex flex-row gap-x-1'>
                <div className={`my-auto size-2 rounded-lg bg-sky-500`} />
                <span className='text-muted-foreground text-xs font-medium'>{time}</span>
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
