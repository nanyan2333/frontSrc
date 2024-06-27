import { createWebHistory, createRouter } from 'vue-router'
export const constantRoutes = [
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
        component: () => import('@/views/index.vue')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
});

export default router;