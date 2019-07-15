import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Main from '../pages/Main';
import Default from '../pages/MainChild/Default';
import Users from '../pages/MainChild/Users';
import Roles from '../pages/MainChild/Roles';
import Rights from '../pages/MainChild/Rights';
import GoodsMain from '../pages/MainChild/GoodsMain';
import Goods from '../pages/MainChild/GoodsMain/Goods';
import AddGoods from '../pages/MainChild/GoodsMain/AddGoods';
import Params from '../pages/MainChild/Params';
import Categories from '../pages/MainChild/Categories';
import Orders from '../pages/MainChild/Orders';
import Reports from '../pages/MainChild/Reports';

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/home',
      name: 'home',
      component: Home,
      redirect: '/main',
      meta: {
        requireAuth: true
      },
      children: [

        {
          path: '/main',
          name: 'main',
          component: Main,
          redirect: '/default',
          children: [
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
            {
              path: '/roles',
              name: 'roles',
              component: Roles
            }, {
              path: '/rights',
              name: 'rights',
              component: Rights
            }, {
              path: '/goodsMain',
              name: 'goodsMain',
              component: GoodsMain,
              redirect: '/goods',
              children: [
                {
                  path: '/goods',
                  name: 'goods',
                  component: Goods
                },
                {
                  path: '/addGoods',
                  name: 'goods/addGoods',
                  component: AddGoods
                }
              ]
            }, {
              path: '/params',
              name: 'params',
              component: Params
            }, {
              path: '/categories',
              name: 'categories',
              component: Categories
            }, {
              path: '/orders',
              name: 'orders',
              component: Orders
            }, {
              path: '/reports',
              name: 'reports',
              component: Reports
            },
          ]
        }
      ]
    },
    {
      path: "*",
      redirect: "/login"
    }
  ],

})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {//判断要跳转的页面是否需要登录
    if (store.state.token) {//如果需要则判断是否有token
      next();
    } else {
      // console.log("路由守卫传参：",to);
      next({ path: '/login' });
    }
  }
  next();
})
export default router