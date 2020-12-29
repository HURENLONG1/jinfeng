<template>
  <div class="navbar">
    <el-menu
      :router="true"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item :index="item.path" v-for="item in menuList" :key="item.path">
        <i :class="item.icon"></i>
        <!-- <router-link tag="span" :to="item.path">{{item.title}}</router-link> -->
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
  
<script>
export default {
  data(){
    return {
      menuList:[
        {
          path: '/home/users',
          icon: 'el-icon-user-solid',
          title: '用户管理'
        },
        {
          path: '/home/goods',
          icon: 'el-icon-goods',
          title: '商品管理'
        },
        {
          path: '/home/orders',
          icon: 'el-icon-s-promotion',
          title: '订单管理'
        },
        {
          path: '/home/shops',
          icon: 'el-icon-s-shop',
          title: '商铺管理'
        },
      ],
    }
  },
  // methods: {
   
  // },
};
</script>

<style>
</style>