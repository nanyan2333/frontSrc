import Layout from '@/layout/index.vue'
import { createWebHistory, createRouter } from 'vue-router'
export const constantRoutes = [
    {
        path: '/',
        name: 'redirect',
        component: () => import('@/redirect/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/register.vue')
    },
    {
        path: '/index',
        name: 'index',
        component: ()=>import('@/views/index.vue'),  
    },
    {
        path: '/history',
        name: 'history',
        component: () => import('@/views/history/index.vue')
    },
    {
        path: '/reserve',
        name: 'reserve',
        component:() => import('@/views/reserve/index.vue'),
    },
    {
        path: '/inquiry',
        name: 'inquiry',
        component: () => import('@/views/inquiry/index.vue')
    },
    
]
const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
});

export default router;