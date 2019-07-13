import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Main from '../pages/Main';
import Default from '../pages/MainChild/Default';
import Users from '../pages/MainChild/Users';

Vue.use(Router)

var router= new Router({
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
      meta:{
        requireAuth: true
      },
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
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {//判断要跳转的页面是否需要登录
    if (store.state.token) {//如果需要则判断是否有token
      next();
    } else {
      // console.log("路由守卫传参：",to);
      next({ path: '/login'});
    }
  }
  next();
})
export default router