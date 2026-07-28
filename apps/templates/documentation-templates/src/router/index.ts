import { createRouter, createWebHistory } from 'vue-router'

import SystemLayout from '@/components/system/SystemLayout.vue'
import { documentationPages } from '@/content/content'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        ...documentationPages.map((page) => ({
            path: page.path,
            name: `documentation-${page.path.replace(/^\//, '').replaceAll('/', '-')}`,
            component: SystemLayout,
            meta: {
                documentationGroup: page.group,
                title: page.title,
            },
        })),
        {
            path: '/:pathMatch(.*)*',
            redirect: '/docs/introduction',
        },
    ],
    scrollBehavior(to) {
        if (to.hash) return { el: to.hash, behavior: 'smooth', top: 86 }
        return { top: 0 }
    },
})

router.afterEach((to) => {
    document.title = to.meta.title
        ? `${String(to.meta.title)} — H0N UI Docs`
        : 'H0N UI Docs - Documentation template'
})

export default router
