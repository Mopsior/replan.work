import { Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import Drawer from '@/features/drawer'
import { Button } from '@/features/ui/button'
import { Footer } from '@/features/footer'
import { RouteTabs, selectedRouteTab } from '@/features/routing/types'
import { cn } from '@/lib/utils'
import { Return } from '@/features/return'
import { Tabs } from '@/features/routing/tabs'
import { useMediaQuery } from '@/utils/use-media-query'
import { IS_MOBILE } from '@/types/constants'

export const MobileDrawer = ({
    title,
}: {
    title: React.ReactNode | null
    setTitle: (title: React.ReactNode | null) => void
}) => {
    const { t } = useTranslation()
    const location = useLocation()
    const navigate = useNavigate()
    const isMobile = useMediaQuery(IS_MOBILE)
    const [isDrawerOpen, setIsDrawerOpen] = useState(
        selectedRouteTab[location.pathname] !== RouteTabs.MAIN,
    )

    if (!isMobile) return null
    return (
        <Drawer
            open={isDrawerOpen}
            onOpenChange={setIsDrawerOpen}
            trigger={
                <div className='fixed bottom-4 left-0 w-full px-4 md:hidden'>
                    <Button
                        className='w-full'
                        onClick={
                            selectedRouteTab[location.pathname] === RouteTabs.MAIN
                                ? () =>
                                      navigate({
                                          to: '/app/summary',
                                          search: (prev) => prev,
                                      })
                                : undefined
                        }
                    >
                        <Menu />
                        {t('menu')}
                    </Button>
                </div>
            }
        >
            <div className='flex w-full flex-col gap-y-4 px-4'>
                <Tabs />
                <div className='flex w-full items-center justify-between'>
                    {title && (
                        <Drawer.Title className='visible text-lg font-semibold tracking-tight md:hidden'>
                            {title}
                        </Drawer.Title>
                    )}
                    <Return
                        to='/app/summary'
                        className={cn([
                            'w-fit',
                            !selectedRouteTab[location.pathname] ? 'block' : 'hidden',
                        ])}
                    />
                </div>
            </div>
            <div className='flex flex-col gap-6 p-4'>
                <Outlet />
                <Footer withoutFixed visibleOnMobile withoutBackground className='mt-4' />
            </div>
        </Drawer>
    )
}
