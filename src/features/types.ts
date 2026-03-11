import { ComponentProps, ReactNode } from 'react'
import { Drawer as Vaul } from 'vaul'

export interface DrawerProps {
    children: ReactNode
    trigger?: ReactNode
    bottomChildren?: ReactNode
}

interface SideDrawer {
    isSideDrawer?: boolean
}

export type MainDrawerProps = DrawerProps & ComponentProps<typeof Vaul.Root> & SideDrawer

export type NestedDrawerProps = DrawerProps & ComponentProps<typeof Vaul.NestedRoot>

export type DrawerContentProps = DrawerProps & SideDrawer

export type DrawerTitleProps = ComponentProps<typeof Vaul.Title> & {
    withCenter?: boolean
}

export type DrawerDescriptionProps = ComponentProps<typeof Vaul.Description> & {
    centerOnMobile?: boolean
}

export interface DrawerWrapperProps {
    children: ReactNode
    bottomChildren?: DrawerProps['bottomChildren']
}

export type DynamicNestedDrawerProps = DrawerProps &
    (ComponentProps<typeof Vaul.Root> | ComponentProps<typeof Vaul.NestedRoot>)

export type SideDrawerProps = NestedDrawerProps & {
    withClose?: boolean
}
