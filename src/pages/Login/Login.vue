<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:flag}" @click="flag=true">短信登录</a>
          <a href="javascript:;" :class="{on:!flag}" @click="flag=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:flag}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" @click.prevent="getCode">
                {{codeTime>0?`倒计时(${codeTime})s`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!flag}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="密码" v-model="password" v-if="passwordShow">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                <div class="switch_button  " :class="passwordShow?'on':'off'" @click="passwordShow=!passwordShow">
                  <div class="switch_circle " :class="{right:passwordShow}" ></div>
                  <span class="switch_text">{{passwordShow? '显示':'隐藏' }}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src='/api/captcha' alt="captcha" @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip v-if="showAlert" :alertText="alertText" @closeTip="closeTip"></AlertTip>
  </section>

</template>

<script>
import AlertTip from "@/components/AlertTip/AlertTip";
import {captchaLogin, Login, sendCaptcha} from '../../api/index'

export default {
  data(){
    return{
      flag:true,//登录方式
      phone:'',//手机号
      codeTime:0,//倒计时
      passwordShow:false,//显示密码
      name:'',//账号
      pwd:'',//密码
      code:'',//手机验证码
      captcha:'',//图像验证码
      showAlert:false,//显示提示
      alertText:'',//提示内容

    }
  },
  computed:{
    rightPhone(){
      return /^1\d{10}$/.test(this.phone)
    },

  },
  methods:{
    //获取短信验证码
    async getCode(){

      if (this.codeTime==0){
        this.codeTime=30
        let times= setInterval(()=>{
          this.codeTime--
        if (this.codeTime==0){
          clearInterval(times)
        }
        },1000)
        //发送ajax,获取短信验证码
        const result=await sendCaptcha(this.phone)
        if(result.code===1){
          this.showShowAlert(result.msg)
          if (this.codeTime>0){
            this.codeTime=1
          }
        }
      }

    },
    //显示提示
    showShowAlert(te){
      this.showAlert=true
      this.alertText=te
    },
    //登录
    async login(){
      let result
      if (this.flag){
        // if (!this.phone){
        //   alert('输入手机号')
        // }else {
        //   if (!this.code){
        //     alert('输入验证码')
        //   }
        // }
        if (!this.rightPhone){
          this.showShowAlert('输入正确手机号')

          return
        }
        if (!/^\d{6}$/.test(this.code)){
          this.showShowAlert('输入6位验证码')

          return
        }
        //手机号验证码登陆

        result =await captchaLogin(this.phone,this.code)



      }else {
        const {name, pwd, captcha} = this
        if (!name){
          this.showShowAlert('输入帐号')

          return
        }
        if (!pwd){
          this.showShowAlert('输入密码')

          return
          }

        if (!captcha){
          this.showShowAlert('输入验证码')

          return
            }
        result =await Login({name, pwd, captcha})
      }
      if (result.code===0){
        let user=result.data
        this.$store.dispatch('setUserInfo',user)
        this.$router.replace('./profile')
      }else if(result.code===1){
        this.showShowAlert(result.msg)
        this.getCaptcha()
      }
    },
    //关闭提示
    closeTip(){
      this.showAlert=false
    },
    //获取图形验证码
    getCaptcha(){
      this.$refs.captcha.src='/api/captcha?time='+new Date()
    }
  },
  components:{
    AlertTip
  }
}
</script>

<style lang="stylus">
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.right
                  transform translateX(27px)

          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>