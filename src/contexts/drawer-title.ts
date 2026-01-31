import { createContext } from 'react'
import type { ReactNode } from 'react';

export const DrawerTitleContext = createContext<{
    title: ReactNode | null
    setTitle: (title: ReactNode | null) => void
}>({
    title: null,
    setTitle: () => {},
})
