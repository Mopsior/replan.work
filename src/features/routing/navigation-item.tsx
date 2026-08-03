import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { TRoutes } from '@/types/types'

export const NavigationItem = ({
    to,
    Icon,
    title,
    description,
    children,
}: {
    to: TRoutes
    Icon: React.ReactNode
    title: string
    description?: string
    children?: ReactNode
}) => (
    <Link
        to={to}
        search={(prev) => prev}
        viewTransition={{ types: ['mobile-drawer-forward'] }}
        className={cn([
            'grid gap-x-4 items-center w-full',
            children ? 'grid-cols-[52px_auto_1fr]' : 'grid-cols-[52px_auto_24px]',
        ])}
    >
        <div className='h-full w-full flex items-center justify-center bg-popover rounded-lg p-2'>
            {Icon}
        </div>
        <div className='py-2'>
            <p>{title}</p>
            <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
        {children ?? <ChevronRight className='text-muted-foreground' />}
    </Link>
)
