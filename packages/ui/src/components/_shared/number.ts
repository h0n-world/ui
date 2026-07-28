export function getH0NumberSymbols(locale?: string) {
    const parts = new Intl.NumberFormat(locale).formatToParts(-12345.6)
    return {
        decimal: parts.find((part) => part.type === 'decimal')?.value ?? '.',
        group: parts.find((part) => part.type === 'group')?.value ?? ',',
        minus: parts.find((part) => part.type === 'minusSign')?.value ?? '-'
    }
}

export function parseH0Number(value: string, locale?: string) {
    const symbols = getH0NumberSymbols(locale)
    const normalized = value.trim().replaceAll(symbols.group, '').replace(symbols.minus, '-').replace(symbols.decimal, '.')
    if (!normalized) return null
    if (normalized === '-' || normalized === '.' || normalized === '-.') return undefined
    const parsed = Number(normalized)
    return Number.isFinite(parsed) ? parsed : undefined
}

export function getH0DecimalPrecision(...values: number[]) {
    return values.reduce((maximum, value) => Math.max(maximum, String(value).split('.')[1]?.length ?? 0), 0)
}

export function stepH0Number(value: number, step: number, direction: 1 | -1, precision = getH0DecimalPrecision(value, step)) {
    const scale = 10 ** precision
    return (Math.round(value * scale) + direction * Math.round(step * scale)) / scale
}

export function clampH0Number(value: number, min?: number, max?: number) {
    return Math.min(max ?? Number.POSITIVE_INFINITY, Math.max(min ?? Number.NEGATIVE_INFINITY, value))
}
