'use client'

import { UserButton as ClerkUserButton } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { Laptop, Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'

export const UserButton = () => {
    const { theme, setTheme } = useTheme()
    const t = useTranslations()

    const handleChange = () => {
        switch (theme) {
            case 'light':
                setTheme('dark')
                break
            case 'dark':
                setTheme('system')
                break
            default:
                setTheme('light')
                break
        }
    }

    return (
        <ClerkUserButton>
            <ClerkUserButton.MenuItems>
                <ClerkUserButton.Action
                    label={t('switchTheme')}
                    labelIcon={
                        theme === 'light' ? (
                            <Sun size={16} />
                        ) : theme === 'dark' ? (
                            <Moon size={16} />
                        ) : (
                            <Laptop size={16} />
                        )
                    }
                    onClick={() => handleChange()}
                />
            </ClerkUserButton.MenuItems>
        </ClerkUserButton>
    )
}
