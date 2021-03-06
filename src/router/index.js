/*
1安装
2导入
3.注册
4实例化
5注入到new Vue({})
6路由出口
*/
//2导入
import VueRouter from 'vue-router';
import Vue from 'vue'
// 3注册
Vue.use(VueRouter)
import login from '@/views/login/login.vue'
// 4实例化
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login
    }
  ]
})
// 1.
// export{router}
//export {名字} 与 import {名字} 两者要对应起来
//2 
// export default 名字 与 import 名字 from 路径
// 5.注入new Vue ({})
// 6.路由出口
export default router