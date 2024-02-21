import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/cartelera',
      name: 'cartelera',
      component: () => import('../views/CarteleraView.vue')
    },
    {
      path: '/obra/:id',
      name: 'obra',
      component: () => import('../views/DetalleObraView.vue')
    },
    {
      path: '/compra/:id',
      name: 'compra',
      component: () => import('../views/EleccionSalaView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/notFound',
      name: '404',
      component: () => import('../views/404View.vue')
    },
    {
      path: '/:catchAll(.*)', 
      redirect: '/notFound' 
    }
  ]
})

 export default router
