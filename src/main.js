import Vue from 'vue'
import 'lib-flexible/flexible'
import router from './router/index'

import App from './App.vue'
import ShopHeader from "@/components/ShopHeader/ShopHeader";
Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

Vue.component('ShopHeader',ShopHeader)
new Vue({
  el:'#app',
  components:{App},
  template:'<App />',
  router
})