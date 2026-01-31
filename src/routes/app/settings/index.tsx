import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { CalendarSettings } from '@/features/settings/calendar'
import { useDrawerTitle } from '@/hooks/use-drawer-title'
import { ThemeSettings } from '@/features/settings/theme'

export const Route = createFileRoute('/app/settings/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { t } = useTranslation()

    useDrawerTitle(t('settings.title'))

    return (
        <>
            <ThemeSettings />
            <CalendarSettings />
        </>
    )
}
