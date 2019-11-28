import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'assets/reset.css'
import Vuex from 'vuex'
import {  Tab, Tabs, Swipe, SwipeItem} from "vant";
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(Tab).use(Tabs).use(Swipe).use(SwipeItem);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
