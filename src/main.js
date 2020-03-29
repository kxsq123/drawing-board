import Vue from 'vue'
import App from './App'
import Notify from '@/components/Notify/main'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$notify = Notify;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
