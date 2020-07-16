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
import NProgress from 'nprogress'
import '@/nprogress/nprogress.css'
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
      redirect: '/login'
    },
    {
      path: '/login',
      component: login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/home',
      redirect: '/home/chart',
      component: layout,
      children: [
        {
          path: '/home/chart',
          component: chart,
          meta: {
            title: '数据概览',
            icon: 'el-icon-pie-chart'
          }
        },
        {
          path: '/home/userlist',
          component: userlist,
          meta: {
            title: '用户列表',
            icon: 'el-icon-user'
          }
        },
        {
          path: '/home/question',
          component: question,
          meta: {
            title: '题库列表',
            icon: 'el-icon-edit-outline'
          }
        },
        {
          path: '/home/business',
          component: business,
          meta: {
            title: '企业列表',
            icon: 'el-icon-office-building'
          }
        },
        {
          path: '/home/subject',
          component: subject,
          meta: {
            title: '学科列表',
            icon: 'el-icon-notebook-2'
          }
        }
      ]
    }
  ]
})
// 路由导航守卫
router.beforeEach((to, from, next) => {
  // window.console.log(to);
  // window.console.log(from);
  NProgress.start()
  next()
})
router.afterEach((to) => {
  NProgress.done()
  // window.console.log(to);
  // window.console.log(from);
  document.title = to.meta.title
})

// 1.
// export{router}
//export {名字} 与 import {名字} 两者要对应起来
//2 
// export default 名字 与 import 名字 from 路径
// 5.注入new Vue ({})
// 6.路由出口
export default router