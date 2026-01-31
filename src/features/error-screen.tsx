import { useTranslation } from 'react-i18next'
import { H3 } from './typography'

export const ErrorScreen = ({ error }: { error: Error }) => {
    const { t } = useTranslation()
    console.error('[Client Side Error]', error)
    // in future: add posthog error tracking here

    return (
        <div className='flex h-fit w-full flex-col items-center justify-center gap-y-2 p-4'>
            <H3>{t('error')}</H3>
            <p className='text-muted-foreground text-center text-xs'>{t('errorSentInfo')}</p>
            <pre className='max-h-40 max-w-full overflow-auto rounded-md border px-4 py-2'>
                <code>
                    {error.name} {error.message}
                </code>
            </pre>
        </div>
    )
}
