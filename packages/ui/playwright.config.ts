import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, devices } from '@playwright/test'

const packageDirectory = fileURLToPath(new URL('.', import.meta.url))
const documentationPort = process.env.H0N_DOCUMENTATION_PORT ?? '5201'
const documentationUrl = `http://127.0.0.1:${documentationPort}`
const chromiumProject = { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
const browserProjects = process.platform === 'win32'
    ? [chromiumProject]
    : [chromiumProject, { name: 'firefox', use: { ...devices['Desktop Firefox'] } }, { name: 'webkit', use: { ...devices['Desktop Safari'] } }]

export default defineConfig({
    testDir: './tests-visual',
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 1 : 0,
    reporter: process.env.CI ? 'github' : 'list',
    snapshotPathTemplate: '{testDir}/__screenshots__/{testFileName}/{arg}{ext}',
    use: {
        baseURL: documentationUrl,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        viewport: { width: 1280, height: 720 }
    },
    projects: browserProjects,
    webServer: process.env.H0N_SKIP_WEB_SERVER ? undefined : {
        command: `node node_modules/vite/bin/vite.js apps/documentation --host 127.0.0.1 --port ${documentationPort} --strictPort`,
        cwd: resolve(packageDirectory, '../..'),
        reuseExistingServer: !process.env.CI && !process.env.H0N_DOCUMENTATION_PORT,
        stderr: 'pipe',
        stdout: 'pipe',
        timeout: 60_000,
        url: documentationUrl
    }
})
