//路由守卫
import router from "@/router";
import {getToken} from '@/utils/auth';
import usersApi from '@/api/usersApi';

router.beforeEach(async (to, from, next)=>{
    // to:  即将要进入的路由, 路由对象
    // from： 准备离开的路由，路由对象
    // next： 是否能进入下一个钩子
    // if(to.path=='/login' || to.path == '/reg')
    if(to.meta.permission==false)
    {//注册页和登录页不需要拦截
        next();
    }else{
        //如果不是注册和登录页就需要路由拦截
        let token = getToken()
        if(token){
            try{
                let p = await usersApi.checkToken(token);
                if(p.data.flag){
                    next()
                }else{
                    next("/login")
                }
            }catch{
                next("/login")
            }
        }else{
            //如果没有token就直接跳回登录页
            next("/login")
        }
    }
})