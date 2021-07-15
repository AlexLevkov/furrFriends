import Vue from 'vue'
import vueRouter from 'vue-router'
import home from '../views/home.vue'
import about from '../views/about.vue'
import pet from '../views/pet.vue'
import userDetails from '../views/user.details.vue'

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
  },
  {
    path: '/user/:userId',
    name: 'user-details',
    component: userDetails
  }

]

const router = new vueRouter({
  routes
})

export default router
