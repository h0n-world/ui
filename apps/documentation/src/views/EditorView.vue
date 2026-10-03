<script setup lang="ts">
import { H0Button, H0Dropdown, H0Select } from '@h0nio/ui'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import SystemHeader from '@/components/system/SystemHeader.vue'
import CodeEditor from '@/editor/CodeEditor.vue'
import {
    draftKey,
    legacyDraftKey,
    starterFiles,
    validateProject,
    type EditorFiles,
    type EditorFilename,
} from '@/editor/project'
import { createEditorToken } from '@/editor/random'
import type { EditorDiagnostic } from '@/editor/language-types'

const files = ref<EditorFiles>({ ...starterFiles })
const active = ref<EditorFilename>('App.vue')
const source = computed({
    get: () => files.value[active.value],
    set: (value) => {
        files.value[active.value] = value
    },
})
const theme = ref<'light' | 'dark'>('light')
const width = ref('100%')
const preview = ref('')
const frame = ref<HTMLIFrameElement>()
const importInput = ref<HTMLInputElement>()
const codeEditor = ref<InstanceType<typeof CodeEditor>>()
const busy = ref(false)
const status = ref('Ready to run')
const error = ref('')
const storageStatus = ref('Draft saved on this device')
const checkStatus = ref('Loading local language tools…')
const diagnostics = ref<EditorDiagnostic[]>([])
const logs = ref<{ kind: string; message: string }[]>([])
const resetArmed = ref(false)
const sampleArmed = ref(false)
const legacyAvailable = ref(false)
const sample = ref('')
const sampleSources = import.meta.glob('../examples/components/{button,input,card,modal}/*.vue', {
    query: '?raw',
    import: 'default',
})
const sampleOptions = Object.keys(sampleSources).map((path) => ({
    value: path,
    label: path.split('/').slice(-2).join(' / ').replace('.vue', ''),
}))
const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
]
const widthOptions = [
    { value: '100%', label: 'Responsive' },
    { value: '375px', label: '375 px' },
    { value: '768px', label: '768 px' },
]
let runId = 0
let sampleRequest = 0
let token = ''
let renderedSource = ''
let saveTimer: ReturnType<typeof setTimeout> | undefined
let readyTimer: ReturnType<typeof setTimeout> | undefined

function save() {
    try {
        const project = validateProject(files.value)
        localStorage.setItem(
            draftKey,
            JSON.stringify({ version: 2, files: project, active: active.value }),
        )
        storageStatus.value = 'Draft saved on this device'
    } catch (reason) {
        storageStatus.value = `Draft not saved: ${reason instanceof Error ? reason.message : String(reason)}`
    }
}
watch(
    files,
    () => {
        status.value = 'Changes waiting to run'
        resetArmed.value = false
        sampleArmed.value = false
        clearTimeout(saveTimer)
        saveTimer = setTimeout(save, 400)
    },
    { deep: true },
)
watch(active, () => {
    clearTimeout(saveTimer)
    saveTimer = setTimeout(save, 400)
})
watch(sample, () => {
    sampleArmed.value = false
    ++sampleRequest
})

