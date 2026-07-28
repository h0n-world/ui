import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { h0ComponentManifest } from '../src/manifest'

const componentRoutes = [...new Set(h0ComponentManifest.filter((entry) => entry.axe).map((entry) => entry.docsSlug))]

test.beforeEach(({ browserName }) => {
    test.skip(browserName !== 'chromium', 'Accessibility release gate runs in Chromium.')
})

for (const route of componentRoutes) {
    test(`${route} has no critical or serious axe violations`, async ({ page }) => {
        await page.goto(`/components/${route}`)
        await expect(page.locator('.docs-layout__main')).toBeVisible()

        const previewFrames = page.locator('.documentation-preview__frame')
        test.skip((await previewFrames.count()) === 0, 'This compound family has no standalone executable preview.')

        const results = await new AxeBuilder({ page })
            .include('.documentation-preview__frame')
            // Contrast needs a dedicated light/dark/state matrix; this gate covers structural WCAG regressions.
            .disableRules(['color-contrast'])
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze()
        const violations = results.violations.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')

        expect(violations, violations.map((violation) => `${violation.id}: ${violation.help}`).join('\n')).toEqual([])
    })
}
