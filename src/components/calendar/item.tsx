import { Cell } from './types'
import type { ItemProps } from './types'
import { cn } from '@/lib/utils'

export const CalendarItem = ({ day, position }: ItemProps) => {
    return (
        <div className={cn(['border-border', position === Cell.TOP && 'border-r border-l'])}>
            <span>{day}</span>
            <span>{position}</span>
        </div>
    )
}
