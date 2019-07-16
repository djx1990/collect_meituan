import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL:
    "https://mockapi.eolinker.com/FbVf4MH0a082b35420706ebbe5770bcacd13a40e3c1a6bd"
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
