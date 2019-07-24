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
      name: "merchantsIndex",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./merchants/index.vue")
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
    },
    {
      path: "/waimai_merchants",
      name: "waimai_merchantsIndex",
      component: () =>
        import(/* webpackChunkName: "about" */ "./waimai_merchants/index.vue")
    },
    {
      path: "/waimai_merchants/:id",
      name: "waimai_merchantsShow",
      component: () =>
        import(/* webpackChunkName: "about" */ "./waimai_merchants/show.vue")
    },
    {
      path: "/waimai_merchants/:id/edit",
      name: "waimai_merchantsEdit",
      component: () =>
        import(/* webpackChunkName: "about" */ "./waimai_merchants/edit.vue")
    },
    {
      path: "/cities",
      name: "cities",
      component: () =>
        import(/* webpackChunkName: "about" */ "./cities/index.vue")
    },
    {
      path: "/cities/:id",
      name: "citiesShow",
      component: () =>
        import(/* webpackChunkName: "about" */ "./cities/show.vue")
    },
    {
      path: "/tuangous",
      name: "tuangouIndex",
      component: () =>
        import(/* webpackChunkName: "about" */ "./tuangous/index.vue")
    },
    {
      path: "/tuangous/:id",
      name: "tuangouShow",
      component: () =>
        import(/* webpackChunkName: "about" */ "./tuangous/show.vue")
    },
    {
      path: "/tuangous/:id/edit",
      name: "tuangouEdit",
      component: () =>
        import(/* webpackChunkName: "about" */ "./tuangous/edit.vue")
    }
  ]
});
export default router;
