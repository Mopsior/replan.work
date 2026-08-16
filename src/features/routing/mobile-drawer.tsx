import { Outlet, useNavigate } from '@tanstack/react-router'
import { Calendar1, Menu } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { IS_MOBILE } from '@/types/constants'
import { useMediaQuery } from '@/utils/use-media-query'
import Drawer from '../drawer'
import { CreateEvent } from '../event/create'
import { MobileDrawerProps } from './types'

export const MobileDrawer = ({ onTodayClick }: MobileDrawerProps) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const isMobile = useMediaQuery(IS_MOBILE)

    if (!isMobile) return null
    return (
        <div className='fixed bottom-safe-viewport left-0 w-full px-4 md:hidden grid grid-cols-[36px_auto_36px] gap-x-2'>
            <Button
                className='w-full'
                variant='secondary'
                onClick={async () => {
                    const today = new Date()
                    await navigate({
                        to: '.',
                        search: (prev) => ({
                            ...prev,
                            month: today.getMonth() + 1,
                            year: today.getFullYear(),
                        }),
                    })
                    onTodayClick()
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
                    <Outlet />
                </Drawer.Content>
            </Drawer>
            <CreateEvent />
        </div>
    )
}
