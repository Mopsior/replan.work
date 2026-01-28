import { useTranslation } from 'react-i18next'
import { UserButton as ClerkUserButton } from '@clerk/tanstack-react-start'
import { getNextTheme, themeIcons, themeTranslations } from './get-next-theme'
import type { Theme } from '@/types/enums'
import { useTheme } from '@/lib/theme-provider'

export const UserButton = () => {
    const { t } = useTranslation()
    const { userTheme, setTheme } = useTheme()

    const nextTheme = getNextTheme(userTheme as Theme)
    const nextThemeTranslation = themeTranslations[nextTheme]

    const handleChange = () => {
        setTheme(nextTheme)
    }

    return (
        <ClerkUserButton>
            <ClerkUserButton.MenuItems>
                <ClerkUserButton.Action
                    label={t('themes.switch', { theme: nextThemeTranslation })}
                    labelIcon={themeIcons[nextTheme]}
                    onClick={() => handleChange()}
                />
            </ClerkUserButton.MenuItems>
        </ClerkUserButton>
    )
}
