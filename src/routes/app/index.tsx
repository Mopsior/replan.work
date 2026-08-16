import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ChartNoAxesColumn, Settings2, Share2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Drawer from '@/features/drawer'
import { NavigationItem } from '@/features/routing/navigation-item'
import { IS_DESKTOP } from '@/types/constants'
import { useMediaQuery } from '@/utils/use-media-query'

export const Route = createFileRoute('/app/')({
    component: RouteComponent,
})

function RouteComponent() {
    const isDesktop = useMediaQuery(IS_DESKTOP)
    const navigate = useNavigate()
    const { t } = useTranslation()

    if (isDesktop)
        return navigate({
            to: '/app/summary',
            search: (prev) => prev,
        })

    return (
        <Drawer.Container
            withViewTransition
            className='md:hidden flex flex-col gap-y-4 justify-center items-center'
        >
            <NavigationItem
                to='/app/summary'
                Icon={<ChartNoAxesColumn />}
                title={t('tabs.summary.label')}
                description={t('tabs.summary.description')}
            />
            <NavigationItem
                to='/app/share'
                Icon={<Share2 />}
                title={t('tabs.share.label')}
                description={t('tabs.share.description')}
            />
            <NavigationItem
                to='/app/settings'
                Icon={<Settings2 />}
                title={t('tabs.settings.label')}
                description={t('tabs.settings.description')}
            />
        </Drawer.Container>
    )
}
