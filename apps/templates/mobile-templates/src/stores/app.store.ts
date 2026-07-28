import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAppStore = defineStore('app', () => {
    const initialized = ref(false)
    const loading = ref(false)

    const ready = computed(() => initialized.value && !loading.value)

    async function initialize(): Promise<void> {
        if (initialized.value) return

        loading.value = true

        try {
            // Application initialization
            initialized.value = true
        } finally {
            loading.value = false
        }
    }

    return {
        initialized,
        loading,
        ready,
        initialize,
    }
})
