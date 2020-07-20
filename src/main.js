import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from '@/App.vue'
import router from '@/global/router'
import store from '@/global/store'
import event from '@/utils/event'
import cache from '@/api/cache'

Vue.prototype.$event = event
Vue.prototype.$cache = cache

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
