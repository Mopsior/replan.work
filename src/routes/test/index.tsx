import { useAuth } from '@clerk/tanstack-react-start'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { Event } from '@/features/calendar/event'
import { useEvents } from '@/hooks/use-events'
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
    const { userId } = useAuth()
    const { data, isLoading, isError, error } = useEvents(
        userId!,
        new Date().getMonth() + 1,
        new Date().getFullYear(),
    )

    console.log(data, isLoading, isError, error)

    return (
        <div className='flex h-dvh w-full items-center justify-center p-4'>
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
        </div>
    )
}
