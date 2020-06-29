import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/css/index.styl'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  loading: require('@/assets/images/default.png')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
