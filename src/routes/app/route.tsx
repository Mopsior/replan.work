import { Outlet, createFileRoute } from '@tanstack/react-router'
import Drawer from '@/components/vaul'

export const Route = createFileRoute('/app')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>
            Hello "/app"!
            <Drawer trigger={<>Open Drawer</>}>
                <Outlet />
            </Drawer>
        </div>
    )
}
