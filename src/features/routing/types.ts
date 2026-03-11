import { ReactNode } from 'react'
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
}

export interface SidebarWrapperPropsp {
    title: ReactNode
    description: ReactNode
}
