import { Link } from '@tanstack/react-router'
import { Undo2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { FileRouteTypes } from '@/routeTree.gen'

export const Return = ({ to, className }: { to: FileRouteTypes['to']; className?: string }) => {
    const { t } = useTranslation()

    return (
        <div className={cn(['h-fit w-full', className])}>
            <Link to={to} search={(prev) => prev}>
                <Button variant='ghost' className='text-muted-foreground'>
                    <Undo2 />
                    {t('return')}
                </Button>
            </Link>
        </div>
    )
}
