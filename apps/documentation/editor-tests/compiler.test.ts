import { describe, expect, it } from 'vitest'
import { compileProject } from '../src/editor/compiler'
import {
    resolveImport,
    starterFiles,
    validateProject,
    type EditorFiles,
} from '../src/editor/project'
const project = (source: string): EditorFiles => ({ 'App.vue': source, 'style.css': '' })

describe('two-file editor compiler', () => {
    it('compiles the starter and includes style.css without an import', () => {
        const output = compileProject(starterFiles)
        expect(output.modules['App.vue']).toContain('require("@h0nio/ui")')
        expect(output.css).toContain('.demo')
        expect(Object.keys(output.modules)).toEqual(['App.vue', 'style.css'])
    })
    it('supports normal script exports and scopes component CSS', () => {
        const result = compileProject(
            project(
                '<script lang="ts">export default { data: () => ({ count: 1 }) }</script><template>{{ count }}</template><style scoped>p { color: red }</style>',
            ),
        )
        expect(result.modules['App.vue']).toContain('__component.render = render')
        expect(result.css).toContain('[data-v-editor-App-vue]')
    })
    it.each([
        'https://cdn.example.com/code.js',
        'lodash',
        '@h0nio/ui/internal',
        '../parent.ts',
        './helper.ts',
        './Other.vue',
    ])('rejects unavailable imports: %s', (name) => {
        expect(() =>
            compileProject(
                project(
                    `<script setup>import x from '${name}'</script><template>{{ x }}</template>`,
                ),
            ),
        ).toThrow('unavailable')
    })
    it('rejects dynamic imports, external blocks and preprocessors', () => {
        expect(() => compileProject(project('<script setup>import("vue")</script>'))).toThrow(
            'Dynamic imports',
        )
        expect(() =>
            compileProject(project('<template src="https://example.com/page.html" />')),
        ).toThrow('External SFC')
        expect(() =>
            compileProject(
                project('<template>Hello</template><style lang="scss">p{color:red}</style>'),
            ),
        ).toThrow('Only CSS')
    })
    it('requires precisely App.vue and style.css and bounds imported projects', () => {
        expect(() => validateProject({ 'App.vue': '' })).toThrow('exactly')
        expect(() => validateProject({ ...starterFiles, 'other.vue': '' })).toThrow('exactly')
        expect(() => validateProject({ ...starterFiles, 'style.css': 1 })).toThrow('Invalid file')
        expect(() => validateProject(project('x'.repeat(300001)))).toThrow('limit')
        expect(resolveImport('./style.css', starterFiles)).toBe('style.css')
    })
})
