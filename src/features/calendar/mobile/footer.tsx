import { useNavigate } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { getMonthName } from '@/utils/get-month-name'
import { MobileFooterProps } from '../types'

export const MobileFooter = ({ month }: MobileFooterProps) => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <div className='snap-center snap w-full flex flex-col items-center justify-center gap-4 h-fit py-8'>
            <p className='text-sm text-muted-foreground mb-0'>
                {t('goto', { name: t('gotoDestination.nextMonth') })}
            </p>
            <Button
                variant='outline'
                className='px-3'
                onClick={() => navigate({ to: '.', search: { month: month + 1 } })}
            >
                {getMonthName(month + 1)}
                <ChevronRight />
            </Button>
        </div>
    )
}
