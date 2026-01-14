import { Trans, useTranslation } from 'react-i18next'
import { InlineCode } from './inline-code'
import { ExternalLink } from './external-link'
import { env } from '@/env'
import { cn } from '@/lib/utils'

export const Footer = ({
    withoutFixed = false,
    visibleOnMobile = false,
}: {
    withoutFixed?: boolean
    visibleOnMobile?: boolean
}) => {
    const { t } = useTranslation()

    return (
        <div
            className={cn([
                'text-muted-foreground bottom-4 text-center text-sm',
                !withoutFixed && 'fixed left-1/2 -translate-x-1/2 transform',
                !visibleOnMobile && 'not-md:hidden',
            ])}
        >
            <Trans
                i18nKey={'footer.build'}
                components={{
                    b: <b />,
                    code: <InlineCode />,
                    repoUrl: <ExternalLink to={env.VITE_REPO} withUnderline />,
                    commitUrl: import.meta.env.SOURCE_COMMIT ? (
                        <ExternalLink
                            to={`${env.VITE_REPO}/commit/${import.meta.env.SOURCE_COMMIT.slice(0, 7)}`}
                            withUnderline
                        />
                    ) : (
                        <></>
                    ),
                }}
                values={{
                    buildType: import.meta.env.PROD
                        ? t('footer.buildType.prod')
                        : t('footer.buildType.dev'),
                    buildHash: import.meta.env.SOURCE_COMMIT ?? t('footer.buildType.dev'),
                }}
            />
        </div>
    )
}
