import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import Drawer from '@/components/drawer'

export const Route = createFileRoute('/app/summary/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { t } = useTranslation()

    return (
        <>
            <Drawer.Title>{t('summaryDrawer')}</Drawer.Title>
            <div className='p-4'>{t('summaryDrawerContent')}</div>
        </>
    )
}
