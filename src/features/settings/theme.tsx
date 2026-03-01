import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme-provider'
import { Theme } from '@/types/enums'
import Drawer from '../drawer'
import { RadioGroup } from '../inputs/radio-group'
import { getNextTheme, themeIcons, themeTranslations } from './get-next-theme'

export const ThemeSettings = () => {
    const { t } = useTranslation()
    const { userTheme, setTheme } = useTheme()
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    if (!isHydrated) return null // Prevent hydration mismatch

    const nextTheme = getNextTheme(userTheme as Theme)

    return (
        <div className='flex h-fit w-full flex-col gap-y-2 md:hidden'>
            <p className='text-muted-foreground text-sm'>{t('appSettings.themes.label')}</p>
            <Drawer.Nested
                trigger={
                    <Button variant={'secondary'}>
                        {themeIcons[nextTheme]} {t('appSettings.themes.button')}
                    </Button>
                }
            >
                <div className='flex w-full flex-col gap-y-4 px-4 pb-8'>
                    <Drawer.Title>{t('appSettings.themes.label')}</Drawer.Title>
                    <Drawer.HiddenDescription>
                        {t('appSettings.themes.ariaDescription')}
                    </Drawer.HiddenDescription>
                    <RadioGroup
                        value={userTheme}
                        onValueChange={(value) => setTheme(value as Theme)}
                        items={[Theme.LIGHT, Theme.DARK, Theme.SYSTEM].map((theme) => ({
                            value: theme,
                            title: themeTranslations[theme],
                            icon: themeIcons[theme],
                        }))}
                    />
                </div>
            </Drawer.Nested>
        </div>
    )
}
