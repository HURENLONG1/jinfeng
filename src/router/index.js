import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Reg from '../views/reg/index.vue'
import Home from '../views/home/index.vue'
import appGoods from '../views/appGoods/index.vue'
import appOrders from '../views/appOrders/index.vue'
import appShops from '../views/appShops/index.vue'
import appUsers from '../views/appUsers/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: '/home',
    component: Login
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {//元信息
      permission: false //写了这句代码就意味着不需要拦截
    }
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg,
    meta: {//元信息
      permission: false //写了这句代码就意味着不需要拦截
    }
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/users',
    component: Home,
    children:[
      {
        path: 'goods',
        name: 'goods',
        component: appGoods,
        meta: {
          title: '商品管理'
        }
      },
      {
        path: 'orders',
        name: 'orders',
        component: appOrders,
        meta: {
          title: '订单管理'
        }
      },
      {
        path: 'shops',
        name: 'shops',
        component: appShops,
        meta: {
          title: '商铺管理'
        }
      },
      {
        path: 'users',
        name: 'users',
        component: appUsers,
        meta: {
          title: '用户管理'
        }
      }
    ]
  },

]

const router = new VueRouter({
  mode: "history",//默认是哈希模式，现在将其更改为history模式
  routes
})

export default router
