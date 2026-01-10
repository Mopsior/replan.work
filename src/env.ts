import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
    server: {
        SERVER_URL: z.url().optional(),
        CLERK_SECRET_KEY: z.string().min(1).optional(),
        DATABASE_URL: z.string().min(1).optional(),
    },

    clientPrefix: 'VITE_',
    client: {
        VITE_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    },

    runtimeEnv: import.meta.env,

    /**
     * By default, this library will feed the environment variables directly to
     * the Zod validator.
     *
     * This means that if you have an empty string for a value that is supposed
     * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
     * it as a type mismatch violation. Additionally, if you have an empty string
     * for a value that is supposed to be a string with a default value (e.g.
     * `DOMAIN=` in an ".env" file), the default value will never be applied.
     *
     * In order to solve these issues, we recommend that all new projects
     * explicitly specify this option as true.
     */
    emptyStringAsUndefined: true,
})
