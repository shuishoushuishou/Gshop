<template>
  <div id="app">
    <router-view></router-view>

    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer/Footer'
// import {reqCaptcha,reqFoodType} from './api/index'
//
// reqCaptcha().then(function (res){
//   console.log(res)
// })
// reqFoodType().then(function (res){
//   console.log(res)
// })

export default {
  mounted() {
    this.$store.dispatch('get_userinfo')
  },
  name: 'App',
  components: {
  Footer
  }
}
</script>

<style lang="stylus">
#app
  width 100%
  height 100%
  background #f5f5f5
  position relative
</style>
