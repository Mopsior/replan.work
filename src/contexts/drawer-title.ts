import type { ReactNode } from 'react'
import { createContext } from 'react'

export const DrawerDataContext = createContext<{
    title: ReactNode | null
    setTitle: (title: ReactNode | null) => void
    isTitleVisible: boolean
    setIsTitleVisible: (isVisible: boolean) => void
    description: ReactNode | null
    setDescription: (description: ReactNode | null) => void
    isDescriptionVisible: boolean
    setIsDescriptionVisible: (isVisible: boolean) => void
}>({
    title: null,
    setTitle: () => {},
    isTitleVisible: false,
    setIsTitleVisible: () => {},
    description: null,
    setDescription: () => {},
    isDescriptionVisible: false,
    setIsDescriptionVisible: () => {},
})
