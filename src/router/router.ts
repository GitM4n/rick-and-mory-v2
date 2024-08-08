import {createRouter, createWebHashHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import { rickAPI } from '@/api/rickAndMorty/rickAPI'

const {updatePage} = rickAPI()



export const routes:RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/character/:id',
        name: 'character',
        component: () => import('@/pages/CharacterInfoPage.vue'),
        props: true,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/pages/NotFoundPage.vue')
    },
    {
        path: '/episodes',
        name: 'episodes',
        component: () => import('@/pages/EpisodesListPage.vue')
    },
    {
        path: '/episodes/:id',
        name: 'episode',
        component: () => import('@/pages/EpisodeInfoPage.vue'),
        props: true,
       
    },
    {
        path: '/locations',
        name: 'locations',
        component: () => import('@/pages/LocationsListPage.vue')
    },
    {
        path: '/locations/:id',
        name: 'location',
        component: () => import('@/pages/LocationInfoPage.vue'),
        props: true,
    }
    
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})


router.beforeResolve((to, from, next) => {
    if (to.meta.__navigationId !== 0) {
        switch (to.name) {
            case 'home':
            case 'episodes':
            case 'locations':
                updatePage(1);
                break;
        }
    }
    next();
})


export  {router}




