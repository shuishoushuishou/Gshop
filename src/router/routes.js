import Msite from '../pages/Msite/Msite'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Login from "../pages/Login/Login"
import UserInfo from "@/pages/UserInfo/UserInfo"
import Shop from '../pages/Shop/Shop'
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods"
import ShopRatings from "../pages/Shop/ShopRating/ShopRating"
import ShopInfo from "../pages/Shop/ShopInfo/ShopInfo"
export default [
    {
        path:'/msite',
        component:Msite,
        meta:{
            showFooter:true
        }
    },
    {
        path:'/search',
        component:Search,
        meta:{
            showFooter:true
        }
    },
    {
        path:'/order',
        component:Order,
        meta:{
            showFooter:true
        }
    },
    {
        path:'/profile',
        component:Profile,
        meta:{
            showFooter:true
        }
    },
    {
        path:'/',
        redirect:'./msite'
    },
    {
        path:'/login',
        component:Login,

    },
    {
        path:'/userInfo',
        component:UserInfo,

    },
    {
        path: '/shop',
        component: Shop,
        children: [
            {
                path: '/shop/goods',
                component: ShopGoods
            },
            {
                path: '/shop/ratings',
                component: ShopRatings
            },
            {
                path: '/shop/info',
                component: ShopInfo
            },
            {
                path: '',
                redirect: '/shop/goods'
            },
        ]
    },
]