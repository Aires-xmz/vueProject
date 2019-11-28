import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from 'pages/index/Layout'
import Home from 'pages/index/Home'
import Other from 'pages/index/Other'
import Detail from 'pages/details/Detail'
import User from 'pages/details/User'
import Album from 'pages/Album'
import Atlas from 'pages/Atlas'
import Classify from 'pages/Classify'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/index/home'
  },
  {
    name: 'layout',
    path: '/index',
    redirect: '/index/home',
    component: Index,
    children: [{
        name: 'home',
        path: 'home',
        component: Home
      },
      {
        name: 'other',
        path: 'other',
        component: Other
      },
      {

        name: 'detail',
        path: 'detail',
        component: Detail
      },
      {
        name: 'user',
        path: 'user',
        component: User
      },
      {
        name: 'album',
        path: 'album',
        component: Album
      },
      {
        name: 'atlas',
        path: 'atlas',
        component: Atlas
      },
      {
        name: 'classify',
        path: 'classify',
        component: Classify
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router