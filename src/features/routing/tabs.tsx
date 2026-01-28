import { ChartNoAxesColumn, Share2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { UserButton } from '../clerk/user-button'
import { Tabs as ShadTabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const Tabs = () => {
    const { t } = useTranslation()

    return (
        <div className='relative flex w-full justify-center'>
            <ShadTabs>
                <TabsList>
                    <TabsTrigger value={'summary'}>
                        <ChartNoAxesColumn />
                        <span className='not-lg:hidden'>{t('tabs.summary')}</span>
                    </TabsTrigger>
                    <TabsTrigger value={'share'}>
                        <Share2 />
                        <span className='not-lg:hidden'>{t('tabs.share')}</span>
                    </TabsTrigger>
                    {/* <TabsTrigger value={'settings'}>
                        <Settings2 />
                        <span className="not-lg:hidden">{t('tabs.settings')}</span>
                    </TabsTrigger> */}
                </TabsList>
            </ShadTabs>
            <div className='fixed top-13 right-8 -translate-y-1/2 transform'>
                <UserButton />
            </div>
        </div>
    )
}
