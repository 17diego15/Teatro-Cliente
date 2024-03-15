import { createRouter, createWebHistory } from 'vue-router';
// import { useAuthStore } from '@/store/LoginStore';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/cartelera',
    name: 'cartelera',
    component: () => import('../views/CarteleraView.vue'),
  },
  {
    path: '/obra/:id',
    name: 'obra',
    component: () => import('../views/DetalleObraView.vue'),
  },
  {
    path: '/compra/:id',
    name: 'compra',
    component: () => import('../views/EleccionSalaView.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/sala/:id',
    name: 'sala',
    component: () => import('../views/SalaView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/notFound',
    name: '404',
    component: () => import('../views/404View.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/notFound',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const usuarioInfo = localStorage.getItem('usuario');
  const usuario = usuarioInfo ? JSON.parse(usuarioInfo) : null;

  if (to.meta.requiresAuth && !usuario) {
    next({ name: 'login' });
  } else if (to.meta.requiresAdmin && !(usuario?.isAdmin)) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
