import { ChartNoAxesColumn, Share2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { Return } from '../return'
import { UserButton } from '../clerk/user-button'
import { selectedRouteTab } from './types'
import { Tabs as ShadTabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const Tabs = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()

    if (!selectedRouteTab[location.pathname])
        return <Return to='/app/summary' className='not-md:hidden' />

    return (
        <div className='relative flex w-full justify-center not-md:items-center not-md:gap-x-4'>
            <ShadTabs value={selectedRouteTab[location.pathname]}>
                <TabsList>
                    <TabsTrigger
                        value={'summary'}
                        onClick={() => navigate({ to: '/app/summary', search: (prev) => prev })}
                    >
                        <ChartNoAxesColumn />
                        <span className='block md:hidden lg:block'>{t('tabs.summary')}</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value={'share'}
                        onClick={() => navigate({ to: '/app/share', search: (prev) => prev })}
                    >
                        <Share2 />
                        <span className='block md:hidden lg:block'>{t('tabs.share')}</span>
                    </TabsTrigger>
                </TabsList>
            </ShadTabs>
            <div className='fixed top-13 right-8 -translate-y-1/2 transform not-md:hidden'>
                <UserButton />
            </div>
        </div>
    )
}
