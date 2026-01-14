import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import Drawer from '@/components/drawer'
import { useMediaQuery } from '@/utils/use-media-query'
import { IS_MOBILE } from '@/types/constants'

export const Route = createFileRoute('/app/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { t } = useTranslation()
    const isMobile = useMediaQuery(IS_MOBILE)
    const { navigate } = useRouter()

    useEffect(() => {
        if (isMobile) {
            navigate({ to: '/app/summary' })
        }
    }, [isMobile, navigate])

    return (
        <>
            <Drawer.Title>{t('summaryDrawer')}</Drawer.Title>
            <div className='p-4'>{t('summaryDrawerContent')}</div>
        </>
    )
}
