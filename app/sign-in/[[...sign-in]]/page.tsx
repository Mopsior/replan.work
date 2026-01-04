import { ClerkWrapper } from '@/components/clerk/wrapper'
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
    return (
        <ClerkWrapper>
            <SignIn />
        </ClerkWrapper>
    )
}