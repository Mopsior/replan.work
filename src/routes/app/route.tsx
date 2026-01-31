import { Outlet, createFileRoute, useLocation, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Menu } from 'lucide-react'
import { zodValidator } from '@tanstack/zod-adapter'
import z from 'zod'
import { useState } from 'react'
import type { ReactNode} from 'react';
import Drawer from '@/features/drawer'
import { authStateFn } from '@/functions/auth-state'
import { Button } from '@/features/ui/button'
import { Footer } from '@/features/footer'
import { Calendar } from '@/features/calendar'
import { SidebarWrapper } from '@/features/routing/sidebar-wrapper'
import { DrawerTitleContext } from '@/contexts/drawer-title'
import { RouteTabs, selectedRouteTab } from '@/features/routing/types'
import { cn } from '@/lib/utils'
import { Return } from '@/features/return'
import { Tabs } from '@/features/routing/tabs'

const searchParams = z.object({
    month: z.number().default(new Date().getMonth() + 1),
    year: z.number().default(new Date().getFullYear()),
})

export const Route = createFileRoute('/app')({
    component: RouteComponent,
    beforeLoad: async () => await authStateFn(),
    loader: async ({ context }) => {
        return { userId: context.userId }
    },
    validateSearch: zodValidator(searchParams),
})

function RouteComponent() {
    const { t } = useTranslation()
    const location = useLocation()
    const [drawerTitle, setDrawerTitle] = useState<ReactNode | null>(null)
    const navigate = useNavigate()

    return (
        <DrawerTitleContext.Provider value={{ title: drawerTitle, setTitle: setDrawerTitle }}>
            <div className='h-full w-full md:grid md:grid-cols-[auto_450px]'>
                <Calendar />
                <SidebarWrapper>
                    <Outlet />
                </SidebarWrapper>
            </div>
            <Drawer
                defaultOpen={selectedRouteTab[location.pathname] !== RouteTabs.MAIN}
                trigger={
                    <div className='fixed bottom-4 left-0 w-full px-4 md:hidden'>
                        <Button
                            className='w-full'
                            onClick={
                                selectedRouteTab[location.pathname] === RouteTabs.MAIN
                                    ? () => navigate({ to: '/app/summary', search: (prev) => prev })
                                    : undefined
                            }
                        >
                            <Menu />
                            {t('menu')}
                        </Button>
                    </div>
                }
            >
                <div className='flex w-full flex-col gap-y-4 px-4'>
                    <Tabs />
                    <div className='flex w-full items-center justify-between'>
                        {drawerTitle && (
                            <Drawer.Title className='visible text-lg font-semibold tracking-tight md:hidden'>
                                {drawerTitle}
                            </Drawer.Title>
                        )}
                        <Return
                            to='/app/summary'
                            className={cn([
                                'w-fit',
                                !selectedRouteTab[location.pathname] ? 'block' : 'hidden',
                            ])}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-6 p-4'>
                    <Outlet />
                    <Footer withoutFixed visibleOnMobile withoutBackground className='mt-4' />
                </div>
            </Drawer>
        </DrawerTitleContext.Provider>
    )
}
