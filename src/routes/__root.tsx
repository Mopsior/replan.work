import { HeadContent, Scripts, createRootRoute, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ClerkProvider } from '@clerk/tanstack-react-start'
import { shadcn } from '@clerk/themes'
import { enUS, plPL } from '@clerk/localizations'

import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import appCss from '../styles.css?url'
import { Language } from '@/types/enums'
import { ThemeProvider } from '@/lib/theme-provider'

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'TanStack Start Starter',
            },
        ],
        links: [
            {
                rel: 'stylesheet',
                href: appCss,
            },
        ],
    }),

    shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
    const { i18n } = useTranslation()
    const router = useRouter()

    useEffect(() => {
        const handler = () => {
            router.invalidate()
        }
        i18n.on('languageChanged', handler)
        return () => {
            i18n.off('languageChanged', handler)
        }
    }, [router])

    return (
        <ClerkProvider
            appearance={{ baseTheme: shadcn }}
            waitlistUrl='/waitlist'
            localization={i18n.language === Language.PL ? plPL : enUS}
        >
            <html lang={i18n.language} suppressHydrationWarning>
                <head>
                    <HeadContent />
                </head>
                <body>
                    <ThemeProvider>
                        {children}
                        <TanStackDevtools
                            config={{
                                position: 'bottom-right',
                            }}
                            plugins={[
                                {
                                    name: 'Tanstack Router',
                                    render: <TanStackRouterDevtoolsPanel />,
                                },
                            ]}
                        />
                    </ThemeProvider>
                    <Scripts />
                </body>
            </html>
        </ClerkProvider>
    )
}
