import Vue from 'vue'
import 'lib-flexible/flexible'
import router from './router/index'
import store from './store'
import { Button } from 'mint-ui'
import VueLazyload from 'vue-lazyload'


import App from './App.vue'
import HeaderTop from "@/components/HeaderTop/HeaderTop";
import loading from './common/imgs/loading.gif'
import './fiters' // 加载过滤器

import './mock/mockServer' // 加载mockServer即可
Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

Vue.component('HeaderTop',HeaderTop)
Vue.component(Button.name, Button)
Vue.use(VueLazyload, { // 内部自定义一个指令lazy
  loading
})

new Vue({
  el:'#app',
  components:{App},
  template:'<App />',
  router,
  store
})