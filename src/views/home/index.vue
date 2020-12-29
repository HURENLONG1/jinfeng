<template>
    <div>
        <!-- <div class="header">头</div>   
        <div class="navbar">导航</div>
        <div class="main">内容</div> -->
        <app-head></app-head>
        <app-navbar></app-navbar>
        <!-- <AppMain></AppMain> -->
        <router-view></router-view>


    </div>
</template>

<script>
import appHead from "@/components/AppHeader"
import AppNavbar from "@/components/AppNavbar"
import AppMain from "@/components/AppMain"
export default {
    // data(){

    // },
    components:{appHead, AppNavbar},
    methods:{}
}
</script>

<style scoped>
    .header{
        position: absolute;
        line-height: 51px;
        padding: 0;
        top: 0%;
        left: 0;
        right: 0;
        background-color: #2b3a4b;
    }
    .navbar{
        position: absolute;
        width: 230px;
        top: 50px;
        left: 0;
        bottom:0;
        overflow-y: auto;
        background-color: #545c64;
    }
    .main{
        position: absolute;
        top: 50px;
        left: 230px;
        right: 0;
        bottom:0;
        padding: 10px;
        overflow-y: auto;
        /* background-color: red; */
    }
</style>