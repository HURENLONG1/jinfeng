//封装cookie的方法
let tokenkey = 'jinfeng';
let userkey = 'jinfeng-user'


function setCookie(key, value, iDay){
    //key：键名 value：键值  iDay：失效的时间
    //document.cookie = 'name=malin; expires=20190527;path=/'
    var now = new Date();
    now.setDate(now.getDate()+iDay);//iDay:5天后失效，-1：立即失效
    document.cookie = key + '=' + value + ';expires' + now +';path=/'
    if(iDay){
        document.cookie = key + '=' + value + ';expires' + now +';path=/'
    }else{
        document.cookie = key + '=' + value  + now +';path=/'
    }
}

function getCookie(key){
    //获取cookie值
    var str = document.cookie;
    // console.log(str, "1");
    var arr = str.split(';');
    // console.log(arr);
    for(var ele of arr){
        var arr2 = ele.split('=');
        if(key==arr2[0]){
            return arr2[1]
        }
    }
    console.log(arr[1]);
}


function removeCookie(key){
    //删除cookie，把这个值变成失效
    setCookie(key, '', -1)//设置成过去的时间
}

export function SetToken(value, days) {
    //value:传入的token值； days：保留的天数
    setCookie(tokenkey, value, days)
} 

//设置用户名
export function setUser(value, days) {

    //value：传入的用户信息； days：保留的天数
    setCookie(userkey, value, days)
}

//获取token
export function getToken() { 
    return getCookie(tokenkey)
}

//获取用户名
export function getUser() { 
    // console.log();
    return getCookie(userkey)
    
}

//退出
export function logOut(){
    removeCookie(tokenkey);
    removeCookie(userkey);
}