import type { ComponentProps, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {
    Drawer as DrawerPrimitive,
    DrawerContent as DrawerPrimitiveContent,
    DrawerDescription as DrawerPrimitiveDescription,
    DrawerFooter as DrawerPrimitiveFooter,
    DrawerHeader as DrawerPrimitiveHeader,
    DrawerTitle as DrawerPrimitiveTitle,
    DrawerTrigger as DrawerPrimitiveTrigger,
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { IS_MOBILE } from '@/types/constants'
import { useMediaQuery } from '@/utils/use-media-query'

type DrawerProps = ComponentProps<typeof DrawerPrimitive>
type DrawerTriggerProps = ComponentProps<typeof DrawerPrimitiveTrigger>
type DrawerContainerProps = ComponentProps<'div'>
type DrawerHeaderProps = Omit<ComponentProps<typeof DrawerPrimitiveHeader>, 'children'> & {
    children?: ReactNode
}

const Drawer = (props: DrawerProps) => <DrawerPrimitive showSwipeHandle {...props} />

const Trigger = (props: DrawerTriggerProps) => (
    <DrawerPrimitiveTrigger render={props.render ?? <Button />} {...props} />
)

const Content = DrawerPrimitiveContent

const Container = ({ className, ...props }: DrawerContainerProps) => (
    <div className={cn(['px-6 pt-4 pb-safe-viewport', className])} {...props} />
)

const Footer = DrawerPrimitiveFooter

const Header = ({ children, ...props }: DrawerHeaderProps) => {
    const isMobile = useMediaQuery(IS_MOBILE)
    if (!isMobile) return children

    return <DrawerPrimitiveHeader {...props}>{children}</DrawerPrimitiveHeader>
}

const Title = ({
    children,
    visibleOnDesktop,
    className,
}: {
    children: React.ReactNode
    visibleOnDesktop?: boolean
    className?: string
}) => {
    const isMobile = useMediaQuery(IS_MOBILE)
    if (!isMobile && !visibleOnDesktop) return null

    return <DrawerPrimitiveTitle className={className}>{children}</DrawerPrimitiveTitle>
}

const Description = ({
    children,
    className,
}: {
    children?: React.ReactNode
    className?: string
}) => {
    const isMobile = useMediaQuery(IS_MOBILE)

    if (!isMobile)
        return (
            <p
                className={cn(['text-xs text-muted-foreground text-center py-2', className])}
                children={children}
            />
        )

    return <DrawerPrimitiveDescription className={className} children={children} />
}

Drawer.Trigger = Trigger
Drawer.Content = Content
Drawer.Container = Container
Drawer.Footer = Footer
Drawer.Header = Header
Drawer.Title = Title
Drawer.Description = Description
export default Drawer
