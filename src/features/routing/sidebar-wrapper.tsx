import { Tabs } from './tabs'
import type { ReactNode } from 'react'

export const SidebarWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex h-full w-full flex-col items-center gap-6 py-8 pr-8 not-md:hidden'>
            <Tabs />
            {children}
        </div>
    )
}
