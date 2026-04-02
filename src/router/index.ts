import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/TheLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/IndexView.vue'),
        },
        {
          path: 'new-trade',
          component: () => import('@/views/NewTradeView.vue'),
        },
      ],
    },
    {
      path: '/bar',
      component: () => import('@/views/IndexView.vue'),
    },
  ],
});

export default router;
