import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import Drawer from '@/features/drawer'
import { Footer } from '@/features/footer'
import { Return } from '@/features/return'
import { AccountSettings } from '@/features/settings/account'
import { CalendarSettings } from '@/features/settings/calendar'
import { ThemeSettings } from '@/features/settings/theme'

export const Route = createFileRoute('/app/settings/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { t } = useTranslation()

    return (
        <Drawer.Container withViewTransition>
            <Drawer.Header>
                <Drawer.Title>{t('tabs.settings.label')}</Drawer.Title>
            </Drawer.Header>
            <div className='flex flex-col gap-y-4 w-full xl:mt-2'>
                <ThemeSettings />
                <AccountSettings />
                <CalendarSettings />
                <Footer visibleOnMobile withoutFixed withoutBackground className='py-0 md:hidden' />
            </div>
            <Drawer.Footer className='md:hidden'>
                <Return to='/app' viewTransition />
            </Drawer.Footer>
        </Drawer.Container>
    )
}
