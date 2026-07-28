import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/home/HomePage.vue'

const routers = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/about',
        name: 'about',

        component: () => import('../pages/about/AboutPage.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/pages/system/ErrorPage.vue'),
    },
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routers,
    scrollBehavior(_to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }

        return {
            left: 0,
            top: 0,
        }
    },
})

export default router
