import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { ChartNoAxesColumn, Settings2, Share2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Tabs as ShadTabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserButton } from '../clerk/user-button'
import { CreateEvent } from '../event/create'
import { Return } from '../return'
import { selectedRouteTab } from './types'

export const Tabs = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()

    if (!selectedRouteTab[location.pathname])
        return <Return to='/app/summary' className='not-md:hidden' />

    return (
        <div className='flex w-full justify-center items-center gap-x-4'>
            <div className='block md:hidden'>
                <CreateEvent />
            </div>
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
            <Link to='/app/settings' className='md:hidden'>
                <Button variant='secondary'>
                    <Settings2 />
                </Button>
            </Link>
            <div className='not-md:hidden h-fit w-fit flex items-center justify-center'>
                <UserButton />
            </div>
        </div>
    )
}
