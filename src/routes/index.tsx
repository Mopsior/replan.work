import { Link, createFileRoute } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { Trans, useTranslation } from 'react-i18next'
import { Button } from '@/features/ui/button'

export const Route = createFileRoute('/')({ component: App })

function App() {
    const { t } = useTranslation()

    return (
        <div className='flex h-dvh w-full items-center justify-center'>
            <Link to='/app'>
                <Button className='flex items-center'>
                    <Trans i18nKey={'goto'} values={{ name: t('gotoDestination.app') }} />
                    <ChevronRight />
                </Button>
            </Link>
        </div>
    )
}
