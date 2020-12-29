import request from '@/utils/request'


export default {
    //验证用户名是否存在
    checkName(username) {
        return request.get('/user/checkname',{
            params: {
                username
            }
        })
    },

    //注册
    reg(username,password){
        return request.post('/user/reg',{
            username,
            password
        })
    },

    //登录
    login(username, password){
        return request.get('/user/login',{
            params: {
                username,
                password
            }
        })
    },

    //修改密码
    editPsw(username, password, uid){
        return request.put('/user/edit/'+uid,{
            username,
            password
        })
    },

    //校验token
    checkToken(token){
        return request.get('/user/verify', {
            params: {
                token
            }
        })
    },

    //获取用户列表
    getList(page, pagesize, search){
        return request.get('/user/list', {
            params: {
                page,//当前第n页
                pagesize,//一页显示多少条
                search,//查询条件
            }
        })
    },

    //添加新用户
    addUser(form){
        return request({
            method: "post",
            url: 'user/add',
            headers: { 'Content-Type':'multipart/form-data' },
            data: form
        })
    },
    
    //查询某个用户信息
    getuser(id){
        return request.get('/user/getuser/' + id)
    },

     //编辑用户信息
    editUser(form){
        return request({
            method: "put",
            url: "/user/editinf",
            headers: {
                'Content-Type':'multipart/form-data'
            },
            data : form
        })
        
    },

    //删除图片
    delpic(id, url){
        return request({
            method: "delete",
            url: "/user/delimg",
            data: {
                id,
                url
            }
        })
    },

    //删除用户
    delUser(id){
        return request({
            method: "delete",
            url: "/user/del/" + id
        })
    }

}