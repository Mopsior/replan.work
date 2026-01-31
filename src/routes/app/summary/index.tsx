import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useDrawerTitle } from '@/hooks/use-drawer-title'

export const Route = createFileRoute('/app/summary/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { t } = useTranslation()

    useDrawerTitle(t('summaryDrawer'))

    return t('summaryDrawerContent')
}
