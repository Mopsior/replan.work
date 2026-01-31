import { Outlet, createFileRoute } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import z from 'zod'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { authStateFn } from '@/functions/auth-state'
import { Calendar } from '@/features/calendar'
import { SidebarWrapper } from '@/features/routing/sidebar-wrapper'
import { DrawerTitleContext } from '@/contexts/drawer-title'
import { MobileDrawer } from '@/features/routing/drawer'

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
    const [drawerTitle, setDrawerTitle] = useState<ReactNode | null>(null)

    return (
        <DrawerTitleContext.Provider value={{ title: drawerTitle, setTitle: setDrawerTitle }}>
            <div className='h-full w-full md:grid md:grid-cols-[auto_450px]'>
                <Calendar />
                <SidebarWrapper>
                    <Outlet />
                </SidebarWrapper>
            </div>
            <MobileDrawer title={drawerTitle} setTitle={setDrawerTitle} />
        </DrawerTitleContext.Provider>
    )
}
