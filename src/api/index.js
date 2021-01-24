// 包含n个接口请求函数的模块
import ajax from "@/api/ajax";


// [1、根据经纬度获取位置详情]
export const reqAddress=(geohash)=>ajax(`http://localhost:4000/position/:${geohash}`)
// [2、获取食品分类列表]
export const reqFoodType=()=>ajax('http://localhost:4000/index_category')
// [3、根据经纬度获取商铺列表]
export const reqShopList=(latitude,longitude)=>ajax('http://localhost:4000/shops',{latitude,longitude})
// [4、根据经纬度和关键字搜索商铺列表]
export const reqShopListWithName=(geohash,keyword)=>ajax('http://localhost:4000/search_shops',{geohash,keyword})
// [5、获取一次性验证码]
export const reqCaptcha=()=>ajax('http://localhost:4000/captcha')
// [6、用户名密码登陆]
export const Login=(name,pwd,captcha)=>ajax('http://localhost:4000/login_pwd\n',{name,pwd,captcha},'POST')
// [7、发送短信验证码]
export const sendCaptcha=(phone)=>ajax('http://localhost:3000/sendcode',{phone})
// [8、手机号验证码登陆]
export const captchaLogin=(phone,code)=>ajax('http://localhost:3000/login_sms',{phone,code},'POST')
// [9、根据会话获取用户信息]
export const reqUserInfo=()=>ajax('http://localhost:3000/userinfo')
// [10、用户登出]
export const Logout=()=>ajax('http://localhost:3000/logout')
