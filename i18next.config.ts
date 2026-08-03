import { defineConfig } from 'i18next-cli'

export default defineConfig({
    locales: ['pl'],
    extract: {
        input: 'src/**/*.{js,jsx,ts,tsx}',
        output: 'src/locales/{{language}}.json',
    },
    lint: {
        ignore: ['src/routes/test/**'],
    },
})
