import Vue from "vue";
import Router from "vue-router";
import VueRouter from "vue-router";

Vue.use(Router);

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/merchants",
      name: "merchants",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./merchants/merchants.vue")
    },
    {
      path: "/merchants/:id",
      name: "merchantsShow",
      component: () =>
        import(/* webpackChunkName: "about" */ "./merchants/show.vue")
    },
    {
      path: "/merchants/:id/edit",
      name: "merchantsEdit",
      component: () =>
        import(/* webpackChunkName: "about" */ "./merchants/edit.vue")
    }
  ]
});
export default router;
