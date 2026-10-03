import { beforeAll, afterAll, expect, it } from 'vitest'
import { resolve } from 'node:path'
import { buildEditorTypes } from '../scripts/editor-types-plugin'
import { createEditorLanguageService } from '../src/editor/language-service'
import { starterFiles } from '../src/editor/project'

let service: ReturnType<typeof createEditorLanguageService>
beforeAll(async () => {
    service = createEditorLanguageService(await buildEditorTypes(resolve('.')))
}, 60000)
afterAll(() => service?.dispose())

it('accepts the actual starter with Vue refs and H0N UI props', () => {
    expect(service.diagnostics(starterFiles['App.vue'])).toEqual([])
})
it('reports semantic TS assignments at original SFC offsets', () => {
    const source =
        '<script setup lang="ts">const amount: number = "wrong"</script><template>{{ amount }}</template>'
    const errors = service.diagnostics(source)
    expect(errors.some((item) => item.message.includes('TS2322'))).toBe(true)
    expect(errors.some((item) => source.slice(item.from, item.to).includes('amount'))).toBe(true)
})
it('checks template expressions and real component prop unions', () => {
    const source =
        '<script setup lang="ts">import { H0Button } from "@h0nio/ui"; const value = 1</script><template><H0Button size="gigantic">{{ value.notAProperty }}</H0Button></template>'
    const errors = service.diagnostics(source)
    expect(errors.some((item) => item.message.includes('gigantic'))).toBe(true)
    expect(errors.some((item) => item.message.includes('notAProperty'))).toBe(true)
})
it('checks globally registered library components', () => {
    expect(
        service
            .diagnostics('<template><H0Button size="gigantic">Test</H0Button></template>')
            .some((item) => item.message.includes('gigantic')),
    ).toBe(true)
})
it('offers TS member completions with Vue type inference', () => {
    const source =
        '<script setup lang="ts">import { ref } from "vue"; const count = ref(1); count.value.</script><template>Hello</template>'
    const offset = source.indexOf('count.value.') + 'count.value.'.length
    expect(service.completions(source, offset).some((item) => item.label === 'toFixed')).toBe(true)
})
it('updates diagnostics after corrections without keeping stale errors', () => {
    expect(
        service.diagnostics(
            '<script setup lang="ts">const count: number = "bad"</script><template>{{count}}</template>',
        ).length,
    ).toBeGreaterThan(0)
    expect(
        service.diagnostics(
            '<script setup lang="ts">const count: number = 1</script><template>{{count}}</template>',
        ),
    ).toEqual([])
})
