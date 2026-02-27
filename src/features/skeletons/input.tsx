import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export const RectangleSkeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn('bg-muted/80 animate-pulse rounded-md transition-colors', className)}
        {...props}
    />
)
