<script setup lang="ts">
import { computed } from 'vue'
import hljs from 'highlight.js/lib/core'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import scss from 'highlight.js/lib/languages/scss'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'

defineOptions({
    name: 'DocumentationCodeBlock',
})

const languages = {
    css,
    html: xml,
    javascript,
    scss,
    typescript,
    vue: xml,
}

for (const [name, language] of Object.entries(languages)) {
    if (!hljs.getLanguage(name)) hljs.registerLanguage(name, language)
}

const props = withDefaults(
    defineProps<{
        code: string
        language?: keyof typeof languages | 'plaintext'
    }>(),
    {
        language: 'plaintext',
    },
)

function escapeHtml(value: string) {
    return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function highlightByLanguage(code: string, language: keyof typeof languages | 'plaintext') {
    if (language === 'plaintext' || !hljs.getLanguage(language)) return escapeHtml(code)
    return hljs.highlight(code, { language }).value
}

function getVueBlockLanguage(blockName: string, attributes: string) {
    const language = attributes.match(/\blang=["']?([\w-]+)["']?/i)?.[1]

    if (language === 'ts') return 'typescript'
    if (language === 'js') return 'javascript'
    if (language === 'scss') return 'scss'
    if (language === 'css') return 'css'
    return blockName === 'template' ? 'html' : 'plaintext'
}

function highlightVueSfc(code: string) {
    const blockPattern = /<(template|script|style)([^>]*)>([\s\S]*?)<\/\1>/gi
    let cursor = 0
    let result = ''

    for (const match of code.matchAll(blockPattern)) {
        const [block, blockName = '', attributes = ''] = match
        const index = match.index ?? 0
        const openingTag = `<${blockName}${attributes}>`
        const closingTag = `</${blockName}>`
        const contentStart = index + openingTag.length
        const contentEnd = index + block.length - closingTag.length

        result += highlightByLanguage(code.slice(cursor, index), 'html')
        result += highlightByLanguage(openingTag, 'html')
        result += highlightByLanguage(
            code.slice(contentStart, contentEnd),
            getVueBlockLanguage(blockName, attributes),
        )
        result += highlightByLanguage(closingTag, 'html')
        cursor = index + block.length
    }

    return result + highlightByLanguage(code.slice(cursor), 'html')
}

const highlightedCode = computed(() => {
    return props.language === 'vue'
        ? highlightVueSfc(props.code)
        : highlightByLanguage(props.code, props.language)
})
</script>

<template>
    <pre
        class="documentation-code-block"
        tabindex="0"
        aria-label="Code example"
    ><code :class="`language-${language}`" v-html="highlightedCode"></code></pre>
</template>

<style scoped lang="scss">
.documentation-code-block {
    margin: 0;
    overflow: auto;
    padding: 20px;

    code {
        color: var(--h0n-ui-color-text);
        font:
            0.8rem/1.7 'SFMono-Regular',
            Consolas,
            'Liberation Mono',
            monospace;
    }

    :deep(.hljs-tag),
    :deep(.hljs-keyword),
    :deep(.hljs-selector-tag) {
        color: var(--h0n-ui-color-primary);
    }

    :deep(.hljs-attr),
    :deep(.hljs-property),
    :deep(.hljs-variable) {
        color: var(--h0n-ui-color-info-text);
    }

    :deep(.hljs-string),
    :deep(.hljs-number),
    :deep(.hljs-literal) {
        color: var(--h0n-ui-color-success);
    }

    :deep(.hljs-comment) {
        color: var(--h0n-ui-color-muted);
    }
}
</style>
