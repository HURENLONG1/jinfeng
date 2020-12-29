import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//这个是完整引入方式：缺点：文件较大，最好换成按需引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import md5 from'js-md5';
import './permission'//路由守卫
Vue.prototype.$md5 = md5;//md5加密

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
