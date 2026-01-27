import { SignIn } from '@clerk/tanstack-react-start'
import { createFileRoute } from '@tanstack/react-router'
import { Wrapper } from '@/features/clerk/wrapper'

export const Route = createFileRoute('/(auth)/sign-in/$')({
    component: SignInPage,
})

function SignInPage() {
    return (
        <Wrapper>
            <SignIn fallbackRedirectUrl='/app' />
        </Wrapper>
    )
}
