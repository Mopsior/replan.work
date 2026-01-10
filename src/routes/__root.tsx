import { HeadContent, Scripts, createRootRoute, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ClerkProvider } from '@clerk/tanstack-react-start'

import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import appCss from '../styles.css?url'
import { ThemeProvider } from '@/utils/theme-provider'

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
        <html lang={i18n.language} suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>
            <body>
                <ClerkProvider>
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
                </ClerkProvider>
                <Scripts />
            </body>
        </html>
    )
}
