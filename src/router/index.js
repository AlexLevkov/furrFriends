import Vue from 'vue'
import vueRouter from 'vue-router'
import home from '../views/home.vue'
import about from '../views/about.vue'
import pet from '../views/pet.vue'

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
  },
  {
    path: '/pet',
    name: 'pet',
    component: pet
  }
]

const router = new vueRouter({
  routes
})

export default router
