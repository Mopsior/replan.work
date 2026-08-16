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
type AdaptiveDrawerProps = ComponentProps<typeof DrawerPrimitive> & {
    withViewTransition?: boolean
}
type DrawerTriggerProps = ComponentProps<typeof DrawerPrimitiveTrigger>
type DrawerContainerProps = ComponentProps<'div'> & {
    withViewTransition?: boolean
    visibleOnDesktop?: boolean
}
type DrawerHeaderProps = Omit<ComponentProps<typeof DrawerPrimitiveHeader>, 'children'> & {
    children?: ReactNode
}
type DrawerFooterProps = Omit<ComponentProps<typeof DrawerPrimitiveFooter>, 'className'> & {
    className?: string
}
type DrawerContentProps = Omit<ComponentProps<typeof DrawerPrimitiveContent>, 'className'> & {
    className?: string
}

const Drawer = (props: DrawerProps) => <DrawerPrimitive showSwipeHandle {...props} />

const AdaptiveDrawer = (props: AdaptiveDrawerProps) => {
    const isMobile = useMediaQuery(IS_MOBILE)

    return (
        <DrawerPrimitive
            showSwipeHandle={isMobile}
            swipeDirection={isMobile ? 'down' : 'right'}
            {...props}
        />
    )
}

const Trigger = (props: DrawerTriggerProps) => (
    <DrawerPrimitiveTrigger render={props.render ?? <Button />} {...props} />
)

const Content = ({ className, ...props }: DrawerContentProps) => (
    <DrawerPrimitiveContent
        className={cn('md:[--drawer-inset:--spacing(3)]', className)}
        {...props}
    />
)

const Container = ({
    className,
    withViewTransition,
    visibleOnDesktop,
    ...props
}: DrawerContainerProps) => {
    const isMobile = useMediaQuery(IS_MOBILE)
    if (!isMobile && !visibleOnDesktop) return props.children

    return (
        <div
            className={cn(
                'px-6 pt-4 pb-safe-viewport flex flex-col gap-y-2 group-data-[swipe-direction=right]/drawer-popup:pt-6 group-data-[swipe-direction=right]/drawer-popup:h-full',
                withViewTransition && 'mobile-drawer-view-transition',
                className,
            )}
            {...props}
        />
    )
}

const Footer = ({ className, ...props }: DrawerFooterProps) => (
    <DrawerPrimitiveFooter className={cn('md:hidden', className)} {...props} />
)

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
                className={cn([
                    'text-xs group-data-[swipe-direction=right]/drawer-popup:text-sm text-muted-foreground text-center pt-2 group-data-[swipe-direction=right]/drawer-popup:text-start group-data-[swipe-direction=right]/drawer-popup:pt-0',
                    className,
                ])}
                children={children}
            />
        )

    return <DrawerPrimitiveDescription className={className} children={children} />
}

Drawer.Adaptive = AdaptiveDrawer
Drawer.Trigger = Trigger
Drawer.Content = Content
Drawer.Container = Container
Drawer.Footer = Footer
Drawer.Header = Header
Drawer.Title = Title
Drawer.Description = Description
export default Drawer
