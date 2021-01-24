<template>
  <div id="footer_guide">
    <div :class="{active:$route.path==='/msite'}" @click="goPath('/msite')" class="guide_item">
      <i class="iconfont icon-waimai"></i>
      <span>首页</span>
    </div>
    <div :class="{active:$route.path==='/search'}" @click="goPath('/search')" class="guide_item">
      <i class="iconfont icon-search"></i>
      <span>搜索</span>
    </div>
    <div :class="{active:$route.path==='/order'}" @click="goPath('/order')" class="guide_item">
      <i class="iconfont icon-dingdan"></i>
      <span>订单</span>
    </div>
    <div :class="{active:$route.path==='/profile'}" @click="goPath('/profile')" class="guide_item">
      <i class="iconfont icon-geren"></i>
      <span>我的</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goPath(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style  lang="stylus" >
@import '../../common/stylus/mixins.styl'

#footer_guide  //footer
  top-border-1px(#e4e4e4)
  position fixed
  z-index 100
  left 0
  right 0
  bottom 0
  background-color #fff
  width 100%
  height 50px
  display flex
  .guide_item
    display flex
    flex 1
    text-align center
    flex-direction column
    align-items center
    margin 5px
    color #999999
    span
      font-size 12px
      margin-top 2px
      margin-bottom 2px
    .iconfont
        font-size 22px
  .active
    color $green
</style>
