import { Link } from '@tanstack/react-router'
import { ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { RectangleSkeleton } from './input'

export const ListItemSkeleton = ({
    count = 3,
    className,
}: {
    count?: number
    className?: string
}) => {
    return Array.from({ length: count }, (_, index) => (
        <RectangleSkeleton key={`skeleton-${index}`} className={cn(['h-10 w-full', className])} />
    ))
}

export const EmptyListSkeleton = () => {
    const { t } = useTranslation()

    return (
        <Link to='/app/settings' className='group'>
            <p>{t('calendar.event.create.form.calendar.empty.label')}</p>
            <p className='text-sm text-muted-foreground group-hover:underline underline-offset-2 flex'>
                {t('calendar.event.create.form.calendar.empty.description')}
                <span className='not-md:hidden'>
                    <ExternalLink size={16} />
                </span>
            </p>
            <Button className='md:hidden w-full mt-4' variant='outline'>
                <ExternalLink size={16} />
                {t('goto', { name: t('gotoDestination.settings') })}
            </Button>
        </Link>
    )
}
