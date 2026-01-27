import { Waitlist } from '@clerk/tanstack-react-start'
import { createFileRoute } from '@tanstack/react-router'
import { Wrapper } from '@/features/clerk/wrapper'

export const Route = createFileRoute('/(auth)/waitlist')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Wrapper>
            <Waitlist />
        </Wrapper>
    )
}
