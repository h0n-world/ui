import { defineConfig } from '@playwright/test'

const port = process.env.H0N_EDITOR_PORT ?? '5203'
export default defineConfig({
    testDir: './editor-tests', testMatch: '**/*.spec.ts', workers: 1,
    use: { baseURL: `http://127.0.0.1:${port}`, browserName: 'chromium', viewport: { width: 1440, height: 1000 }, screenshot: 'only-on-failure' },
    webServer: process.env.H0N_SKIP_WEB_SERVER ? undefined : { command: `node ../../node_modules/vite/bin/vite.js --host 127.0.0.1 --port ${port} --strictPort`, url: `http://127.0.0.1:${port}`, reuseExistingServer: !process.env.CI, timeout: 60000 },
})
