import { Outlet, createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Menu } from 'lucide-react'
import { zodValidator } from '@tanstack/zod-adapter'
import z from 'zod'
import Drawer from '@/features/drawer'
import { authStateFn } from '@/functions/auth-state'
import { Button } from '@/features/ui/button'
import { Footer } from '@/features/footer'
import { Calendar } from '@/features/calendar'

const searchParams = z.object({
    month: z.number().default(new Date().getMonth() + 1),
    year: z.number().default(new Date().getFullYear()),
})

export const Route = createFileRoute('/app')({
    component: RouteComponent,
    beforeLoad: async () => await authStateFn(),
    validateSearch: zodValidator(searchParams),
})

function RouteComponent() {
    const { t } = useTranslation()

    return (
        <>
            <div className='h-full w-full md:grid md:grid-cols-[70%_30%]'>
                <Calendar />
                <div className='pt-20 pr-6 pb-16'>
                    <div className='bg-secondary h-full w-full rounded-md shadow'>
                        <Outlet />
                    </div>
                </div>
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
