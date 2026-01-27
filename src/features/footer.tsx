import { Trans, useTranslation } from 'react-i18next'
import { ExternalLink } from './external-link'
import { InlineCode } from './typograpghy'
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
                'text-muted-foreground bg-background bottom-4 rounded-md px-4 py-2 text-center text-sm',
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
                            to={`${env.VITE_REPO}/commit/${import.meta.env.SOURCE_COMMIT}`}
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
                    buildHash: import.meta.env.SOURCE_COMMIT
                        ? import.meta.env.SOURCE_COMMIT.slice(0, 7)
                        : t('footer.buildType.dev'),
                }}
            />
        </div>
    )
}
