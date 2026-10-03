import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const quality of ['off', 'low', 'medium', 'high'] as const) {
    test(`${quality}: motion policy keeps the text readable`, async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'no-preference' })
        await page.goto('/components/textshimmer')
        await page.evaluate(quality => { document.documentElement.dataset.h0nAnimation = quality }, quality)
        const label = page.locator('.text-shimmer-labels [data-h0n-component="text-shimmer"]').first()
        await expect(label).toHaveText('Thinking...')
        const style = await label.evaluate(el => { const s = getComputedStyle(el); return { animation: s.animationName, fill: s.webkitTextFillColor, color: s.color } })
        expect(style.animation === 'none').toBe(quality !== 'high')
        if (quality === 'high') {
            expect(style.fill).toBe('rgba(0, 0, 0, 0)')
            const position = await label.evaluate(el => getComputedStyle(el).backgroundPositionX)
            await expect.poll(() => label.evaluate(el => getComputedStyle(el).backgroundPositionX)).not.toBe(position)
        } else expect(style.fill).toBe(style.color)
        await expect(label).not.toHaveAttribute('aria-hidden')
    })
}

test('live reduced motion, forced colors, activation and duration', async ({ page }) => {
    await page.goto('/components/textshimmer')
    await page.getByRole('button', { name: 'Preview High', exact: true }).click()
    const label = page.getByRole('status')
    await expect.poll(() => label.evaluate(el => getComputedStyle(el).animationName)).not.toBe('none')
    expect(await label.evaluate(el => getComputedStyle(el).animationDuration)).toBe('3.5s')
    await page.getByRole('switch', { name: 'Enable shimmer', exact: true }).click()
    expect(await label.evaluate(el => getComputedStyle(el).animationName)).toBe('none')
    await expect(label).toHaveText('Loading your workspace...')
    await page.getByRole('switch', { name: 'Enable shimmer', exact: true }).click()
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect.poll(() => label.evaluate(el => getComputedStyle(el).animationName)).toBe('none')
    expect(await label.evaluate(el => getComputedStyle(el).webkitTextFillColor)).not.toBe('rgba(0, 0, 0, 0)')
    await page.emulateMedia({ reducedMotion: 'no-preference', forcedColors: 'active' })
    expect(await label.evaluate(el => getComputedStyle(el).animationName)).toBe('none')
    expect(await label.evaluate(el => getComputedStyle(el).webkitTextFillColor)).not.toBe('rgba(0, 0, 0, 0)')
})

for (const theme of ['light', 'dark'] as const) {
    for (const accent of ['default', 'telegram', 'uber'] as const) {
        test(`${theme}/${accent}: readable palette endpoints and stable layout`, async ({ page }) => {
            await page.goto('/components/textshimmer')
            await page.evaluate(({ theme, accent }) => { Object.assign(document.documentElement.dataset, { h0nTheme: theme, h0nAccent: accent, h0nAnimation: 'high' }) }, { theme, accent })
            const label = page.locator('.text-shimmer-labels [data-h0n-component="text-shimmer"]').first()
            const colors = await label.evaluate(el => {
                const base = getComputedStyle(el).color
                const sample = document.createElement('span')
                el.parentElement!.append(sample)
                sample.style.color = 'var(--h0n-ui-color-text)'; const highlight = getComputedStyle(sample).color
                sample.style.color = 'var(--h0n-ui-color-surface)'; const surface = getComputedStyle(sample).color
                sample.remove()
                // Default palette uses Lab colors; normalize via the browser's
                // sRGB canvas rather than interpreting Lab coordinates as RGB.
                const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1
                const context = canvas.getContext('2d')!
                const rgb = (color: string) => {
                    context.clearRect(0, 0, 1, 1); context.fillStyle = color; context.fillRect(0, 0, 1, 1)
                    const pixel = context.getImageData(0, 0, 1, 1).data
                    return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`
                }
                return { base: rgb(base), highlight: rgb(highlight), surface: rgb(surface) }
            })
            const luminance = (rgb: string) => {
                const channels = rgb.match(/[\d.]+/g)!.slice(0, 3).map(Number).map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)
                return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722
            }
            for (const color of [colors.base, colors.highlight]) {
                const a = luminance(color); const b = luminance(colors.surface)
                expect((Math.max(a, b) + .05) / (Math.min(a, b) + .05)).toBeGreaterThanOrEqual(4.5)
            }
            const before = await label.boundingBox()
            await page.getByRole('button', { name: 'Turn motion off', exact: true }).click()
            const after = await label.boundingBox()
            expect(after!.width).toBeCloseTo(before!.width, 1)
            expect(after!.height).toBeCloseTo(before!.height, 1)
        })
    }
}

test('mobile wrapping, RTL, typography, accessibility and visual preview', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 720 })
    await page.goto('/components/textshimmer')
    await page.locator('.documentation-preview').filter({ has: page.locator('.text-shimmer-basic-example') }).getByRole('button', { name: 'Actions', exact: true }).click()
    await page.getByRole('button', { name: 'Preview High', exact: true }).click()
    const rtl = page.locator('.text-shimmer-multiline')
    await rtl.scrollIntoViewIfNeeded()
    const layout = await rtl.evaluate(el => ({ width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height, direction: getComputedStyle(el).direction, lineHeight: parseFloat(getComputedStyle(el).lineHeight) }))
    expect(layout.width).toBeLessThanOrEqual(192)
    expect(layout.height).toBeGreaterThan(layout.lineHeight)
    expect(layout.direction).toBe('rtl')
    const accessibility = await new AxeBuilder({ page }).include('.text-shimmer-custom-example').disableRules(['color-contrast']).analyze()
    expect(accessibility.violations).toEqual([])
    await page.screenshot({ path: 'test-results/text-shimmer-mobile.png' })
})
