import { useContext, useEffect } from 'react'
import type { ReactNode} from 'react';
import { DrawerTitleContext } from '@/contexts/drawer-title'

export const useDrawerTitle = (title: ReactNode) => {
    const { setTitle } = useContext(DrawerTitleContext)

    useEffect(() => {
        setTitle(title)
        return () => {
            setTitle(null)
        }
    }, [title, setTitle])
}
