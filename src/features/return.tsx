import { Link } from '@tanstack/react-router'
import { Undo2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { FileRouteTypes } from '@/routeTree.gen'

export const Return = ({
    to,
    className,
    viewTransition = false,
}: {
    to: FileRouteTypes['to']
    className?: string
    viewTransition?: boolean
}) => {
    const { t } = useTranslation()

    return (
        <Link
            to={to}
            search={(prev) => prev}
            viewTransition={viewTransition ? { types: ['mobile-drawer-back'] } : undefined}
        >
            <Button variant='ghost' className={cn('text-muted-foreground', className)}>
                <Undo2 className='-mt-1' />
                {t('return')}
            </Button>
        </Link>
    )
}
