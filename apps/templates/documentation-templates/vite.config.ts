import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        dedupe: ['vue'],
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@h0n/ui/icons': fileURLToPath(new URL('../../../packages/ui/src/icons/index.ts', import.meta.url)),
            '@h0n/ui': fileURLToPath(new URL('../../../packages/ui/src/entry.ts', import.meta.url))
        }
    },
    server: {
        host: '0.0.0.0',
        port: 5201
    }
})
