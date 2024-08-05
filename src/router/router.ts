import {createRouter, createWebHashHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'
import HomePage from '@/pages/HomePage.vue'



export const routes:RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
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
    },
    {
        path: '/locations',
        name: 'locations',
        component: () => import('@/pages/LocationsPage.vue')
    }
    

]


export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

