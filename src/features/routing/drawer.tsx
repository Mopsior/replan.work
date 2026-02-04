import { Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Drawer from '@/features/drawer'
import { Footer } from '@/features/footer'
import { Return } from '@/features/return'
import { Tabs } from '@/features/routing/tabs'
import { RouteTabs, selectedRouteTab } from '@/features/routing/types'
import { Button } from '@/features/ui/button'
import { IS_MOBILE } from '@/types/constants'
import { useMediaQuery } from '@/utils/use-media-query'

export const MobileDrawer = ({
    title,
    isTitleVisible,
    description,
    isDescriptionVisible,
}: {
    title: ReactNode | null
    isTitleVisible: boolean
    description: ReactNode | null
    isDescriptionVisible: boolean
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
                {(isTitleVisible || !selectedRouteTab[location.pathname]) && (
                    <div className='flex w-full items-center justify-between'>
                        {isTitleVisible ? (
                            <Drawer.Title>{title}</Drawer.Title>
                        ) : (
                            <Drawer.HiddenTitle>{title}</Drawer.HiddenTitle>
                        )}
                        {!selectedRouteTab[location.pathname] && (
                            <Return to='/app/summary' className={'w-fit'} />
                        )}
                    </div>
                )}
                {isDescriptionVisible ? (
                    <Drawer.Description>{description}</Drawer.Description>
                ) : (
                    <Drawer.HiddenDescription>{description}</Drawer.HiddenDescription>
                )}
            </div>
            <div className='flex flex-col gap-6 p-4'>
                <Outlet />
                <Footer withoutFixed visibleOnMobile withoutBackground className='mt-4' />
            </div>
        </Drawer>
    )
}
