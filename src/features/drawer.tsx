import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { X } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import { Drawer as Vaul } from 'vaul'
import { cn } from '@/lib/utils'
import { IS_MOBILE } from '@/types/constants'
import { useMediaQuery } from '@/utils/use-media-query'
import { Button } from './ui/button'

interface DrawerProps {
    children: ReactNode
    trigger?: ReactNode
}

const Drawer = ({
    children,
    trigger,
    isSideDrawer,
    ...props
}: DrawerProps & ComponentProps<typeof Vaul.Root> & { isSideDrawer?: boolean }) => (
    <Vaul.Root {...props}>
        <DrawerContent trigger={trigger} isSideDrawer={isSideDrawer}>
            {children}
        </DrawerContent>
    </Vaul.Root>
)

const NestedDrawer = ({
    children,
    trigger,
    ...props
}: DrawerProps & ComponentProps<typeof Vaul.NestedRoot>) => (
    <Vaul.NestedRoot {...props}>
        <DrawerContent trigger={trigger}>{children}</DrawerContent>
    </Vaul.NestedRoot>
)

const DrawerContent = ({
    children,
    trigger,
    isSideDrawer,
}: DrawerProps & { isSideDrawer?: boolean }) => (
    <>
        <Vaul.Trigger asChild>{trigger}</Vaul.Trigger>
        <Vaul.Portal>
            <Vaul.Overlay className='fixed inset-0 bg-black/40' />
            <Vaul.Content
                className={cn([
                    'fixed flex flex-col outline-none',
                    isSideDrawer
                        ? 'top-4 right-4 bottom-4 w-112.5'
                        : 'bg-card right-0 bottom-0 left-0 h-fit rounded-t-[10px]',
                ])}
                style={
                    isSideDrawer
                        ? ({ '--initial-transform': 'calc(100% + 16px)' } as React.CSSProperties)
                        : undefined
                }
            >
                {!isSideDrawer && (
                    <div aria-hidden className='mx-auto my-4 h-1.5 w-12 rounded-full bg-gray-300' />
                )}
                {children}
            </Vaul.Content>
        </Vaul.Portal>
    </>
)

const DrawerTitle = ({
    children,
    ...props
}: { children: ReactNode } & ComponentProps<typeof Vaul.Title>) => (
    <Vaul.Title
        {...props}
        className={cn(['text-lg font-semibold tracking-tight', props.className])}
    >
        {children}
    </Vaul.Title>
)

const DrawerHiddenTitle = ({ children }: { children: ReactNode }) => (
    <VisuallyHidden>
        <Vaul.Title>{children}</Vaul.Title>
    </VisuallyHidden>
)

const DrawerDescription = ({
    children,
    ...props
}: { children: ReactNode } & ComponentProps<typeof Vaul.Description>) => (
    <Vaul.Description
        {...props}
        className={cn(['text-muted-foreground text-sm md:text-center', props.className])}
    >
        {children}
    </Vaul.Description>
)

const DrawerHiddenDescription = ({ children }: { children: ReactNode }) => (
    <VisuallyHidden>
        <Vaul.Description>{children}</Vaul.Description>
    </VisuallyHidden>
)

const DynamicNestedDrawer = ({
    children,
    trigger,
    ...props
}: DrawerProps & (ComponentProps<typeof Vaul.Root> | ComponentProps<typeof Vaul.NestedRoot>)) => {
    const isMobile = useMediaQuery(IS_MOBILE)
    if (isMobile) {
        return (
            <NestedDrawer {...props} trigger={trigger}>
                {children}
            </NestedDrawer>
        )
    }
    return (
        <Drawer isSideDrawer direction='right' trigger={trigger} {...props}>
            <div className='bg-card relative h-full w-full rounded-md p-5'>
                {children}
                <Vaul.Close asChild>
                    <Button variant='ghost' className='absolute top-4 right-4'>
                        <X className='text-muted-foreground hover:text-foreground transition-colors' />
                    </Button>
                </Vaul.Close>
            </div>
        </Drawer>
    )
}

Drawer.Title = DrawerTitle
Drawer.HiddenTitle = DrawerHiddenTitle
Drawer.Description = DrawerDescription
Drawer.HiddenDescription = DrawerHiddenDescription
Drawer.Nested = NestedDrawer
Drawer.Dynamic = DynamicNestedDrawer
export default Drawer
