//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'
import { globalIgnores } from 'eslint/config'

export default [
    ...tanstackConfig,
    {
        rules: {
            'no-shadow': 'off',
            'require-await': 'off',
            '@typescript-eslint/require-await': 'off',
        },
    },
    globalIgnores(['/.output/**', '/.tanstack/**']),
]
