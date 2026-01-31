import { Drawer as Vaul } from 'vaul'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DrawerProps {
    children: ReactNode
    trigger: ReactNode
}

const Drawer = ({
    children,
    trigger,
    ...props
}: DrawerProps & ComponentProps<typeof Vaul.Root>) => (
    <Vaul.Root {...props}>
        <Vaul.Trigger asChild>{trigger}</Vaul.Trigger>
        <Vaul.Portal>
            <Vaul.Overlay className='fixed inset-0 bg-black/40' />
            <Vaul.Content
                className={cn([
                    'fixed right-0 bottom-0 left-0 flex h-fit flex-col rounded-t-[10px] outline-none',
                    'light:bg-gray-100',
                    'dark:bg-card',
                ])}
            >
                <div aria-hidden className='mx-auto my-4 h-1.5 w-12 rounded-full bg-gray-300' />
                {children}
            </Vaul.Content>
        </Vaul.Portal>
    </Vaul.Root>
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

Drawer.Title = DrawerTitle
export default Drawer
