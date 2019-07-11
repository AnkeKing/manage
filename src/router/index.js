import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'
import Home from '../pages/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path:"*",
      redirect:"/login"
    }
  ]
})
