import { Tabs } from './tabs'
import type { ReactNode } from 'react'

export const SidebarWrapper = ({ children }: { children: ReactNode }) => {
    return (
        // <div className='pt-20 pr-6 pb-16'>
        //     <div className='bg-secondary h-full w-full rounded-md shadow'>
        //         {children}
        //     </div>
        // </div>
        <div className='flex h-full w-full flex-col items-center py-8 pr-8'>
            <Tabs />
            {children}
        </div>
    )
}
