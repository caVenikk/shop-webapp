import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import OrderData from '@/views/OrderData.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/order_data',
        name: 'OrderData',
        component: OrderData,
    }
]

const router = createRouter({ history: createWebHistory(), routes });
router.beforeEach((to, from, next) => {
    if (+import.meta.env.VITE_DEV) {
        console.log(`Navigating to: ${to.name}`);
    }
    next();
});
export default router;
