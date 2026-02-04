// must be imported before anything else

import { enUS, plPL } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/tanstack-react-start'
import { shadcn } from '@clerk/themes'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { createRootRoute, HeadContent, Scripts, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { scan } from 'react-scan'
import { Footer } from '@/features/footer'
import { ThemeProvider } from '@/lib/theme-provider'
import { ToasterWrapper } from '@/lib/toaster-wrapper'
import { Language } from '@/types/enums'
import appCss from '../styles.css?url'

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
    useEffect(() => {
        scan({
            enabled: true,
        })
    }, [])

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
                        <Footer />
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
                        <ToasterWrapper />
                    </ThemeProvider>
                    <Scripts />
                </body>
            </html>
        </ClerkProvider>
    )
}
