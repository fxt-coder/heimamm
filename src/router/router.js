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
import layout from '@/views/home/layout.vue'
import chart from '@/views/home/chart/chart.vue'
import userlist from '@/views/home/userlist/userlist.vue'
import question from '@/views/home/question/question.vue'
import business from '@/views/home/business/business.vue'
import subject from '@/views/home/subject/subject.vue'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 4实例化
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/layout'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      redirect:'/home/subject',
      component: layout,
      children: [
        {
          path: '/layout/chart',
          component: chart
        },
        {
          path: '/layout/userlist',
          component: userlist
        },
        {
          path: '/layout/question',
          component: question
        },
        {
          path: '/layout/business',
          component: business
        },
        {
          path: '/layout/subject',
          component: subject
        }
      ]
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