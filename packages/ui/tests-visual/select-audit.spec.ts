import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { fileURLToPath } from 'node:url'

test('open Select exposes options, leaves tab focus on the combobox, and passes structural accessibility', async ({ page }) => {
    await page.goto('/components/select')
    const trigger = page.getByRole('combobox').first()
    await trigger.click()
    const options = page.getByRole('option')
    await expect(options.first()).toBeVisible()
    await expect(options.first()).toHaveAttribute('tabindex', '-1')
    const results = await new AxeBuilder({ page }).include('[data-h0n-component="select-popover"]').disableRules(['color-contrast']).analyze()
    expect(results.violations).toEqual([])
    await page.keyboard.press('Tab')
    await expect(page.getByRole('listbox')).toHaveCount(0)
})

test('selected virtual options are initially visible, CSS heights retain their units, and disabled state closes the list', async ({ page }) => {
    const modules: string[] = []
    page.on('request', request => modules.push(request.url()))
    await page.goto('/components/select')
    await page.waitForLoadState('networkidle')
    const vueUrl = modules.find(url => /\/vue\.js(?:\?|$)/.test(url))!
    const sourcePath = fileURLToPath(new URL('../src/components/Select/H0Select.vue', import.meta.url)).replaceAll('\\', '/')
    const componentUrl = `/@fs${sourcePath.startsWith('/') ? '' : '/'}${sourcePath}`
    await page.evaluate(async ({ vueUrl, componentUrl }) => {
        const { createApp, h, ref } = await import(vueUrl)
        const { default: Select } = await import(componentUrl)
        const disabled = ref(false)
        const container = document.createElement('div')
        container.id = 'audit-select'
        Object.assign(container.style, { position: 'fixed', top: '80px', left: '40px', zIndex: '99999', width: '300px' })
        document.body.append(container)
        const app = createApp({ render: () => h(Select, { label: 'Audit project', defaultValue: 400, virtual: true, optionHeight: 44, overscan: 0, scrollHeight: '20rem', disabled: disabled.value, options: Array.from({ length: 500 }, (_, value) => ({ value, label: `Project ${value}` })) }) })
        app.mount(container)
        ;(window as any).__selectAudit = { app, disabled }
    }, { vueUrl, componentUrl })
    const trigger = page.locator('#audit-select').getByRole('combobox')
    await trigger.click()
    const selected = page.getByRole('option', { name: 'Project 400', exact: true })
    await expect(selected).toBeVisible()
    const list = page.getByRole('listbox')
    await expect.poll(() => list.evaluate(el => el.clientHeight)).toBeGreaterThan(100)
    const id = await trigger.getAttribute('aria-activedescendant')
    expect(await selected.getAttribute('id')).toBe(id)
    const rows = page.getByRole('option')
    expect(await rows.count()).toBeLessThan(20)
    await list.evaluate(el => { el.scrollTop = 1000; el.dispatchEvent(new Event('scroll')) })
    // Position observers may rerun when the viewport changes, but must not
    // undo intentional pointer/wheel scrolling back to the active option.
    await page.setViewportSize({ width: 1280, height: 800 })
    await expect.poll(() => list.evaluate(el => el.scrollTop)).toBeLessThan(2000)
    await page.evaluate(() => { (window as any).__selectAudit.disabled.value = true })
    await expect(list).toHaveCount(0)
    await page.evaluate(() => { (window as any).__selectAudit.app.unmount(); document.getElementById('audit-select')!.remove() })
})
