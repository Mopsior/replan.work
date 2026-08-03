import { createFileRoute, notFound } from '@tanstack/react-router'
import Drawer from '@/features/drawer'
import { Event } from '@/features/event/event'
import { EventType } from '@/types/enums'

export const Route = createFileRoute('/test/')({
    component: RouteComponent,
    beforeLoad: async () => {
        if (process.env.NODE_ENV !== 'development') {
            throw notFound()
        }
    },
})

function RouteComponent() {
    return (
        <div className='flex h-dvh w-full items-center justify-center p-4 gap-4 flex-col md:flex-row'>
            <div className='grid grid-cols-2 gap-x-4 gap-y-4'>
                <Event title='Teatr' time='10:00-11:00' eventType={EventType.STATIONARY} />
                <Event title='Teatr' time='10:00-11:00' eventType={EventType.REMOTE} />
                <Event title='Teatr' time='10:00-11:00' eventType={EventType.HYBRID} />
                <Event title='Teatr' time='10:00-11:00' eventType={EventType.CUSTOM} />
                <Event
                    title='Teatr'
                    time='10:00-11:00'
                    eventType={EventType.STATIONARY}
                    isOneLiner
                />
            </div>
            <Drawer>
                <Drawer.Trigger>Open Drawer</Drawer.Trigger>
                <Drawer.Content>
                    <Drawer.Container>
                        <div>asdhajjdas</div>
                        <Drawer>
                            <Drawer.Trigger>Open Drawer</Drawer.Trigger>
                            <Drawer.Content>
                                <Drawer.Container>
                                    <div>asdhajjdas</div>
                                </Drawer.Container>
                            </Drawer.Content>
                        </Drawer>
                    </Drawer.Container>
                </Drawer.Content>
                {/* <DrawerContent>
                    <DrawerHeader>Header</DrawerHeader>
                    <DrawerDescription>Description</DrawerDescription>
                    <div>asdasdsad</div>
                </DrawerContent> */}
            </Drawer>
        </div>
    )
}
