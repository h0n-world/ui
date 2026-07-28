import { spawn } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const workspaceDirectory = resolve(packageDirectory, '../..')
const port = process.env.H0N_DOCUMENTATION_PORT ?? '5201'
const url = `http://127.0.0.1:${port}`
const vite = resolve(workspaceDirectory, 'node_modules/vite/bin/vite.js')
const playwright = resolve(workspaceDirectory, 'node_modules/@playwright/test/cli.js')
const server = spawn(process.execPath, [vite, 'apps/documentation', '--host', '127.0.0.1', '--port', port, '--strictPort'], { cwd: workspaceDirectory, stdio: 'inherit' })

async function waitForServer() {
    for (let attempt = 0; attempt < 120; attempt += 1) {
        if (server.exitCode !== null) throw new Error(`Documentation server exited with code ${server.exitCode}`)
        try {
            const response = await fetch(url)
            if (response.ok) return
        } catch {}
        await new Promise((resolve) => setTimeout(resolve, 250))
    }
    throw new Error(`Documentation server did not become ready at ${url}`)
}

try {
    await waitForServer()
    const tests = spawn(process.execPath, [playwright, 'test', '--config', resolve(packageDirectory, 'playwright.config.ts'), ...process.argv.slice(2)], {
        cwd: workspaceDirectory,
        env: { ...process.env, H0N_SKIP_WEB_SERVER: '1' },
        stdio: 'inherit'
    })
    const exitCode = await new Promise((resolve) => tests.once('exit', (code) => resolve(code ?? 1)))
    process.exitCode = exitCode
} finally {
    server.kill()
}
