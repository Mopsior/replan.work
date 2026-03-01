import type { ReactNode } from 'react'
import { CreateEvent } from '../event/create'
import { Tabs } from './tabs'

export const SidebarWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex h-full w-full flex-col items-center gap-6 py-8 pr-8 not-md:hidden relative'>
            <Tabs />
            {children}
            <CreateEvent />
        </div>
    )
}
