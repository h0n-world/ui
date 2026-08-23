import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        dedupe: ['vue'],
        alias: [
            {
                find: /^@h0nio\/icons\/catalog$/,
                replacement: fileURLToPath(
                    new URL('../../packages/icons/src/catalog.ts', import.meta.url),
                ),
            },
            {
                find: /^@h0nio\/icons\/runtime$/,
                replacement: fileURLToPath(
                    new URL('../../packages/icons/src/runtime.ts', import.meta.url),
                ),
            },
            {
                find: /^@h0nio\/icons\/(.+)$/,
                replacement: fileURLToPath(
                    new URL('../../packages/icons/src/icons/$1.ts', import.meta.url),
                ),
            },
            {
                find: /^@h0nio\/icons$/,
                replacement: fileURLToPath(
                    new URL('../../packages/icons/src/index.ts', import.meta.url),
                ),
            },
            {
                find: /^@h0nio\/ui\/style\.css$/,
                replacement: fileURLToPath(
                    new URL('../../packages/ui/src/styles/index.scss', import.meta.url),
                ),
            },
            {
                find: /^@h0nio\/ui\/icons$/,
                replacement: fileURLToPath(
                    new URL('../../packages/ui/src/icons/index.ts', import.meta.url),
                ),
            },
            {
                find: /^@h0nio\/ui$/,
                replacement: fileURLToPath(
                    new URL('../../packages/ui/src/index.ts', import.meta.url),
                ),
            },
            {
                find: '@',
                replacement: fileURLToPath(new URL('./src', import.meta.url)),
            },
        ],
    },
    server: {
        host: '0.0.0.0',
        port: 5201,
    },
})
