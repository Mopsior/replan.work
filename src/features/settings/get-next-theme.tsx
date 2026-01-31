import { Laptop, Moon, Sun } from 'lucide-react'
import { t } from 'i18next'
import type { ReactNode } from 'react'
import { Theme } from '@/types/enums'

export const getNextTheme = (currentTheme: Theme): Theme => {
    switch (currentTheme) {
        case Theme.LIGHT:
            return Theme.DARK
        case Theme.DARK:
            return Theme.SYSTEM
        default:
            return Theme.LIGHT
    }
}

export const themeTranslations: Record<Theme, string> = {
    [Theme.LIGHT]: t('appSettings.themes.light'),
    [Theme.DARK]: t('appSettings.themes.dark'),
    [Theme.SYSTEM]: t('appSettings.themes.system'),
}

const iconsProps = { size: 16 }

export const themeIcons: Record<Theme, ReactNode> = {
    [Theme.LIGHT]: <Sun {...iconsProps} />,
    [Theme.DARK]: <Moon {...iconsProps} />,
    [Theme.SYSTEM]: <Laptop {...iconsProps} />,
}
