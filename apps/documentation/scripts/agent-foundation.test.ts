import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { h0ComponentManifest } from '../../../packages/ui/src/manifest.ts'
import { renderAgentArtifacts } from '../src/content/agent/artifacts.ts'
import { expandComponentApiDirectives, renderComponentApiSection } from '../src/content/agent/directives.ts'
import { resolveRelatedComponentLinks } from '../src/content/agent/related.ts'
import { componentAgentRecords } from '../src/content/agent/records/index.ts'
import { getManifestMetadata, validateComponentAgentRecords } from '../src/content/agent/schema.ts'

const documentationRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const packageVersion = (JSON.parse(readFileSync(resolve(documentationRoot, '../../packages/ui/package.json'), 'utf8')) as { version: string }).version
const buttonRecord = componentAgentRecords.find((record) => record.component === 'H0Button')!
const buttonGroupRecord = componentAgentRecords.find((record) => record.component === 'H0ButtonGroup')!
const accordionRecord = componentAgentRecords.find((record) => record.component === 'H0Accordion')!
const alertRecord = componentAgentRecords.find((record) => record.component === 'H0Alert')!
const carouselRecord = componentAgentRecords.find((record) => record.component === 'H0Carousel')!
const dataTableRecord = componentAgentRecords.find((record) => record.component === 'H0DataTable')!
const infiniteScrollRecord = componentAgentRecords.find((record) => record.component === 'H0InfiniteScroll')!
const listItemRecord = componentAgentRecords.find((record) => record.component === 'H0ListItem')!
const toolbarRecord = componentAgentRecords.find((record) => record.component === 'H0Toolbar')!
const toolbarItemRecord = componentAgentRecords.find((record) => record.component === 'H0ToolbarItem')!
const tableRecord = componentAgentRecords.find((record) => record.component === 'H0Table')!
const toastRecord = componentAgentRecords.find((record) => record.component === 'H0Toast')!
const toastsRecord = componentAgentRecords.find((record) => record.component === 'H0Toasts')!
const checkboxRecord = componentAgentRecords.find((record) => record.component === 'H0Checkbox')!
const checkboxGroupRecord = componentAgentRecords.find((record) => record.component === 'H0CheckboxGroup')!
const radioRecord = componentAgentRecords.find((record) => record.component === 'H0Radio')!
const radioGroupRecord = componentAgentRecords.find((record) => record.component === 'H0RadioGroup')!
const containerRecord = componentAgentRecords.find((record) => record.component === 'H0Container')!
const gridRecord = componentAgentRecords.find((record) => record.component === 'H0Grid')!
const scrollAreaRecord = componentAgentRecords.find((record) => record.component === 'H0ScrollArea')!
const breadcrumbsRecord = componentAgentRecords.find((record) => record.component === 'H0Breadcrumbs')!
const segmentRecord = componentAgentRecords.find((record) => record.component === 'H0Segment')!
const sideNavRecord = componentAgentRecords.find((record) => record.component === 'H0SideNav')!
const sideNavItemRecord = componentAgentRecords.find((record) => record.component === 'H0SideNavItem')!
const tabsRecord = componentAgentRecords.find((record) => record.component === 'H0Tabs')!
const tabPanelRecord = componentAgentRecords.find((record) => record.component === 'H0TabPanel')!

