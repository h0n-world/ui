import { defineConfig } from 'vitest/config'

export default defineConfig({ test: { environment: 'node', include: ['editor-tests/**/*.test.ts'] } })
