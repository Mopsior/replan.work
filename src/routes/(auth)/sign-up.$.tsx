import { SignUp } from '@clerk/tanstack-react-start'
import { createFileRoute } from '@tanstack/react-router'
import { Wrapper } from '@/features/clerk/wrapper'

export const Route = createFileRoute('/(auth)/sign-up/$')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Wrapper>
            <SignUp />
        </Wrapper>
    )
}
