import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
//
import vueDevTools from 'vite-plugin-vue-devtools'

// export default defineConfig({
//     plugins: [
//         vue(),
//         vueDevTools(),
//         AutoImport({
//             imports: ['vue', 'vue-router', 'pinia'],
//             dts: 'src/types/auto-imports.d.ts',
//             vueTemplate: true,
//         }),
//         Components({
//             dirs: ['src/components', 'src/components/icons', 'src/components/system'],
//             dts: 'src/types/components.d.ts',
//         }),
//     ],
//     resolve: {
//         alias: [
//             {
//                 find: '@',
//                 replacement: fileURLToPath(new URL('./src', import.meta.url)),
//             },
//         ],
//     },
//     server: {
//         host: '0.0.0.0',
//         port: 5190,
//         strictPort: true,
//         proxy: {
//             '/api': {
//                 target: 'http://127.0.0.1:5191',
//                 changeOrigin: true,
//             },
//         },
//     },
//     build: {
//         target: 'es2022',
//         sourcemap: mode !== 'production',
//         cssCodeSplit: true,
//         reportCompressedSize: false,
//     },
// })

export default defineConfig(({ mode }) => {
    return {
        plugins: [
            vue(),
            vueDevTools(),
            AutoImport({
                imports: ['vue', 'vue-router', 'pinia'],
                dts: 'src/types/auto-imports.d.ts',
                vueTemplate: true,
            }),
            Components({
                dirs: ['src/components', 'src/components/icons', 'src/components/system'],
                dts: 'src/types/components.d.ts',
            }),
        ],
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: fileURLToPath(new URL('./src', import.meta.url)),
                },
            ],
        },
        server: {
            host: '0.0.0.0',
            port: 5190,
            strictPort: true,
            proxy: {
                '/api': {
                    target: 'http://127.0.0.1:5191',
                    changeOrigin: true,
                },
            },
        },
        build: {
            target: 'es2022',
            sourcemap: mode !== 'production',
            cssCodeSplit: true,
            reportCompressedSize: false,
        },
    }
})
