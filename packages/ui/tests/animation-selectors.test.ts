import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { compileStyle, parse } from 'vue/compiler-sfc'
import { compileString } from 'sass'
import { describe, expect, it } from 'vitest'

describe('compiled component animation selectors', () => {
    it.each([
        ['Alert/H0Alert.vue', '.h-alert__icon'],
        ['Skeleton/H0Skeleton.vue', '.h-skeleton'],
        ['Spinner/H0Spinner.vue', '.h-spinner'],
    ])('%s targets the component rather than the appearance root', (file, target) => {
        const path = resolve('src/components', file)
        const url = pathToFileURL(path)
        const { descriptor } = parse(readFileSync(url, 'utf8'))
        const style = descriptor.styles[0]
        const css = compileString(style.content, { url, loadPaths: [dirname(path)] }).css
        const output = compileStyle({ source: css, filename: file, id: 'data-v-audit', scoped: true })
        expect(output.errors).toEqual([])
        const selectors = output.code.match(/[^{}]+(?=\{)/g)!.filter(selector => /data-h0n-animation=["']?low["']?/.test(selector))
        expect(selectors).toHaveLength(1)
        expect(selectors[0]).toContain(target)
        expect(selectors[0]).toContain('[data-v-audit]')
    })
})
