import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { getMonthName } from '../../../utils/get-month-name'
import { MobileFooterProps } from '../types'

export const MobileFooter = ({ month }: MobileFooterProps) => {
    const { t } = useTranslation()

    return (
        <div className='snap-center snap w-full flex items-center justify-center flex-col space-y-2 pb-24 pt-8'>
            <p className='text-sm text-muted-foreground'>
                {t('goto', { name: t('gotoDestination.nextMonth') })}
            </p>
            <Button variant='outline' className='px-3'>
                {getMonthName(month + 1)}
                <ChevronRight />
            </Button>
        </div>
    )
}
