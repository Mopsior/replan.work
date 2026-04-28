import { Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { Calendar1, Menu } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import Drawer from '@/features/drawer'
import { Footer } from '@/features/footer'
import { Return } from '@/features/return'
import { Tabs } from '@/features/routing/tabs'
import { MobileDrawerProps, RouteTabs, selectedRouteTab } from '@/features/routing/types'
import { IS_MOBILE } from '@/types/constants'
import { useMediaQuery } from '@/utils/use-media-query'
import { CreateEvent } from '../event/create'

export const MobileDrawer = ({
    title,
    isTitleVisible,
    description,
    isDescriptionVisible,
    isDrawerOpen,
    setIsDrawerOpen,
}: MobileDrawerProps) => {
    const { t } = useTranslation()
    const location = useLocation()
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
            <Drawer
                open={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
                trigger={
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
                        <Drawer.Description className='text-center'>
                            {description}
                        </Drawer.Description>
                    ) : (
                        <Drawer.HiddenDescription>{description}</Drawer.HiddenDescription>
                    )}
                </div>
                <div className='flex flex-col gap-6 p-4'>
                    <Outlet />
                    <Footer withoutFixed visibleOnMobile withoutBackground />
                </div>
            </Drawer>
            <CreateEvent />
        </div>
    )
}
