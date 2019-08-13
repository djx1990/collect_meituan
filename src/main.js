import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import cookies from "vue-cookies"
import 'iview/dist/styles/iview.css';


Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL:
   "http://192.168.101.9:3000/api/v1/admin"
    // "https://mockapi.eolinker.com/FbVf4MH0a082b35420706ebbe5770bcacd13a40e3c1a6bd"
});
new Vue({
  cookies,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
