import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout/index.vue'),
    children:[
      {
        path: '',
        name: 'home',
        component: () => import('@/views/layout/home/index.vue')
      },{
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/layout/qa/qa.vue')
      },{
        path: '/video',
        name: 'video',
        component: () => import('@/views/layout/video/index.vue')
      },{
        path: '/my',
        name: 'my',
        component: () => import('@/views/layout/my/index.vue')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
