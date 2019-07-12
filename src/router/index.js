import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Main from '../pages/Main';
import UserList from '../pages/MainChild/UserList';

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
      component: Home,
      redirect: '/main',
      children:[

        {
          path: '/main',
          name: 'main',
          component: Main,
          redirect: '/userList',
          children:[
            {
              path: '/userList',
              name: 'userList',
              component: UserList
            }
          ]
        }
      ]
    },
    {
      path:"*",
      redirect:"/login"
    }
  ]
})
