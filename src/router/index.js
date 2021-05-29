import {
  createRouter,
  createWebHistory
} from 'vue-router'
import authStore from '@/store/auth'

const routes = [{
    path: '/auth',
    name: 'Auth',
    component: () => import('../layouts/Auth.vue'),
    children: [{
        path: '/login',
        name: 'Login',
        component: () => import('../views/auth/Login.vue')
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('../views/auth/Register.vue')
      },
      {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('../views/auth/ForgotPassword.vue')
      },
    ]
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../layouts/Dashboard.vue'),
    beforeEnter(to, from, next) {
      if (authStore.state.authStatus) next()
      else next({
        name: 'Login'
      })
    },
    children: [{
        path: '',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/transaction',
        name: 'TransactionIndex',
        component: () => import('../views/transaction/Index.vue')
      },
      {
        path: '/transaction/create',
        name: 'TransactionCreate',
        component: () => import('@/views/transaction/Create.vue')
      }, {
        path: '/transaction/edit/:id',
        name: 'TransactionEdit',
        component: () => import('@/views/transaction/Edit.vue'),
        props: true
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router