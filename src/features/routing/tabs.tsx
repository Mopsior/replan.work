import { useLocation, useNavigate } from '@tanstack/react-router'
import { ChartNoAxesColumn, Share2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Tabs as ShadTabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserButton } from '../clerk/user-button'
import { Return } from '../return'
import { selectedRouteTab } from './types'

export const Tabs = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()

    if (!selectedRouteTab[location.pathname])
        return (
            <div className='w-full'>
                <Return to='/app/summary' className='not-md:hidden -ml-3' />
            </div>
        )

    return (
        <div className='flex w-full justify-center items-center gap-4 flex-col md:flex-row'>
            <ShadTabs value={selectedRouteTab[location.pathname]} className='not-md:hidden'>
                <TabsList>
                    <TabsTrigger
                        value={'summary'}
                        onClick={() => navigate({ to: '/app/summary', search: (prev) => prev })}
                    >
                        <ChartNoAxesColumn />
                        <span className='block md:hidden lg:block'>{t('tabs.summary.label')}</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value={'share'}
                        onClick={() => navigate({ to: '/app/share', search: (prev) => prev })}
                    >
                        <Share2 />
                        <span className='block md:hidden lg:block'>{t('tabs.share.label')}</span>
                    </TabsTrigger>
                </TabsList>
            </ShadTabs>
            <div className='hidden h-fit w-fit xl:flex items-center justify-center'>
                <UserButton />
            </div>
        </div>
    )
}
