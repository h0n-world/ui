export type H0Size = 'sm' | 'md' | 'lg'

export type H0Density = 'compact' | 'default' | 'comfortable'
export type H0SemanticTone = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger'
export type H0InteractiveState = 'default' | 'hover' | 'active' | 'disabled'
export type H0CssSize = number | string
export type H0Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type H0ResponsiveValue<T> = T | Partial<Record<'base' | H0Breakpoint, T>>
export type H0Space = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
export type H0Orientation = 'horizontal' | 'vertical'
export type H0OverlaySide = 'top' | 'right' | 'bottom' | 'left'
export type H0CollectionValue = string | number
export type H0AttributeRoutingProps = {
    rootAttrs?: Record<string, unknown>
    controlAttrs?: Record<string, unknown>
}
export type H0UploadStatus = 'idle' | 'uploading' | 'success' | 'error' | 'cancelled'
export type H0PasswordStrength = 0 | 1 | 2 | 3 | 4
export type H0UploadItem<Result = unknown> = { id: string; file: File; status: H0UploadStatus; progress: number; result?: Result; error?: string }
export type H0UploadAdapterContext = { signal: AbortSignal; onProgress: (progress: number) => void }
export type H0UploadAdapter<Result = unknown> = (file: File, context: H0UploadAdapterContext) => Promise<Result>
export type H0FloatingPlacement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
