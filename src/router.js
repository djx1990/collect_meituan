import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import VueRouter from 'vue-router'

Vue.use(Router)

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/merchants',
      name: 'merchants',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './merchants/merchants.vue')
    },
    {
      path: '/merchants/:id',
      name: 'merchantsShow',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './merchants/show.vue')
    }
  ]
})
export default router;