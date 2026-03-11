import { createFileRoute, useLocation } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import type { ReactNode } from 'react'
import { useState } from 'react'
import z from 'zod'
import { DrawerDataContext } from '@/contexts/drawer-title'
import { Calendar } from '@/features/calendar'
import { MobileDrawer } from '@/features/routing/mobile-drawer'
import { SidebarWrapper } from '@/features/routing/sidebar-wrapper'
import { RouteTabs, selectedRouteTab } from '@/features/routing/types'
import { authStateFn } from '@/functions/auth-state'

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
    const location = useLocation()
    const [drawerTitle, setDrawerTitle] = useState<ReactNode | null>(null)
    const [drawerDescription, setdrawerDescription] = useState<ReactNode | null>(null)
    const [isTitleVisible, setIsTitleVisible] = useState<boolean>(false)
    const [isDescriptionVisible, setIsDescriptionVisible] = useState<boolean>(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(
        selectedRouteTab[location.pathname] !== RouteTabs.MAIN,
    )

    return (
        <DrawerDataContext.Provider
            value={{
                title: drawerTitle,
                setTitle: setDrawerTitle,
                isTitleVisible: isTitleVisible,
                setIsTitleVisible: setIsTitleVisible,
                description: drawerDescription,
                setDescription: setdrawerDescription,
                isDescriptionVisible: isDescriptionVisible,
                setIsDescriptionVisible: setIsDescriptionVisible,
                isDrawerOpen: isDrawerOpen,
                setIsDrawerOpen: setIsDrawerOpen,
            }}
        >
            {/*
                BREAKPOINTS:
                *: bottom drawer
                md: side drawer
                xl: static sidebar 
            */}
            <div className='h-full w-full xl:grid xl:grid-cols-[auto_350px]'>
                <Calendar />
                <SidebarWrapper title={drawerTitle} description={drawerDescription} />
            </div>
            <MobileDrawer
                title={drawerTitle}
                description={drawerDescription}
                isTitleVisible={isTitleVisible}
                isDescriptionVisible={isDescriptionVisible}
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
            />
        </DrawerDataContext.Provider>
    )
}
