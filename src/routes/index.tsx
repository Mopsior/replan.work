import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/')({ component: App })

function App() {
    const { t } = useTranslation()

    return (
        <>
            <p>{t('nowe')}</p>
        </>
    )
}
