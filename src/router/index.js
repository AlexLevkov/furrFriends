import Vue from 'vue'
import vueRouter from 'vue-router'
import home from '../views/home.vue'
import about from '../views/about.vue'

Vue.use(vueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/about',
    name: 'about',
    component: about
  }
]

const router = new vueRouter({
  routes
})

export default router