test('component API directives render complete sections', () => {
    assert.match(renderComponentApiSection(buttonRecord, 'imports'), /H0ButtonProps/)
    assert.match(renderComponentApiSection(buttonRecord, 'props'), /rootAttrs/)
    assert.match(renderComponentApiSection(buttonRecord, 'events'), /MouseEvent/)
    assert.match(renderComponentApiSection(buttonRecord, 'slots'), /default/)
    assert.match(renderComponentApiSection(buttonRecord, 'exposed'), /No public imperative API/)
    assert.match(renderComponentApiSection(buttonGroupRecord, 'type H0ButtonGroupItem'), /loadingText/)
    assert.match(renderComponentApiSection(accordionRecord, 'imports'), /H0AccordionProps/)
    assert.match(renderComponentApiSection(accordionRecord, 'props'), /defaultOpen/)
    assert.match(renderComponentApiSection(accordionRecord, 'slots'), /open: boolean/)
    assert.match(renderComponentApiSection(accordionRecord, 'type H0AccordionItem'), /question/)
    assert.match(renderComponentApiSection(carouselRecord, 'props'), /hideInactiveSlidesFromAccessibility/)
    assert.match(renderComponentApiSection(carouselRecord, 'exposed'), /goTo/)
    assert.match(renderComponentApiSection(dataTableRecord, 'props'), /paginationMode/)
    assert.match(renderComponentApiSection(dataTableRecord, 'events'), /load-more/)
    assert.match(renderComponentApiSection(dataTableRecord, 'type H0DataTableColumn'), /filterPredicate/)
    assert.match(renderComponentApiSection(infiniteScrollRecord, 'slots'), /complete/)
    assert.match(renderComponentApiSection(tableRecord, 'type H0TableColumn'), /ariaSort/)
    assert.match(renderComponentApiSection(alertRecord, 'events'), /action/)
    assert.match(renderComponentApiSection(toastRecord, 'type H0ToastService'), /dismissAll/)
    assert.match(renderComponentApiSection(toastsRecord, 'props'), /maxVisible/)
    assert.match(renderComponentApiSection(toolbarRecord, 'imports'), /H0ToolbarProps/)
    assert.match(renderComponentApiSection(toolbarRecord, 'props'), /orientation/)
    assert.match(renderComponentApiSection(toolbarRecord, 'events'), /H0ToolbarItemDefinition/)
    assert.match(renderComponentApiSection(toolbarRecord, 'slots'), /index: number/)
    assert.match(renderComponentApiSection(toolbarRecord, 'type H0ToolbarItemDefinition'), /pressed/)
    assert.match(
        expandComponentApiDirectives(':::component-api component H0ToolbarItem events\n:::', '/components/toolbar', toolbarRecord, componentAgentRecords),
        /select/,
    )
    assert.match(
        expandComponentApiDirectives(':::component-api component H0ToolbarSeparator imports\n:::', '/components/toolbar', toolbarRecord, componentAgentRecords),
        /H0ToolbarSeparator/,
    )
    assert.match(expandComponentApiDirectives(':::component-api component H0ListItem slots\n:::', '/components/list', listItemRecord, componentAgentRecords), /description/)
    assert.match(renderComponentApiSection(checkboxRecord, 'props'), /indeterminate/)
    assert.match(renderComponentApiSection(checkboxGroupRecord, 'type H0CheckboxOption'), /disabled/)
    assert.match(renderComponentApiSection(radioRecord, 'exposed'), /validate/)
    assert.match(renderComponentApiSection(radioGroupRecord, 'type H0RadioOption'), /description/)
    assert.match(renderComponentApiSection(gridRecord, 'type H0GridVariant'), /sidebar-left/)
    assert.match(renderComponentApiSection(scrollAreaRecord, 'exposed'), /scrollTo/)
    assert.match(renderComponentApiSection(containerRecord, 'props'), /gutter/)
    assert.match(renderComponentApiSection(containerRecord, 'type H0ResponsiveValue'), /base/)
    assert.match(renderComponentApiSection(breadcrumbsRecord, 'type H0BreadcrumbItem'), /disabled/)
    assert.match(renderComponentApiSection(segmentRecord, 'type H0SegmentItem'), /icon/)
    assert.match(expandComponentApiDirectives(':::component-api component H0SideNavItem props\n:::', '/components/sidenav', sideNavRecord, componentAgentRecords), /indicator/)
    assert.match(renderComponentApiSection(tabsRecord, 'type H0TabItem'), /disabled/)
    assert.match(renderComponentApiSection(tabsRecord, 'props'), /mountMode/)
    assert.match(renderComponentApiSection(tabPanelRecord, 'props'), /value/)
})

test('unknown directives, type tables, and missing records fail strictly', () => {
    assert.throws(() => renderComponentApiSection(buttonRecord, 'methods'), /Unknown component-api section/)
    assert.throws(() => renderComponentApiSection(buttonRecord, 'type MissingType'), /Unknown type table/)
    assert.throws(() => expandComponentApiDirectives(':::component-api props\n:::', '/components/missing'), /no typed component record/)
    assert.throws(
        () => expandComponentApiDirectives(':::component-api component H0Missing props\n:::', '/components/toolbar', toolbarRecord, componentAgentRecords),
        /Unknown family component/,
    )
})

