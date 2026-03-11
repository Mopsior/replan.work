import { Link, Outlet, useLocation } from '@tanstack/react-router'
import { Settings2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import Drawer from '../drawer'
import { Tabs } from './tabs'
import { DesktopDrawerProps } from './types'

export const DesktopDrawer = ({ title, description, isOpen, setIsOpen }: DesktopDrawerProps) => {
    const { t } = useTranslation()
    const location = useLocation()

    return (
        <Drawer.Side
            open={isOpen}
            onOpenChange={setIsOpen}
            bottomChildren={
                location.pathname !== '/app/settings' && (
                    <Link to='/app/settings'>
                        <Button className='w-full justify-start' variant='ghost'>
                            <Settings2 />
                            {t('tabs.settings')}
                        </Button>
                    </Link>
                )
            }
        >
            <Drawer.HiddenTitle>{title}</Drawer.HiddenTitle>
            <Drawer.HiddenDescription>{description}</Drawer.HiddenDescription>
            <Tabs />
            <Outlet />
        </Drawer.Side>
    )
}
