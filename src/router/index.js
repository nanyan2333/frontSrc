import { createWebHistory, createRouter } from 'vue-router'
import { getToken } from '../utils/auth';
import { ElMessage } from 'element-plus';
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
        component: () => import('@/views/index.vue'),
    },
    {
        path: '/history',
        name: 'history',
        component: () => import('@/views/history/index.vue')
    },
    {
        path: '/reserve',
        name: 'reserve',
        component: () => import('@/views/reserve/index.vue'),
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

router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/register') {
        next();
    } else if (from.path === '/login' && getToken() !== "" && getToken() !== null) {
        next()
    }
    else {
        if (getToken() !== "" && getToken() !== null) {
            next();
        } else {
            ElMessage.error("Cookies过期,请重新登录")
            router.replace('/login')
        }
    }
});
export default router;