async function run() {
    const currentRun = ++runId
    busy.value = true
    error.value = ''
    logs.value = []
    status.value = 'Compiling…'
    clearTimeout(readyTimer)
    try {
        const [{ compileProject }, { createPreview }] = await Promise.all([
            import('@/editor/compiler'),
            import('@/editor/preview'),
        ])
        const snapshot = JSON.stringify(files.value)
        const project = compileProject(files.value)
        const currentToken = createEditorToken()
        const html = await createPreview(project, theme.value, currentToken)
        if (currentRun !== runId) return
        token = currentToken
        renderedSource = snapshot
        preview.value = html
        status.value = 'Starting preview…'
        readyTimer = setTimeout(() => {
            status.value = 'Preview did not respond. Try running again.'
        }, 10000)
    } catch (reason) {
        if (currentRun !== runId) return
        error.value = reason instanceof Error ? reason.message : String(reason)
        status.value = 'Compilation failed; previous preview retained'
    } finally {
        if (currentRun === runId) busy.value = false
    }
}
function receive(event: MessageEvent) {
    if (event.source !== frame.value?.contentWindow || event.origin !== 'null') return
    const data = event.data
    if (
        !data ||
        data.channel !== 'h0-editor' ||
        data.token !== token ||
        typeof data.message !== 'string'
    )
        return
    if (data.kind === 'ready') {
        clearTimeout(readyTimer)
        status.value = logs.value.some((item) => item.kind === 'error')
            ? 'Preview has errors'
            : JSON.stringify(files.value) !== renderedSource
              ? 'Changes waiting to run'
              : 'Preview ready'
        return
    }
    if (!['log', 'warn', 'error'].includes(data.kind)) return
    logs.value = [
        ...logs.value.slice(-49),
        { kind: data.kind, message: data.message.slice(0, 3000) },
    ]
    if (data.kind === 'error') {
        clearTimeout(readyTimer)
        status.value = 'Preview has errors'
    }
}
function reset() {
    if (!resetArmed.value) {
        resetArmed.value = true
        return
    }
    ++sampleRequest
    files.value = { ...starterFiles }
    active.value = 'App.vue'
    sample.value = ''
    resetArmed.value = false
    save()
    void run()
}
async function loadSample() {
    if (!sample.value) return
    if (!sampleArmed.value) {
        sampleArmed.value = true
        return
    }
    const request = ++sampleRequest
    try {
        const raw = await sampleSources[sample.value]?.()
        if (typeof raw !== 'string' || request !== sampleRequest) return
        const { compileProject } = await import('@/editor/compiler')
        compileProject({ ...files.value, 'App.vue': raw })
        if (request !== sampleRequest) return
        files.value['App.vue'] = raw
        active.value = 'App.vue'
        sampleArmed.value = false
        error.value = ''
    } catch (reason) {
        if (request === sampleRequest) error.value = String(reason)
    }
}
function downloadJson(content: string, filename: string) {
    const url = URL.createObjectURL(new Blob([content], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
}
function exportProject() {
    downloadJson(
        JSON.stringify({ version: 2, files: files.value }, null, 2),
        'h0n-editor-project.json',
    )
}
function exportLegacy() {
    try {
        const saved = localStorage.getItem(legacyDraftKey)
        if (saved) downloadJson(saved, 'h0n-editor-legacy-project.json')
    } catch {
        error.value = 'Could not read the legacy draft.'
    }
}
async function importProject(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return
    try {
        if (file.size > 1_000_000) throw new Error('Project file is too large.')
        const parsed = JSON.parse(await file.text())
        if (parsed.version !== 2)
            throw new Error(
                'This editor uses project version 2 with App.vue and style.css. Adapt legacy multi-file projects before importing.',
            )
        const imported = validateProject(parsed.files)
        ++sampleRequest
        files.value = imported
        active.value = 'App.vue'
        error.value = ''
        status.value = 'Project imported. Review the code, then Run.'
        save()
    } catch (reason) {
        error.value = reason instanceof Error ? reason.message : String(reason)
    }
    input.value = ''
}
async function focusDiagnostic(item: EditorDiagnostic) {
    active.value = 'App.vue'
    await nextTick()
    codeEditor.value?.focusDiagnostic(item.from)
}
function diagnosticLocation(item: EditorDiagnostic) {
    const lines = files.value['App.vue'].slice(0, item.from).split('\n')
    return `${lines.length}:${(lines.at(-1)?.length ?? 0) + 1}`
}
onMounted(() => {
    window.addEventListener('message', receive)
    try {
        legacyAvailable.value = !!localStorage.getItem(legacyDraftKey)
        const saved = localStorage.getItem(draftKey)
        if (saved) {
            const parsed = JSON.parse(saved)
            if (parsed.version !== 2) throw new Error('Unsupported saved draft')
            files.value = validateProject(parsed.files)
            if (parsed.active === 'App.vue' || parsed.active === 'style.css')
                active.value = parsed.active
            status.value = 'Draft restored. Run to preview.'
        } else void run()
    } catch {
        storageStatus.value = 'Saved draft unavailable. Export your work to keep a copy.'
    }
})
onBeforeUnmount(() => {
    ++runId
    ++sampleRequest
    clearTimeout(saveTimer)
    clearTimeout(readyTimer)
    save()
    window.removeEventListener('message', receive)
})
</script>

<template>
    <div class="editor-page">
        <SystemHeader minimal show-primary />
        <main class="editor-main">
            <div class="editor-heading">
                <div>
                    <span class="editor-badge">Experimental</span>
                    <h1>Component editor</h1>
                    <p>Try H0N UI components in App.vue and style.css.</p>
                </div>
                <div class="editor-actions">
                    <H0Dropdown
                        aria-label="Project actions"
                        placement="bottom-end"
                        :min-width="220"
                    >
                        <H0Button variant="outline">Project</H0Button>
                        <template #content="{ close }">
                            <div class="project-actions">
                                <H0Button
                                    variant="ghost"
                                    @click="
                                        () => {
                                            exportProject()
                                            close()
                                        }
                                    "
                                    >Export</H0Button
                                >
                                <H0Button
                                    variant="ghost"
                                    @click="
                                        () => {
                                            importInput?.click()
                                            close()
                                        }
                                    "
                                    >Import JSON</H0Button
                                >
                                <H0Button
                                    v-if="legacyAvailable"
                                    variant="ghost"
                                    @click="
                                        () => {
                                            exportLegacy()
                                            close()
                                        }
                                    "
                                    >Export previous draft</H0Button
                                >
                            </div>
                        </template>
                    </H0Dropdown>
                    <input
                        ref="importInput"
                        class="project-import"
                        type="file"
                        accept=".json,application/json"
                        aria-label="Import project JSON"
                        @change="importProject"
                    />
                    <H0Button variant="ghost" @click="reset">{{
                        resetArmed ? 'Confirm reset' : 'Reset'
                    }}</H0Button>
                    <H0Button :disabled="busy" @click="run">{{
                        busy ? 'Compiling…' : 'Run'
                    }}</H0Button>
                </div>
            </div>
            <p class="editor-note">
                Two files · Local type checking · No external packages or network access in preview
                · Run with Ctrl / ⌘ + Enter.
            </p>
            <div class="editor-workspace">
                <section class="editor-code" aria-label="Project source">
                    <div class="panel-toolbar file-tabs" aria-label="Editor files">
                        <H0Button
                            v-for="name in ['App.vue', 'style.css'] as const"
                            :key="name"
                            size="sm"
                            :variant="active === name ? 'solid' : 'ghost'"
                            :aria-pressed="active === name"
                            @click="active = name"
                            >{{ name }}</H0Button
                        >
                        <span class="check-status" role="status">{{ checkStatus }}</span>
                    </div>
                    <CodeEditor
                        ref="codeEditor"
                        v-model="source"
                        :filename="active"
                        :app-source="files['App.vue']"
                        @run="run"
                        @diagnostics="diagnostics = $event"
                        @check-status="checkStatus = $event"
                    />
                    <div class="panel-footer">
                        {{ active }} · {{ source.length.toLocaleString() }} characters
                        <span>{{ storageStatus }}</span>
                    </div>
                </section>
                <section class="editor-preview" aria-label="Live preview">
                    <div class="panel-toolbar preview-toolbar">
                        <strong>Preview</strong>
                        <H0Select
                            class="theme-select"
                            placeholder="Preview theme"
                            :model-value="theme"
                            :options="themeOptions"
                            size="sm"
                            aria-label="Preview theme"
                            @update:model-value="
                                (value) => {
                                    if (value === 'light' || value === 'dark') theme = value
                                }
                            "
                        />
                        <H0Select
                            class="width-select"
                            placeholder="Preview width"
                            :model-value="width"
                            :options="widthOptions"
                            size="sm"
                            aria-label="Preview width"
                            @update:model-value="
                                (value) => {
                                    if (typeof value === 'string') width = value
                                }
                            "
                        />
                    </div>
                    <div class="preview-stage">
                        <iframe
                            v-if="preview"
                            ref="frame"
                            :srcdoc="preview"
                            :style="{ width }"
                            title="H0N UI component preview"
                            sandbox="allow-scripts"
                            referrerpolicy="no-referrer"
                        />
                        <div v-else class="preview-empty">Run your code to see the result.</div>
                    </div>
                    <div class="panel-footer" role="status">
                        {{ status }}<span>Theme changes apply on Run</span>
                    </div>
                </section>
            </div>
            <p v-if="error" class="editor-error" role="alert">{{ error }}</p>
            <div class="editor-output">
                <details class="editor-diagnostics" :open="diagnostics.length > 0">
                    <summary>TypeScript &amp; Vue · {{ diagnostics.length }} issues</summary>
                    <p v-if="!diagnostics.length">{{ checkStatus }}</p>
                    <ul v-else>
                        <li v-for="(item, index) in diagnostics" :key="index">
                            <H0Button size="sm" variant="ghost" @click="focusDiagnostic(item)"
                                >App.vue {{ diagnosticLocation(item) }}</H0Button
                            ><span>{{ item.message }}</span>
                        </li>
                    </ul>
                </details>
                <details class="editor-console" :open="logs.some((item) => item.kind === 'error')">
                    <summary>Console · {{ logs.length }} messages</summary>
                    <p v-if="!logs.length">No messages.</p>
                    <pre v-for="(item, index) in logs" :key="index" :class="item.kind"
                        >{{ item.kind }}: {{ item.message }}</pre>
                </details>
            </div>
            <div class="editor-extras">
                <H0Select
                    class="sample-select"
                    label="Documentation example"
                    :model-value="sample"
                    :options="sampleOptions"
                    size="sm"
                    placeholder="Select an example"
                    aria-label="Documentation example"
                    @update:model-value="
                        (value) => {
                            if (typeof value === 'string') sample = value
                        }
                    "
                />
                <H0Button :disabled="!sample" variant="outline" @click="loadSample">{{
                    sampleArmed ? 'Replace App.vue' : 'Load example'
                }}</H0Button>
                <p>
                    style.css is included automatically. Imports: <code>vue</code>,
                    <code>@h0nio/ui</code>, <code>@h0nio/ui/icons</code>. Ctrl / ⌘ + Space opens
                    suggestions. TypeScript and Vue template errors are shown as you edit; Run
                    remains available for experiments. SCSS is unavailable. Import only code you
                    trust.
                </p>
            </div>
        </main>
    </div>
</template>

<style scoped>
.editor-page {
    min-height: 100vh;
    color: var(--h0n-ui-color-text);
}
.editor-main {
    max-width: 1600px;
    margin: auto;
    padding: 24px;
}
.editor-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}
h1 {
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    margin: 8px 0;
    letter-spacing: -0.04em;
}
p {
    margin: 8px 0;
    color: var(--h0n-ui-color-text-secondary);
    line-height: 1.6;
}
.editor-badge {
    font-size: 12px;
    padding: 4px 8px;
    border-radius: var(--h0n-ui-radius-sm);
    background: var(--h0n-ui-color-secondary);
}
.editor-actions,
.panel-toolbar,
.editor-extras {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}
.editor-note {
    font-size: 13px;
    margin: 18px 0;
}
.editor-workspace {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 16px;
}
.editor-code,
.editor-preview {
    border: 1px solid var(--h0n-ui-color-border);
    border-radius: var(--h0n-ui-radius-md);
    overflow: hidden;
    min-width: 0;
    display: flex;
    flex-direction: column;
}
.panel-toolbar {
    padding: 12px;
    border-bottom: 1px solid var(--h0n-ui-color-border);
    min-height: 76px;
    box-sizing: border-box;
}
.panel-toolbar strong {
    margin-inline-end: auto;
}
.check-status {
    font-size: 11px;
    margin-inline-start: auto;
    color: var(--h0n-ui-color-text-secondary);
}
.theme-select {
    width: 110px;
}
.width-select {
    width: 155px;
}
.sample-select {
    width: 300px;
    max-width: 100%;
}
.project-import {
    display: none;
}
.project-actions {
    display: grid;
    gap: 4px;
}
.project-actions :deep(.h-button) {
    justify-content: flex-start;
}
.panel-footer {
    padding: 10px 12px;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
    font-size: 11px;
    color: var(--h0n-ui-color-text-secondary);
    border-top: 1px solid var(--h0n-ui-color-border);
}
.preview-stage {
    flex: 1;
    min-height: 520px;
    background: var(--h0n-ui-color-secondary);
    overflow: auto;
    display: flex;
}
iframe {
    border: 0;
    min-height: 520px;
    flex-shrink: 0;
    display: block;
    margin: auto;
    background: transparent;
}
.preview-empty {
    margin: auto;
    padding: 24px;
    text-align: center;
}
.editor-error {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    border: 1px solid var(--h0n-ui-color-border);
    padding: 16px;
}
.editor-output {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: start;
    gap: 16px;
    margin-top: 16px;
}
.editor-console,
.editor-diagnostics {
    min-width: 0;
    border: 1px solid var(--h0n-ui-color-border);
    padding: 12px;
    border-radius: var(--h0n-ui-radius-sm);
}
summary {
    cursor: pointer;
    font-size: 13px;
}
.editor-console pre {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    font-size: 12px;
}
.editor-diagnostics ul {
    list-style: none;
    padding: 0;
    margin: 12px 0 0;
}
.editor-diagnostics li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 12px;
    margin: 8px 0;
    overflow-wrap: anywhere;
}
.editor-diagnostics li > span {
    flex: 1;
    min-width: 0;
    white-space: pre-wrap;
}
.editor-extras {
    margin-top: 18px;
}
.editor-extras p {
    flex-basis: 100%;
    font-size: 13px;
}
@media (max-width: 1024px) {
    .editor-output {
        grid-template-columns: minmax(0, 1fr);
    }
}
@media (max-width: 900px) {
    .editor-workspace {
        grid-template-columns: minmax(0, 1fr);
    }
    .editor-heading {
        align-items: flex-start;
        flex-direction: column;
    }
    .editor-main {
        padding: 16px;
    }
}
</style>
