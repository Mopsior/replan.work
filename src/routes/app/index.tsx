import { createFileRoute } from '@tanstack/react-router'
import Drawer from '@/components/vaul'

export const Route = createFileRoute('/app/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <Drawer.Title>Main Drawer</Drawer.Title>
            <div className='p-4'>This is the summary drawer content.</div>
        </>
    )
}
