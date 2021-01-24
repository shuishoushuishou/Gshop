<template>
  <div id="app">
    <router-view></router-view>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer/Footer'

export default {
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
