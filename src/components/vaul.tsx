import { Drawer as Vaul } from 'vaul'

const Drawer = ({ children, trigger }: { children: React.ReactNode; trigger: React.ReactNode }) => (
    <Vaul.Root>
        <Vaul.Trigger>{trigger}</Vaul.Trigger>
        <Vaul.Portal>
            <Vaul.Overlay className='fixed inset-0 bg-black/40' />
            <Vaul.Content className='fixed right-0 bottom-0 left-0 h-fit bg-gray-100 outline-none'>
                {children}
            </Vaul.Content>
        </Vaul.Portal>
    </Vaul.Root>
)

const DrawerTitle = ({ children }: { children: React.ReactNode }) => (
    <Vaul.Title>{children}</Vaul.Title>
)

Drawer.Title = DrawerTitle
export default Drawer
