import { ClerkWrapper } from '@/components/clerk/wrapper'
import { Waitlist } from '@clerk/nextjs'

export default function WaitlistPage() {
    return (
        <ClerkWrapper>
            <Waitlist />
        </ClerkWrapper>
    )
}