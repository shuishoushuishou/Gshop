<template>
  <div >
    <section class="msite">
      <!--首页头部-->
      <HeaderTop :title="address.name">
      <span class="header_search" slot="left">
            <i class="iconfont icon-sousuo"></i>
      </span>
        <span class="header_login" slot="right">
            <span class="header_login_text">登录|注册</span>
        </span>
      </HeaderTop>
      <!--首页导航-->
      <nav class="msite_nav" v-if="foodTypes.length">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(types,index) in typesArr" :key="index" >
              <a href="javascript:" class="link_to_food" v-for="(type,index) in types" :key="index">
                <div class="food_container">
                  <img :src="baseImageUrl+type.image_url">
                </div>
                <span>{{ type.title }}</span>
              </a>
            </div>

          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </nav>
      <img src="./images/msite_back.svg" alt="" v-else>
      <!--首页附近商家-->
      <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-xuanxiang"></i>
          <span class="shop_header_title">附近商家</span>
        </div>
        <ShopList v-if="shopList.length"></ShopList>
        <img src="./images/shop_back.svg" alt="" v-else >
     </div>
    </section>
  </div>
</template>

<script>
import ShopList from "@/components/ShopList/ShopList";
import Swiper from 'swiper'

import 'swiper/dist/css/swiper.min.css'
import {mapState} from 'vuex'



export default {
  data(){
    return{
      baseImageUrl:'https://fuss10.elemecdn.com'
    }
  },
  mounted() {
      this.$store.dispatch('getAddress'),
      this.$store.dispatch('getFoodtypes'),
      this.$store.dispatch('getShopList')


  },
  computed:{
    ...mapState(['address','foodTypes','shopList']),
    typesArr(){
      const {foodTypes}=this
      let arr=[]
      let minArr=[]
      foodTypes.forEach(a=>{

        if (minArr.length===0){
          arr.push(minArr)

        }
        minArr.push(a)
        if (minArr.length===8){
          minArr=[]
        }
      })

      return arr
    }
  },
  watch:{
    foodTypes(){
      this.$nextTick(()=>{
        new Swiper ('.swiper-container', {

          loop: true, // 循环模式选项

          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
        })

      })


    }

  },
  components:{
    ShopList
  }
}

</script>

<style lang="stylus">
@import '../../common/stylus/mixins.styl'
.msite //首页
  width 100%

.msite_nav
  bottom-border-1px(#e4e4e4)
  margin-top 45px
  height 200px
  background #fff

  .swiper-container
    width 100%
    height 100%

    .swiper-wrapper
      width 100%
      height 100%

      .swiper-slide
        display flex
        justify-content center
        align-items flex-start
        flex-wrap wrap

        .link_to_food
          width 25%

          .food_container
            display block
            width 100%
            text-align center
            padding-bottom 10px
            font-size 0

            img
              display inline-block
              width 50px
              height 50px

          span
            display block
            width 100%
            text-align center
            font-size 13px
            color #666

    .swiper-pagination
      > span.swiper-pagination-bullet-active
        background #02a774

.msite_shop_list
  top-border-1px(#e4e4e4)
  margin-top 10px
  background #fff

  .shop_header
    padding 10px 10px 0

    .shop_icon
      margin-left 5px
      color #999

    .shop_header_title
      color #999
      font-size 14px
      line-height 20px

  </style>
