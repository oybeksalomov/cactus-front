import {createRouter, createWebHistory} from "vue-router"

const routes = [
  {
    path: '/login',
    component: () => import('@/pages/LoginPage')
  },
  {
    path: '/register',
    component: () => import('@/pages/RegisterPage')
  }
]


export default createRouter({
  history: createWebHistory(),
  routes
})