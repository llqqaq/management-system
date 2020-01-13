import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import index  from '@/views/index.vue'
import login  from '@/views/login.vue'
import users  from '@/views/users.vue'
import roles  from '@/views/roles.vue'
import rights  from '@/views/rights.vue'
import goods  from '@/views/goods.vue'
import categories  from '@/views/categories.vue'
import orders  from '@/views/orders.vue'
import reports  from '@/views/reports.vue'
import params   from '@/views/params.vue'
import error  from '@/views/error.vue'
import goodself  from '@/views/goodself.vue'
import goodadd  from '@/views/goodadd.vue'
// const index = () => import('@/views/index.vue')
// const login = () => import('@/views/login.vue')
// const users = () => import('@/views/users.vue')
// const roles = () => import('@/views/roles.vue')
// const rights = () => import('@/views/rights.vue')
// const goods = () => import('@/views/goods.vue')
// const categories = () => import('@/views/categories.vue')
// const orders = () => import('@/views/orders.vue')
// const reports = () => import('@/views/reports.vue')
// const params  = () => import('@/views/params.vue')
// const error = () => import('@/views/error.vue')
// const goodself = () => import('@/views/goodself.vue')
// const goodadd = () => import('@/views/goodadd.vue')
/* 规则 */
const routes = [
    {
      path: '/',
      redirect: '/login' 
    },
    {
      path: '/index',
      component: index,
      children: [
        {
          path: 'users',
          component: users
        },
        {
          path: 'roles',
          component: roles
        },
        {
          path: 'rights',
          component: rights
        },
        {
          path: 'goods',
          component: goods,
          children: [
            {
              path: '',
              component: goodself
            },
            {
              path: 'add',
              component: goodadd
            }
          ]
        },
        {
          path: 'categories',
          component: categories
        },
        {
          path: 'orders',
          component: orders
        },
        {
          path: 'reports',
          component: reports
        },
        {
          path: 'params',
          component: params
        }
      ]
    },
    {
      path: '/login',
      component: login,
      meta: {
        needLogin: false
      }
    },
    {
      path: '/error',
      component: error
    },
    {
      path: '*',
      redirect: '/error'
    }
  ]
  /* 路由对象 */
  const router = new VueRouter({
    routes
  })

/* 导航守卫 */
router.beforeEach((to,from,next) => {
  if(to.meta.needLogin != false){
    if(window.sessionStorage.getItem('token') != undefined ){
      next()
    }else{
      new Vue().$message.error('请先登录')
      router.push('/login')
    }
  }else{
    next()
  }
})


/* 暴露 */
export default router