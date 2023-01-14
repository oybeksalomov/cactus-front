import {createRouter, createWebHistory} from "vue-router"

const routes = [
  {
    path: [],
    component: () => import('') //todo create HomePage
  }
]


export default createRouter({
  history: createWebHistory(),
  routes
})