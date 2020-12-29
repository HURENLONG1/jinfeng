// const { default: request } = require("../utils/request");

// request({
//     method: 'get',
//     url: '/weibo/api/config/list'
// }).then(res =>{
//     console.log(res.data);
// }).catch(err =>{

// });
//http://www.people.com.cn/rss/rect_default.json?1607353
import request from '@/utils/request';
request({
    method: 'get',
    url: '/people/rss/rect_default.json?1607353'
}).then(res =>{
    console.log(res.data);
}).catch(err =>{

});

let baseurl = process.env.VUE_APP_BASE_API
request({
    method: 'get',
    url: baseurl+'/hao123_api/page/getRootData?vit=h123&from=3w123&sample=1'
}).then(res =>{
    console.log(res);
}).catch(err =>{

});

console.log((process.env.VUE_APP_PORT))