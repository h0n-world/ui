import type { App } from 'vue'
import { createH0LocaleService, provideH0Locale, type H0LocaleConfig, type H0LocaleService } from './locale'
import type { H0PluginConfig } from './Plugin.types'
import { H0Accordion } from './components/Accordion'
import { H0Alert, H0AlertDialog } from './components/Alert'
import { H0Avatar } from './components/Avatar'
import { H0Badge } from './components/Badge'
import { H0Breadcrumbs } from './components/Breadcrumbs'
import { H0Button } from './components/Button'
import { H0ButtonGroup } from './components/ButtonGroup'
import { H0Card } from './components/Card'
import { H0Carousel } from './components/Carousel'
import { H0Checkbox, H0CheckboxGroup } from './components/Checkbox'
import { H0Chip } from './components/Chip'
import { H0Drawer } from './components/Drawer'
import { H0DataTable } from './components/DataTable'
import { H0EmptyState } from './components/EmptyState'
import { H0Field } from './components/Field'
import { H0FileUpload } from './components/FileUpload'
import { H0Form } from './components/Form'
import { H0Grid } from './components/Grid'
import { H0Icon } from './components/Icon'
import { H0Image } from './components/Image'
import { H0ImageUpload } from './components/ImageUpload'
import { H0InfiniteScroll } from './components/InfiniteScroll'
import { H0Input } from './components/Input'
import { H0InputOTP } from './components/InputOTP'
import { H0List, H0ListItem } from './components/List'
import { H0Container, H0Divider, H0Inline, H0Spacer, H0Stack } from './components/Layout'
import { H0Link } from './components/Link'
import { H0Modal } from './components/Modal'
import { H0NumberInput } from './components/NumberInput'
import { H0Pagination } from './components/Pagination'
import { H0PasswordInput } from './components/PasswordInput'
import { H0Radio, H0RadioGroup } from './components/Radio'
import { H0Ripple } from './components/Ripple'
import { H0SearchField } from './components/SearchField'
import { H0ScrollArea } from './components/ScrollArea'
import { H0Segment } from './components/Segment'
import { H0SideNav, H0SideNavGroup, H0SideNavItem } from './components/SideNav'
import { H0Select } from './components/Select'
import { H0Sheet } from './components/Sheet'
import { H0Skeleton } from './components/Skeleton'
import { H0Spinner } from './components/Spinner'
import { H0Stepper } from './components/Stepper'
import { H0Switch } from './components/Switch'
import { H0Table } from './components/Table'
import { H0Tab, H0TabList, H0TabPanel, H0Tabs } from './components/Tabs'
import { H0Textarea } from './components/Textarea'
import { H0Toast, H0Toasts } from './components/Toast'
import { H0Tooltip } from './components/Tooltip'
import { H0Toolbar, H0ToolbarGroup, H0ToolbarItem, H0ToolbarSeparator } from './components/Toolbar'
import { createH0ToastService, provideH0Toast } from './components/Toast'
import { H0Description, H0ErrorMessage, H0Label, H0Message, H0Typography } from './components/Typography'
import { createH0ThemeService, provideH0Theme, type H0ThemeConfig } from './theme'

const components = [
    H0Accordion, H0Alert, H0AlertDialog, H0Avatar, H0Badge, H0Breadcrumbs, H0Button, H0ButtonGroup, H0Card, H0Carousel, H0Checkbox, H0CheckboxGroup, H0Chip,
    H0DataTable, H0Description, H0Divider, H0Drawer, H0EmptyState, H0ErrorMessage, H0Field, H0FileUpload, H0Form, H0Grid, H0Icon, H0Image, H0ImageUpload,
    H0InfiniteScroll, H0Inline, H0Input, H0InputOTP, H0Label, H0Link, H0List, H0ListItem, H0Container, H0Message,
    H0Modal, H0NumberInput, H0Pagination, H0PasswordInput, H0Radio, H0RadioGroup, H0Ripple, H0ScrollArea, H0SearchField, H0Segment, H0Select, H0Sheet, H0Skeleton, H0Spacer, H0Spinner,
    H0SideNav, H0SideNavGroup, H0SideNavItem, H0Stack, H0Stepper, H0Switch, H0Tab, H0Table, H0TabList, H0TabPanel, H0Tabs, H0Textarea, H0Toast, H0Toasts, H0Toolbar, H0ToolbarGroup, H0ToolbarItem, H0ToolbarSeparator, H0Tooltip, H0Typography
]

