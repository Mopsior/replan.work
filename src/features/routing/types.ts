import { Dispatch, ReactNode, SetStateAction } from 'react'
import type { FileRouteTypes } from '@/routeTree.gen'

export enum RouteTabs {
    MAIN = 'main',
    SUMMARY = 'summary',
    SHARE = 'share',
}

export const selectedRouteTab: Partial<Record<FileRouteTypes['to'] | string, RouteTabs>> = {
    '/app': RouteTabs.MAIN,
    '/app/summary': RouteTabs.SUMMARY,
    '/app/share': RouteTabs.SHARE,
}

export interface DesktopDrawerProps {
    title: ReactNode
    description: ReactNode
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    isDescriptionVisible?: boolean
}

export interface SidebarWrapperPropsp {
    title: ReactNode
    description: ReactNode
    isDescriptionVisible: boolean
}

export interface MobileDrawerProps {
    title: ReactNode | null
    isTitleVisible: boolean
    description: ReactNode | null
    isDescriptionVisible: boolean
    isDrawerOpen: boolean
    setIsDrawerOpen: Dispatch<SetStateAction<boolean>>
}
