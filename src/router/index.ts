import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/TheLayout.vue'),
    children: [
      {
        name: 'index',
        path: '',
        component: () => import('@/views/IndexView.vue'),
      },
      {
        name: 'home',
        path: 'home',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        name: 'new-trade',
        path: 'new-trade',
        component: () => import('@/views/NewTradeView.vue'),
      },
      {
        name: 'user-settings',
        path: 'user-settings',
        component: () => import('@/views/UserSettingsView.vue'),
      },
      {
        name: 'trade-references',
        path: 'trade-references',
        component: () => import('@/views/TradeReferencesView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
