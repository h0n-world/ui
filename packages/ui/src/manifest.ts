export type H0ComponentCategory = 'actions' | 'content' | 'data' | 'feedback' | 'forms' | 'layout' | 'navigation' | 'overlays'
export type H0ComponentDocumentationSection = 'accessibility' | 'css' | 'events' | 'expose' | 'imports' | 'performance' | 'props' | 'slots'
export type H0ComponentManifestEntry = {
    name: `H0${string}`
    family: string
    slug: string
    docsSlug: string
    category: H0ComponentCategory
    styleEntry: `components/${string}/style.css`
    localeSection?: string
    documentation: readonly H0ComponentDocumentationSection[]
    axe: boolean
    familyRoot?: boolean
}

const baseEntries = [
    ['Accordion','accordion','content'],['Alert','alert','feedback'],['AlertDialog','alertdialog','overlays'],['Avatar','avatar','content'],['Badge','badge','content'],['Breadcrumbs','breadcrumbs','navigation'],['Button','button','actions'],['ButtonGroup','buttongroup','actions'],['Card','card','content'],['Carousel','carousel','content'],['CellColorPicker','cellcolorpicker','forms'],['Checkbox','checkbox','forms'],['CheckboxGroup','checkboxgroup','forms'],['Chip','chip','content'],['Command','command','overlays'],['DataTable','datatable','data'],['Drawer','drawer','overlays'],['EmptyState','emptystate','feedback'],['Field','field','forms'],['Form','form','forms'],['Grid','grid','layout'],['Icon','icon','content'],['Image','image','content'],['ImageUpload','imageupload','forms'],['InfiniteScroll','infinitescroll','data'],['Inline','inline','layout'],['Input','input','forms'],['InputOTP','inputotp','forms'],['Link','link','navigation'],['List','list','content'],['ListItem','listitem','content'],['Container','container','layout'],['Divider','divider','layout'],['Spacer','spacer','layout'],['Stack','stack','layout'],['Modal','modal','overlays'],['Pagination','pagination','navigation'],['Radio','radio','forms'],['RadioGroup','radiogroup','forms'],['Ripple','ripple','feedback'],['ScrollArea','scrollarea','layout'],['SearchField','searchfield','forms'],['Segment','segment','navigation'],['Select','select','forms'],['Sheet','sheet','overlays'],['Skeleton','skeleton','feedback'],['Spinner','spinner','feedback'],['Stepper','stepper','navigation'],['Switch','switch','forms'],['Tab','tab','navigation'],['Table','table','data'],['TabList','tablist','navigation'],['TabPanel','tabpanel','navigation'],['Tabs','tabs','navigation'],['Textarea','textarea','forms'],['Toast','toast','feedback'],['Toasts','toasts','feedback'],['Tooltip','tooltip','overlays'],['Typography','typography','content'],['Description','description','content'],['ErrorMessage','errormessage','content'],['Label','label','content'],['Message','message','content']
] as const

const tierBEntries = [
    ['FileUpload', 'fileupload', 'forms'], ['NumberInput', 'numberinput', 'forms'], ['PasswordInput', 'passwordinput', 'forms'],
    ['SideNav', 'sidenav', 'navigation'], ['SideNavGroup', 'sidenavgroup', 'navigation'], ['SideNavItem', 'sidenavitem', 'navigation'],
    ['Toolbar', 'toolbar', 'actions'], ['ToolbarGroup', 'toolbargroup', 'actions'], ['ToolbarItem', 'toolbaritem', 'actions'], ['ToolbarSeparator', 'toolbarseparator', 'actions'],
] as const

const entries = [...baseEntries, ...tierBEntries] as const

const familyOverrides: Record<string, string> = {
    AlertDialog: 'Alert', CheckboxGroup: 'Checkbox',
    Container: 'Layout', Divider: 'Layout', Inline: 'Layout', Spacer: 'Layout', Stack: 'Layout', Tab: 'Tabs', TabList: 'Tabs', TabPanel: 'Tabs',
    Description: 'Typography', ErrorMessage: 'Typography', Label: 'Typography', Message: 'Typography', ListItem: 'List', RadioGroup: 'Radio', Toasts: 'Toast',
    SideNavGroup: 'SideNav', SideNavItem: 'SideNav', ToolbarGroup: 'Toolbar', ToolbarItem: 'Toolbar', ToolbarSeparator: 'Toolbar'
}

const documentationOverrides: Record<string, string> = {
    CheckboxGroup: 'checkbox', Container: 'layout', Description: 'description', Divider: 'layout', ErrorMessage: 'errormessage', Inline: 'layout',
    ListItem: 'list', RadioGroup: 'radio', Spacer: 'layout', Stack: 'layout', Tab: 'tabs', TabList: 'tabs', TabPanel: 'tabs', Toasts: 'toast',
    SideNavGroup: 'sidenav', SideNavItem: 'sidenav', ToolbarGroup: 'toolbar', ToolbarItem: 'toolbar', ToolbarSeparator: 'toolbar'
}

const localeSections: Record<string, string> = {
    CellColorPicker: 'colorPicker', Command: 'command', DataTable: 'dataTable', EmptyState: 'emptyState', Field: 'field', FileUpload: 'fileUpload', ImageUpload: 'imageUpload', InfiniteScroll: 'infiniteScroll', Input: 'common', InputOTP: 'inputOtp', Link: 'link',
    NumberInput: 'numberInput', PasswordInput: 'passwordInput', Radio: 'radio', RadioGroup: 'radio', ScrollArea: 'scrollArea', SearchField: 'search', Select: 'select', Tab: 'tabs', TabList: 'tabs', TabPanel: 'tabs', Table: 'table', Tabs: 'tabs', Toast: 'toast', Toasts: 'toast', Toolbar: 'toolbar', ToolbarGroup: 'toolbar', ToolbarItem: 'toolbar', ToolbarSeparator: 'toolbar', Tooltip: 'tooltip'
}

const documentation = ['imports', 'props', 'events', 'slots', 'expose', 'accessibility', 'css', 'performance'] as const

export const h0ComponentManifest: H0ComponentManifestEntry[] = entries.map(([name, slug, category]) => {
    const family = familyOverrides[name] ?? name
    return {
        name: `H0${name}`,
        family,
        slug,
        docsSlug: documentationOverrides[name] ?? slug,
        category,
        styleEntry: `components/${family}/style.css`,
        localeSection: localeSections[name],
        documentation,
        axe: true,
        familyRoot: family === 'Layout' && name === 'Container' ? true : undefined,
    }
})
