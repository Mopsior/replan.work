import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import * as TanstackQuery from './lib/tanstack-query/root-provider'
import '@/lib/i18n'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
    const rqContext = TanstackQuery.getContext()

    const router = createRouter({
        routeTree,
        context: {
            ...rqContext,
        },

        defaultPreload: 'intent',
    })

    setupRouterSsrQueryIntegration({ router, queryClient: rqContext.queryClient })

    return router
}
