/// <reference types="vite/client" />

declare module 'virtual:editor-runtime' {
    export const runtimeJsUrl: string
    export const runtimeCssUrl: string
}

declare module 'virtual:editor-types' {
    const url: string
    export default url
}
