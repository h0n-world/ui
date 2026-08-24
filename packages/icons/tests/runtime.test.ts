import { describe, expect, it } from 'vitest'
import { iconToDataUri, renderIcon } from '../src/runtime.js'
import type { IconDefinition } from '../src/types.js'

const icon: IconDefinition = {
    name: 'test',
    viewBox: '0 0 24 24',
    body: '<path fill="currentColor" d="M0 0h24v24H0z"/>',
}

describe('icon runtime', () => {
    it('renders a decorative icon by default', () => {
        expect(renderIcon(icon)).toBe(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><path fill="currentColor" d="M0 0h24v24H0z"/></svg>',
        )
    })

    it('renders and escapes accessible options', () => {
        const rendered = renderIcon(icon, {
            size: '2<em',
            color: 'red" onload="bad',
            title: 'Save <draft> & continue',
            label: 'Save "draft" & continue',
            class: 'icon" data-bad="true',
        })

        expect(rendered).toContain('width="2&lt;em" height="2&lt;em"')
        expect(rendered).toContain('color="red&quot; onload=&quot;bad"')
        expect(rendered).toContain('class="icon&quot; data-bad=&quot;true"')
        expect(rendered).toContain('role="img" aria-label="Save &quot;draft&quot; &amp; continue"')
        expect(rendered).toContain('<title>Save &lt;draft&gt; &amp; continue</title>')
    })

    it('accepts numeric sizes and derives the label from the title', () => {
        const rendered = renderIcon(icon, { size: 32, title: 'Status' })
        expect(rendered).toContain('width="32" height="32"')
        expect(rendered).toContain('role="img" aria-label="Status"')
    })

    it('creates a reversible SVG data URI', () => {
        const uri = iconToDataUri(icon, { label: 'Preview' })
        expect(uri).toMatch(/^data:image\/svg\+xml,/)
        expect(decodeURIComponent(uri.slice('data:image/svg+xml,'.length))).toBe(
            renderIcon(icon, { label: 'Preview' }),
        )
    })
})