test('all component page API directives resolve against their current family records', () => {
    const pagesDirectory = join(documentationRoot, 'src', 'content', 'pages', 'components')

    for (const file of readdirSync(pagesDirectory).filter((name) => name.endsWith('.md'))) {
        const source = readFileSync(join(pagesDirectory, file), 'utf8')
        const pagePath = source.match(/^path:\s*(.+)$/m)?.[1]
        if (!pagePath) continue
        const records = componentAgentRecords.filter((record) => getManifestMetadata(record, h0ComponentManifest).docsPath === pagePath)
        const root = records.find((record) => !getManifestMetadata(record, h0ComponentManifest).docsAnchor)
        assert.doesNotThrow(() => expandComponentApiDirectives(source, pagePath, root, records), file)
    }
})

test('related component links resolve through manifest metadata', () => {
    assert.deepEqual(resolveRelatedComponentLinks(buttonRecord, componentAgentRecords, h0ComponentManifest), [
        { component: 'H0Icon', name: 'Icon', path: '/components/icon' },
        { component: 'H0ButtonGroup', name: 'ButtonGroup', path: '/components/buttongroup' },
        { component: 'H0Segment', name: 'Segment', path: '/components/segment' },
    ])
})

test('family members share a route and receive deterministic deep-link metadata', () => {
    const rootMetadata = getManifestMetadata(toolbarRecord, h0ComponentManifest)
    const itemMetadata = getManifestMetadata(toolbarItemRecord, h0ComponentManifest)
    const containerMetadata = getManifestMetadata(containerRecord, h0ComponentManifest)
    const sideNavMetadata = getManifestMetadata(sideNavRecord, h0ComponentManifest)
    const sideNavItemMetadata = getManifestMetadata(sideNavItemRecord, h0ComponentManifest)
    const tabsMetadata = getManifestMetadata(tabsRecord, h0ComponentManifest)
    const tabPanelMetadata = getManifestMetadata(tabPanelRecord, h0ComponentManifest)

    assert.deepEqual({ familyRole: rootMetadata.familyRole, docsPath: rootMetadata.docsPath, docsAnchor: rootMetadata.docsAnchor }, { familyRole: 'root', docsPath: '/components/toolbar', docsAnchor: undefined })
    assert.deepEqual({ familyRole: itemMetadata.familyRole, docsPath: itemMetadata.docsPath, docsAnchor: itemMetadata.docsAnchor }, { familyRole: 'member', docsPath: '/components/toolbar', docsAnchor: 'h0toolbaritem' })
    assert.deepEqual({ familyRole: containerMetadata.familyRole, docsPath: containerMetadata.docsPath, docsAnchor: containerMetadata.docsAnchor }, { familyRole: 'root', docsPath: '/components/layout', docsAnchor: undefined })
    assert.deepEqual({ familyRole: sideNavMetadata.familyRole, docsPath: sideNavMetadata.docsPath, docsAnchor: sideNavMetadata.docsAnchor }, { familyRole: 'root', docsPath: '/components/sidenav', docsAnchor: undefined })
    assert.deepEqual({ familyRole: sideNavItemMetadata.familyRole, docsPath: sideNavItemMetadata.docsPath, docsAnchor: sideNavItemMetadata.docsAnchor }, { familyRole: 'member', docsPath: '/components/sidenav', docsAnchor: 'h0sidenavitem' })
    assert.deepEqual({ familyRole: tabsMetadata.familyRole, docsPath: tabsMetadata.docsPath, docsAnchor: tabsMetadata.docsAnchor }, { familyRole: 'root', docsPath: '/components/tabs', docsAnchor: undefined })
    assert.deepEqual({ familyRole: tabPanelMetadata.familyRole, docsPath: tabPanelMetadata.docsPath, docsAnchor: tabPanelMetadata.docsAnchor }, { familyRole: 'member', docsPath: '/components/tabs', docsAnchor: 'h0tabpanel' })
})

