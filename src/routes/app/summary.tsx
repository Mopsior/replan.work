import { createFileRoute } from '@tanstack/react-router'
import Drawer from '@/components/vaul'

export const Route = createFileRoute('/app/summary')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <Drawer.Title>Summary Drawer</Drawer.Title>
            <div className='p-4'>This is the summary drawer content.</div>
        </>
    )
}
