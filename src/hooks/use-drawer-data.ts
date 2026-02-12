import type { ReactNode } from 'react'
import { useContext, useEffect } from 'react'
import { DrawerDataContext } from '@/contexts/drawer-title'

export const useDrawerData = ({
    title,
    isTitleVisible,
    description,
    isDescriptionVisible,
}: {
    title: ReactNode
    isTitleVisible?: boolean
    description: ReactNode
    isDescriptionVisible?: boolean
}) => {
    const { setTitle, setDescription, setIsTitleVisible, setIsDescriptionVisible } =
        useContext(DrawerDataContext)

    useEffect(() => {
        setTitle(title)
        setDescription(description)
        setIsTitleVisible(isTitleVisible ?? false)
        setIsDescriptionVisible(isDescriptionVisible ?? false)

        return () => {
            setTitle(null)
            setDescription(null)
            setIsTitleVisible(false)
            setIsDescriptionVisible(false)
        }
    }, [
        title,
        description,
        isTitleVisible,
        isDescriptionVisible,
        setTitle,
        setDescription,
        setIsTitleVisible,
        setIsDescriptionVisible,
    ])
}

export const useDrawerControl = () => {
    const { isDrawerOpen, setIsDrawerOpen } = useContext(DrawerDataContext)

    return {
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
    }
}
