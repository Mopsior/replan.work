import { Outlet, createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Menu } from 'lucide-react'
import Drawer from '@/components/drawer'
import { authStateFn } from '@/functions/auth-state'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/footer'

export const Route = createFileRoute('/app')({
    component: RouteComponent,
    beforeLoad: async () => await authStateFn(),
    loader: async ({ context }) => {
        return { userId: context.userId }
    },
})

function RouteComponent() {
    const state = Route.useLoaderData()
    const { t } = useTranslation()

    return (
        <>
            <div>
                {t('hello')} {state.userId}!
            </div>
            <Drawer
                trigger={
                    <div className='fixed bottom-4 left-0 w-full px-4 md:hidden'>
                        <Button suppressHydrationWarning className='w-full'>
                            <Menu />
                            {t('menu')}
                        </Button>
                    </div>
                }
            >
                <Outlet />
                <Footer withoutFixed visibleOnMobile />
            </Drawer>
        </>
    )
}
