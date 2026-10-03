import type { LanguageAssets, LanguageRequest, LanguageResponse } from './language-types'
import { createEditorLanguageService } from './language-service'

let service: ReturnType<typeof createEditorLanguageService> | undefined
self.onmessage = (
    event: MessageEvent<LanguageRequest | { kind: 'init'; assets: LanguageAssets }>,
) => {
    const request = event.data
    if (request.kind === 'init') {
        try {
            service?.dispose()
            service = createEditorLanguageService(request.assets)
            self.postMessage({ id: 0 })
        } catch (error) {
            self.postMessage({
                id: 0,
                error: error instanceof Error ? error.message : String(error),
            })
        }
        return
    }
    const response: LanguageResponse = { id: request.id }
    try {
        if (!service) throw new Error('Language service has not initialized.')
        if (request.kind === 'check') response.diagnostics = service.diagnostics(request.source)
        else response.completions = service.completions(request.source, request.position ?? 0)
    } catch (error) {
        response.error = error instanceof Error ? error.message : String(error)
    }
    self.postMessage(response)
}
