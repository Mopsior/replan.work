import { Outlet } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { CreateEvent } from '../event/create'
import { DesktopDrawer } from './desktop-drawer'
import { Tabs } from './tabs'
import { SidebarWrapperPropsp } from './types'

export const SidebarWrapper = ({ title, description }: SidebarWrapperPropsp) => {
    const [isOpen, setIsOpen] = useState(false)
    const { t } = useTranslation()

    return (
        <>
            <div className='hidden xl:flex h-full w-full flex-col items-center gap-6 py-8 pr-8 relative'>
                <Tabs />
                <Outlet />
                <CreateEvent />
            </div>
            <div className='gap-x-2 not-md:hidden xl:hidden md:not-xl:fixed flex top-8 right-6 items-center'>
                <CreateEvent controlPositioning={false} />
                <Tooltip>
                    <TooltipTrigger
                        render={<Button variant={'ghost'} />}
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{t('openMenu')}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <DesktopDrawer
                title={title}
                description={description}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    )
}
