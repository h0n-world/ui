export type H0FileValidationOptions = { accept?: string; maxSize?: number }

export function matchesH0FileAccept(file: File, accept = '') {
    const formats = accept.split(',').map((value) => value.trim()).filter(Boolean)
    if (!formats.length) return true
    return formats.some((format) => format.endsWith('/*') ? file.type.startsWith(format.slice(0, -1)) : format.startsWith('.') ? file.name.toLowerCase().endsWith(format.toLowerCase()) : file.type === format)
}

export function validateH0File(file: File, options: H0FileValidationOptions) {
    if (!matchesH0FileAccept(file, options.accept)) return 'accept' as const
    if (options.maxSize != null && file.size > options.maxSize) return 'size' as const
    return null
}

export function createH0UploadId(file: File, counter: number) {
    return `${file.name}-${file.size}-${file.lastModified}-${counter}`
}