const H0Nui = {
    install(app: App, config?: H0PluginConfig) {
        const themeService = createH0ThemeService(config)
        const localeConfig = config?.locale
        const localeService: H0LocaleService = localeConfig && 'setLocale' in localeConfig ? localeConfig : createH0LocaleService(localeConfig, { language: config?.localeLanguage })
        if (localeConfig && 'setLocale' in localeConfig && config?.localeLanguage) localeConfig.setLanguage?.(config.localeLanguage)
        provideH0Theme(app, themeService)
        provideH0Locale(app, localeService)
        const toastService = createH0ToastService(config?.toast)
        provideH0Toast(app, toastService)
        app.onUnmount?.(() => {
            themeService.dispose()
            toastService.dispose()
        })

        components.forEach((component) => {
            app.component(component.name!, component)
        })
    }
}

export {
    H0Accordion,
    H0Alert,
    H0AlertDialog,
    H0Avatar,
    H0Badge,
    H0Breadcrumbs,
    H0Button,
    H0ButtonGroup,
    H0Card,
    H0Carousel,
    H0Checkbox,
    H0CheckboxGroup,
    H0Chip,
    H0Description,
    H0Divider,
    H0ErrorMessage,
    H0Drawer,
    H0DataTable,
    H0EmptyState,
    H0Field,
    H0FileUpload,
    H0Form,
    H0Grid,
    H0Icon,
    H0Image,
    H0ImageUpload,
    H0Input,
    H0InfiniteScroll,
    H0InputOTP,
    H0Inline,
    H0Label,
    H0Link,
    H0List,
    H0ListItem,
    H0Container,
    H0Message,
    H0Modal,
    H0NumberInput,
    H0Pagination,
    H0PasswordInput,
    H0Radio,
    H0RadioGroup,
    H0Ripple,
    H0SearchField,
    H0ScrollArea,
    H0Segment,
    H0Select,
    H0Sheet,
    H0SideNav,
    H0SideNavGroup,
    H0SideNavItem,
    H0Skeleton,
    H0Spacer,
    H0Spinner,
    H0Stack,
    H0Stepper,
    H0Switch,
    H0Tab,
    H0Table,
    H0TabList,
    H0TabPanel,
    H0Tabs,
    H0Textarea,
    H0Toast,
    H0Toasts,
    H0Toolbar,
    H0ToolbarGroup,
    H0ToolbarItem,
    H0ToolbarSeparator,
    H0Tooltip,
    H0Typography
}

export { createH0LocaleService, useH0Locale } from './locale'
export { h0ComponentManifest } from './manifest'
export type { H0ComponentCategory, H0ComponentManifestEntry } from './manifest'
export type { H0Locale, H0LocaleConfig, H0LocaleService } from './locale'
export type { H0PluginConfig } from './Plugin.types'
export type { H0AttributeRoutingProps, H0Breakpoint, H0CollectionValue, H0CssSize, H0Density, H0FloatingPlacement, H0InteractiveState, H0Orientation, H0OverlaySide, H0PasswordStrength, H0ResponsiveValue, H0SemanticTone, H0Size, H0Space, H0UploadAdapter, H0UploadAdapterContext, H0UploadItem, H0UploadStatus } from './types'
export * from './composables'
export type * from './components/Accordion'
export type * from './components/Alert'
export type * from './components/Avatar'
export type * from './components/Badge'
export type * from './components/Breadcrumbs'
export type * from './components/Button'
export type * from './components/ButtonGroup'
export type * from './components/Card'
export type * from './components/Carousel'
export type * from './components/Checkbox'
export type * from './components/Chip'
export type * from './components/DataTable'
export type * from './components/Drawer'
export type * from './components/EmptyState'
export type * from './components/Field'
export type * from './components/FileUpload'
export type * from './components/Form'
export type * from './components/Grid'
export type * from './components/Icon'
export type * from './components/Image'
export type * from './components/ImageUpload'
export type * from './components/InfiniteScroll'
export type * from './components/Input'
export type * from './components/InputOTP'
export type * from './components/List'
export type * from './components/Layout'
export type * from './components/Link'
export type * from './components/Modal'
export type * from './components/NumberInput'
export type * from './components/Pagination'
export type * from './components/PasswordInput'
export type * from './components/Radio'
export type * from './components/Ripple'
export type * from './components/SearchField'
export type * from './components/ScrollArea'
export type * from './components/Segment'
export type * from './components/Select'
export type * from './components/Sheet'
export type * from './components/SideNav'
export type * from './components/Skeleton'
export type * from './components/Spinner'
export type * from './components/Stepper'
export type * from './components/Switch'
export type * from './components/Table'
export type * from './components/Tabs'
export type * from './components/Textarea'
export type * from './components/Toast'
export type * from './components/Tooltip'
export type * from './components/Toolbar'
export type * from './components/Typography'
export type { H0OverlayBackdrop } from './components/_shared/Overlay.types'
export { createH0ToastService, provideH0Toast, useH0Toast } from './components/Toast'
export { createH0ThemeService, useH0Theme } from './theme'

export type { H0AnimationLevel, H0RadiusSize, H0ThemeConfig, H0ThemeName, H0ThemePreference, H0ThemeService, H0TypographySize } from './theme'

export default H0Nui
