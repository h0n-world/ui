import typesUrl from 'virtual:editor-types'
import type {
    EditorCompletion,
    EditorDiagnostic,
    LanguageAssets,
    LanguageRequest,
    LanguageResponse,
} from './language-types'

let assetsPromise: Promise<LanguageAssets> | undefined
export function createLanguageClient() {
    const worker = new Worker(new URL('./language.worker.ts', import.meta.url), { type: 'module' })
    let id = 0
    let disposed = false
    let failure: Error | undefined
    const pending = new Map<
        number,
        {
            resolve: (value: LanguageResponse) => void
            reject: (error: Error) => void
            timer: ReturnType<typeof setTimeout>
        }
    >()
    assetsPromise ??= fetch(typesUrl)
        .then((response) => {
            if (!response.ok) throw new Error('Could not load local editor types.')
            return response.json() as Promise<LanguageAssets>
        })
        .catch((error) => {
            assetsPromise = undefined
            throw error
        })
    const ready = assetsPromise.then((assets) => {
        if (disposed) throw new Error('Language service disposed.')
        if (failure) throw failure
        return new Promise<LanguageResponse>((resolve, reject) => {
            const timer = setTimeout(() => {
                pending.delete(0)
                reject(new Error('Language worker initialization timed out.'))
            }, 20000)
            pending.set(0, { resolve, reject, timer })
            worker.postMessage({ kind: 'init', assets })
        })
    })
    // Consumers receive initialization failures from their requests.
    void ready.catch(() => {})
    const failAll = (error: Error) => {
        for (const item of pending.values()) {
            clearTimeout(item.timer)
            item.reject(error)
        }
        pending.clear()
    }
    worker.onmessage = (event: MessageEvent<LanguageResponse>) => {
        const response = event.data
        const item = pending.get(response.id)
        if (!item) return
        clearTimeout(item.timer)
        pending.delete(response.id)
        if (response.error) item.reject(new Error(response.error))
        else item.resolve(response)
    }
    worker.onerror = (event) => {
        failure = new Error(event.message || 'Language worker failed.')
        failAll(failure)
    }
    async function request(kind: LanguageRequest['kind'], source: string, position?: number) {
        await ready
        if (disposed) throw new Error('Language service disposed.')
        return new Promise<LanguageResponse>((resolve, reject) => {
            const requestId = ++id
            const timer = setTimeout(() => {
                pending.delete(requestId)
                reject(new Error('Type checking timed out.'))
            }, 20000)
            pending.set(requestId, { resolve, reject, timer })
            worker.postMessage({ id: requestId, kind, source, position })
        })
    }
    return {
        async check(source: string): Promise<EditorDiagnostic[]> {
            return (await request('check', source)).diagnostics ?? []
        },
        async complete(source: string, position: number): Promise<EditorCompletion[]> {
            return (await request('complete', source, position)).completions ?? []
        },
        dispose() {
            disposed = true
            worker.terminate()
            failAll(new Error('Language service disposed.'))
        },
    }
}
