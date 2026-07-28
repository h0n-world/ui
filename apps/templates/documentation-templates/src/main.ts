import './assets/scss/global.scss'

import H0Nui from '@h0n/ui'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

createApp(App)
    .use(H0Nui, {
        animation: 'high',
        density: 'compact',
        radiusSize: 'lg',
        storageKey: 'documentation-theme',
        theme: 'system',
        typographySize: 'md',
    })
    .use(router)
    .mount('#app')
