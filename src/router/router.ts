import {createRouter, createWebHashHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'
import HomePage from '@/pages/HomePage.vue'



export const routes:RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/pages/NotFoundPage.vue')
    },
    {
        path: '/episodes',
        name: 'episodes',
        component: () => import('@/pages/EpisodesPage.vue')
    }
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes
})