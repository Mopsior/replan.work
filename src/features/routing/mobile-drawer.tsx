import { Outlet, useNavigate } from '@tanstack/react-router'
import { Calendar1, Menu } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { IS_MOBILE } from '@/types/constants'
import { useMediaQuery } from '@/utils/use-media-query'
import Drawer from '../drawer'
import { CreateEvent } from '../event/create'

export const MobileDrawer = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const isMobile = useMediaQuery(IS_MOBILE)

    if (!isMobile) return null
    return (
        <div className='fixed bottom-4 left-0 w-full px-4 md:hidden grid grid-cols-[36px_auto_36px] gap-x-2'>
            <Button
                className='w-full'
                variant='secondary'
                onClick={() => {
                    const today = new Date()
                    navigate({
                        to: '.',
                        search: (prev) => ({
                            ...prev,
                            month: today.getMonth() + 1,
                            year: today.getFullYear(),
                        }),
                    })
                }}
            >
                <Calendar1 />
            </Button>
            <Drawer>
                <Drawer.Trigger render={<Button className='w-full' />}>
                    <Menu />
                    {t('menu')}
                </Drawer.Trigger>
                <Drawer.Content className='mobile-drawer-size-view-transition'>
                    <Drawer.Container className='mobile-drawer-view-transition'>
                        <Outlet />
                    </Drawer.Container>
                </Drawer.Content>
            </Drawer>
            <CreateEvent />
        </div>
    )
}
