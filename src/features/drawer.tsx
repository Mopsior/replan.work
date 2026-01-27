import { Drawer as Vaul } from 'vaul'
import { cn } from '@/lib/utils'

interface DrawerProps {
    children: React.ReactNode
    trigger: React.ReactNode
}

const Drawer = ({ children, trigger }: DrawerProps) => (
    <Vaul.Root>
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
                <div className='p-4'>
                    <div aria-hidden className='mx-auto mb-8 h-1.5 w-12 rounded-full bg-gray-300' />
                    {children}
                </div>
            </Vaul.Content>
        </Vaul.Portal>
    </Vaul.Root>
)

const DrawerTitle = ({ children }: { children: React.ReactNode }) => (
    <Vaul.Title>{children}</Vaul.Title>
)

Drawer.Title = DrawerTitle
export default Drawer
