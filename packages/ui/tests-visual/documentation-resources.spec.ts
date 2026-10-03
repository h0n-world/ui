import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { expect, test } from '@playwright/test'
import { h0ComponentManifest } from '../src/manifest'

test('every component resource points to an existing source family', () => {
    for (const entry of h0ComponentManifest) {
        const directory = fileURLToPath(new URL(`../src/components/${entry.family}/index.ts`, import.meta.url))
        expect(existsSync(directory), `${entry.name}: ${entry.family}`).toBe(true)
    }
})

for (const [route, family] of [['accordion', 'Accordion'], ['label', 'Typography'], ['layout', 'Layout'], ['toast', 'Toast']]) {
    test(`${route}: source link follows the component family`, async ({ page }) => {
        await page.goto(`/components/${route}`)
        const resources = page.getByRole('navigation', { name: 'Component resources' })
        const source = resources.getByRole('link', { name: 'Source', exact: true })
        await expect(source).toHaveAttribute('href', `https://github.com/h0n-world/ui/tree/main/packages/ui/src/components/${family}`)
        await expect(source).toHaveAttribute('target', '_blank')
        await expect(source).toHaveAttribute('rel', 'noopener noreferrer')
        expect(await resources.evaluate(element => element.previousElementSibling?.classList.contains('article-description'))).toBe(true)
        await page.setViewportSize({ width: 390, height: 844 })
        await expect(source).toBeVisible()
        const box = await source.boundingBox()
        expect(box!.x).toBeGreaterThanOrEqual(0)
        expect(box!.x + box!.width).toBeLessThanOrEqual(390)
    })
}

test('getting started and component catalog omit component resources', async ({ page }) => {
    for (const route of ['/getting-started/quick-start', '/components/overview']) {
        await page.goto(route)
        await expect(page.locator('.article-description')).toBeVisible()
        await expect(page.getByRole('navigation', { name: 'Component resources' })).toHaveCount(0)
    }
})
