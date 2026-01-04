import { UserButton } from '@/components/clerk/user-button'
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
    const t = await getTranslations()

    return (
        <header className='flex h-16 items-center justify-end gap-4 p-4'>
            <SignedOut>
                <SignInButton />
                <SignUpButton>
                    <button className='h-10 cursor-pointer rounded-full bg-[#6c47ff] px-4 text-sm font-medium text-white sm:h-12 sm:px-5 sm:text-base'>
                        {t('signIn')}
                    </button>
                </SignUpButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </header>
    )
}
