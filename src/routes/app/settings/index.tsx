import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { AccountSettings } from '@/features/settings/account'
import { CalendarSettings } from '@/features/settings/calendar'
import { ThemeSettings } from '@/features/settings/theme'
import { useDrawerData } from '@/hooks/use-drawer-data'

export const Route = createFileRoute('/app/settings/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { t } = useTranslation()

    useDrawerData({
        title: t('settings.title'),
        isTitleVisible: true,
        description: t('settings.ariaDescription'),
        isDescriptionVisible: false,
    })

    return (
        <>
            <ThemeSettings />
            <AccountSettings />
            <CalendarSettings />
        </>
    )
}
