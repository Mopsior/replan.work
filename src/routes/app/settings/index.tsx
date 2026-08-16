import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import Drawer from '@/features/drawer'
import { AccountSettings } from '@/features/settings/account'
import { CalendarSettings } from '@/features/settings/calendar'
import { ThemeSettings } from '@/features/settings/theme'

export const Route = createFileRoute('/app/settings/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { t } = useTranslation()

    return (
        <>
            <Drawer.Header>
                <Drawer.Title>{t('tabs.settings.label')}</Drawer.Title>
            </Drawer.Header>
            <ThemeSettings />
            <AccountSettings />
            <CalendarSettings />
        </>
    )
}