test('record validation reports duplicates and invalid relationships', () => {
    const context = {
        manifest: h0ComponentManifest,
        pagePaths: [
            '/components/accordion', '/components/alert', '/components/avatar', '/components/badge', '/components/button', '/components/buttongroup', '/components/card', '/components/carousel', '/components/cellcolorpicker', '/components/chip', '/components/command', '/components/contentstate',
            '/components/checkbox', '/components/datatable', '/components/description', '/components/emptystate', '/components/errormessage', '/components/field', '/components/fileupload', '/components/form', '/components/icon', '/components/image', '/components/imageupload', '/components/infinitescroll', '/components/input', '/components/inputotp', '/components/label', '/components/list',
            '/components/grid', '/components/layout', '/components/message', '/components/numberinput', '/components/passwordinput', '/components/radio', '/components/ripple', '/components/scrollarea', '/components/searchfield', '/components/select', '/components/skeleton', '/components/spinner', '/components/switch', '/components/table', '/components/textarea', '/components/toast', '/components/toolbar', '/components/typography',
            '/components/breadcrumbs', '/components/link', '/components/pagination', '/components/segment', '/components/sidenav', '/components/stepper', '/components/tabs',
            '/components/alertdialog', '/components/drawer', '/components/modal', '/components/sheet', '/components/tooltip',
        ],
        exampleKeys: componentAgentRecords.flatMap((record) => record.examples.map((example) => example.key)),
    }
    assert.doesNotThrow(() => validateComponentAgentRecords(componentAgentRecords, context))
    assert.throws(() => validateComponentAgentRecords([buttonRecord, buttonRecord], context), /Duplicate component record/)
    assert.throws(
        () => validateComponentAgentRecords(componentAgentRecords.filter((record) => record.component !== 'H0ButtonGroup'), context),
        /Manifest component "H0ButtonGroup" has no typed agent record/,
    )
    assert.throws(
        () => validateComponentAgentRecords(componentAgentRecords.map((record) => record.component === 'H0Button' ? { ...record, relatedComponents: ['H0Missing'] } : record), context),
        /unknown related component/,
    )
    assert.throws(
        () => validateComponentAgentRecords(componentAgentRecords.map((record) => record.component === 'H0Button' ? { ...record, useWhen: [] } : record), context),
        /H0Button is missing useWhen guidance/,
    )
})

test('generation is deterministic and committed snapshots are current', () => {
    const first = renderAgentArtifacts(componentAgentRecords, h0ComponentManifest, packageVersion)
    const second = renderAgentArtifacts(componentAgentRecords, h0ComponentManifest, packageVersion)
    assert.deepEqual(first, second)

    const llms = first.find((artifact) => artifact.path === 'llms.txt')!.content
    const agents = first.find((artifact) => artifact.path === 'agents/AGENTS.md')!.content
    const installPrompt = first.find((artifact) => artifact.path === 'agents/install-prompt.md')!.content
    assert.equal(first.length, 4)
    assert.match(llms, new RegExp(`^# H0N UI ${packageVersion.replaceAll('.', '\\.')}$`, 'm'))
    assert.match(llms, new RegExp(`^## Supported components \\(${componentAgentRecords.length}\\)$`, 'm'))
    assert.doesNotMatch(llms, /Migrated components/)
    assert.match(llms, /^### (Actions|Forms|Navigation|Overlays|Feedback|Data|Layout|Content)$/m)
    assert.match(llms, /Paths in this file are relative to the H0N UI documentation origin/)
    assert.match(llms, /AI installation prompt/)
    assert.match(agents, /installed `@h0nio\/ui` package version and TypeScript declarations/)
    assert.match(agents, /Preserve `modelValue` \/ `update:modelValue`/)
    assert.match(agents, /Use `defaultValue` only for uncontrolled initialization/)
    assert.match(agents, /Do not add or reference `@h0n\/icon`/)
    assert.match(agents, /Initial installation/)
    assert.match(installPrompt, new RegExp(`@h0nio\/ui@${packageVersion.replaceAll('.', '\\.')}`))
    assert.match(installPrompt, /Vue 3\.5 or newer/)
    assert.match(installPrompt, /@h0nio\/ui\/style\.css/)
    assert.match(installPrompt, /Do not claim completion when typecheck or build fails/)

    for (const artifact of first) {
        assert.equal(readFileSync(join(documentationRoot, 'public', artifact.path), 'utf8'), artifact.content)
    }
})
