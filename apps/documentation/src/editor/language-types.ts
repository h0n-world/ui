export interface LanguageAssets {
    files: Record<string, string>
    resolutions: Record<string, Record<string, string>>
    entries: Record<string, string>
    defaultLib: string
}
export interface EditorDiagnostic {
    from: number
    to: number
    message: string
    severity: 'error' | 'warning'
}
export interface EditorCompletion {
    label: string
    type: string
    detail?: string
}
export interface LanguageRequest {
    id: number
    kind: 'check' | 'complete'
    source: string
    position?: number
}
export interface LanguageResponse {
    id: number
    diagnostics?: EditorDiagnostic[]
    completions?: EditorCompletion[]
    error?: string
}
