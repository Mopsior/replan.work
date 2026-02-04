import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig, loadEnv } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

const config = defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [
            devtools(),
            nitro(),
            // this is the plugin that enables path aliases
            viteTsConfigPaths({
                projects: ['./tsconfig.json'],
            }),
            tailwindcss(),
            tanstackStart(),
            viteReact(),
        ],
        server: {
            allowedHosts: ['*.local', ...(process.env.VITE_ALLOWED_HOSTS?.split(',') ?? [])],
        },
        define: {
            'import.meta.env.SOURCE_COMMIT': JSON.stringify(env.SOURCE_COMMIT || undefined),
        },
    }
})

export default config
