import {reqAddress,reqFoodTypes,reqShopList,reqShopListWithKey,reqUserInfo,reqShopInfo,reqShopRatings,reqShopGoods} from '../api/index'
import {GET_ADDRSS,GET_FOODTYPE,GET_SHOPLIST,GET_SHOPLISTWITHKEY,REQ_USERINFO,SET_USER_INFO,RESET_USER_INFO
,RECEIVE_GOODS,RECEIVE_RATINGS,RECEIVE_INFO,INCREMENT_FOOD_COUNT,DECREMENT_FOOD_COUNT,CLEAR_CART} from './mutations-type'

export default {
    //地理信息
   async getAddress({commit,state}){
       const geohash=state.latitude+','+state.longitude
        const result=await reqAddress(geohash)
       if (result.code===0){
           const address=result.data
           commit(GET_ADDRSS, {address})
       }
    },
    //食品分类列表
    async getFoodtypes({commit}){
        const  result=await reqFoodTypes()
        if (result.code===0){
            const foodTypes=result.data
            commit(GET_FOODTYPE, {foodTypes})
        }
    },
    //商铺列表
    async getShopList({commit,state}){

        const  result= await reqShopList(state.latitude,state.longitude)
        if (result.code===0){
            const shopList=result.data
            commit(GET_SHOPLIST, {shopList})
        }
    },
    //根据经纬度和关键字搜索商铺列表
    async getShoplistWithKey({commit,state},keyword){
        const geohash = state.latitude + ',' + state.longitude
        const result =await reqShopListWithKey(geohash,keyword)
        if (result.code===0){
            const searchShops=result.data
            commit(GET_SHOPLISTWITHKEY, {searchShops})
        }
    },
    //根据会话获取用户信息
    async get_userinfo({commit}){
        const result =await reqUserInfo()
        if (result.code===0){
            const userInfo=result.data
            commit(REQ_USERINFO, {userInfo})
        }
    },
    //保存用户信息
    setUserInfo({commit},userInfo){

            commit(SET_USER_INFO, {userInfo})

    },
    //清空用户信息
    resetUserInfo({commit}){

        commit(RESET_USER_INFO)

    },


    // 异步获取商家商品列表
    async getShopGoods({commit}, callback) {
        const result = await reqShopGoods()
        if (result.code === 0) {
            const goods = result.data
            commit(RECEIVE_GOODS, {goods})
            // 数据更新了, 通知一下组件
            callback && callback()
        }
    },
    // 异步获取商家评价列表
    async getShopRatings({commit}, callback) {
        const result = await reqShopRatings()
        if (result.code === 0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS, {ratings})
            // 数据更新了, 通知一下组件
            callback && callback()
        }
    },

    // 异步获取商家信息
    async getShopInfo({commit}) {
        const result = await reqShopInfo()
        if (result.code === 0) {
            const info = result.data
            commit(RECEIVE_INFO, {info})
        }
    },
    // 同步更新food中的count值
    updateFoodCount({commit}, {isAdd, food}) {
        if (isAdd) {
            commit(INCREMENT_FOOD_COUNT, {food})
        } else {
            commit(DECREMENT_FOOD_COUNT, {food})
        }
    },
    // 同步清空购物车
    clearCart({commit}) {
        commit(CLEAR_CART)
    },

}