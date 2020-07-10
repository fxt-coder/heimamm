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
// 3注册
import Vue from 'vue'
Vue.use(VueRouter)
// 4实例化
const router = new VueRouter({
  routes:[]
})
// 1.
// export{router}
//export {名字} 与 import {名字} 两者要对应起来
//2 
// export default 名字 与 import 名字 from 路径
// 5.注入new Vue ({})
// 6.路由出口
export default router