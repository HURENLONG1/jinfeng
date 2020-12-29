//这里是二次封装axios
import axios from 'axios';//引入axios

//封装
let request = axios.create({
    baseURL: '/dev-api',//基础路径
    timeout: 3000,//设置请求超时时间：如果3秒后没有响应，就会断开请求
})



export default request 