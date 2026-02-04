import { UserButton as ClerkUserButton } from '@clerk/tanstack-react-start'
import { useNavigate } from '@tanstack/react-router'
import { Settings2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/lib/theme-provider'
import type { Theme } from '@/types/enums'
import { getNextTheme, themeIcons, themeTranslations } from '../settings/get-next-theme'

export const UserButton = () => {
    const { t } = useTranslation()
    const { userTheme, setTheme } = useTheme()
    const navigate = useNavigate()

    const nextTheme = getNextTheme(userTheme as Theme)
    const nextThemeTranslation = themeTranslations[nextTheme]

    const handleChange = () => {
        setTheme(nextTheme)
    }

    return (
        <ClerkUserButton>
            <ClerkUserButton.MenuItems>
                <ClerkUserButton.Action
                    label={t('settings.title')}
                    labelIcon={<Settings2 size={16} />}
                    onClick={() =>
                        navigate({
                            to: '/app/settings',
                            search: (prev) => prev,
                        })
                    }
                />
                <ClerkUserButton.Action
                    label={t('appSettings.themes.switch', { theme: nextThemeTranslation })}
                    labelIcon={themeIcons[nextTheme]}
                    onClick={() => handleChange()}
                />
            </ClerkUserButton.MenuItems>
        </ClerkUserButton>
    )
}
