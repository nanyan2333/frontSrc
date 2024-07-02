import { createWebHistory, createRouter } from 'vue-router'
import usePermissionStore from '../store/module/permission';
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
    const permission = usePermissionStore()
    console.log(to.path)
    if (to.path === '/login' || to.path === '/register' || from.path === '/' || from.path === '/login') {
        next();
    } else {
        if (permission.hasPermission(to.path)) {
            next();
        } else {
            //取消跳转
            alert('权限不足')
        }
    }
});
export default router;