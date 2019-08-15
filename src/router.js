import Vue from "vue";
import Router from "vue-router";
import VueRouter from "vue-router";
import store from './store'

Vue.use(Router);

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/users/login",
      name: "usersLogin",
      meta: {
        layout: false,
        requiresAuth: false
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./users/login.vue")
    },
    {
      path: "/users/add",
      name: "usersAdd",
      meta: {
        layout: false,
        requiresAuth: false
      },
      component: () => import(/* webpackChunkName: "about" */ "./users/add.vue")
    },
    {
      path: "/merchants",
      name: "merchantsIndex",
      meta: {
        layout: true,
        requiresAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./merchants/index.vue")
    },
    {
      path: "/merchants/:id",
      name: "merchantsShow",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./merchants/show.vue")
    },
    {
      path: "/merchants/:id/edit",
      name: "merchantsEdit",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./merchants/edit.vue")
    },
    {
      path: "/waimai_merchants",
      name: "waimai_merchantsIndex",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./waimai_merchants/index.vue")
    },
    {
      path: "/waimai_merchants/:id",
      name: "waimai_merchantsShow",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./waimai_merchants/show.vue")
    },
    {
      path: "/waimai_merchants/:id/edit",
      name: "waimai_merchantsEdit",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./waimai_merchants/edit.vue")
    },
    {
      path: "/cities",
      name: "cities",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./cities/index.vue")
    },
    {
      path: "/cities/:id",
      name: "citiesShow",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./cities/show.vue")
    },
    {
      path: "/tuangous",
      name: "tuangouIndex",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./tuangous/index.vue")
    },
    {
      path: "/tuangous/:id",
      name: "tuangouShow",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./tuangous/show.vue")
    },
    {
      path: "/tuangous/:id/edit",
      name: "tuangouEdit",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./tuangous/edit.vue")
    },
    {
      path: "/daijinjuans",
      name: "daijinjuansIndex",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./daijinjuans/index.vue")
    },
    {
      path: "/daijinjuans/:id",
      name: "daijinjuansShow",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./daijinjuans/show.vue")
    },
    {
      path: "/daijinjuans/:id/edit",
      name: "daijinjuansEdit",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./daijinjuans/edit.vue")
    },
    {
      path: "/ip",
      name: "ipIndex",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () => import(/* webpackChunkName: "about" */ "./ip/index.vue")
    },
    {
      path: "/ip_addresses/:id",
      name: "ipShow",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () => import(/* webpackChunkName: "about" */ "./ip/show.vue")
    },
    {
      path: "/maidans",
      name: "maidansIndex",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./maidans/index.vue")
    },
    {
      path: "/maidans/:id",
      name: "maidansShow",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./maidans/show.vue")
    },
    {
      path: "/categoriescity/:id",
      name: "categoriescity",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./categories/categoriescity.vue")
    },
    {
      path: "/categories",
      name: "categoriesIndex",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./categories/index.vue")
    },
    {
      path: "/users",
      name: "usersIndex",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./users/index.vue")
    },

    {
      path: "/users/:id",
      name: "usersShow",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./users/show.vue")
    },
    {
      path: "/users/:id/edit",
      name: "usersEdit",
      meta: {
        layout: true,
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./users/edit.vue")
    },

  ]
});
router.beforeEach((to, from, next) => {
  // const token = store.state.token?store.state.token:window.sessionStorage.getItem("token")
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.user === null) {
      next('/users/login');
    } else {
      next()
    }
  }else{
    next()
  }
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   // this route requires auth, check if logged in
  //   // if not, redirect to login page.
  //   console.log('fdsf')
  //   next('/users/login');
  // } else {

  // }
});
export default router;
