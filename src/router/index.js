import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Main from '../pages/Main';
import Default from '../pages/MainChild/Default';
import Users from '../pages/MainChild/Users';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/home',
      name: 'home',
      component: Home,
      redirect: '/main',
      children:[

        {
          path: '/main',
          name: 'main',
          component: Main,
          redirect: '/default',
          children:[
            {
            path: '/default',
            name: 'default',
            component: Default
          },
            {
              path: '/users',
              name: 'users',
              component: Users
            },
          ]
        }
      ]
    },
    {
      path:"*",
      redirect:"/login"
    }
  ],
  
})
