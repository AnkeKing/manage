import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('../pages/Home')
const Login= () => import('../pages/Login')
const Main = () => import('../pages/Main')
const Default = () => import('../pages/MainChild/Default')
const Users = () => import('../pages/MainChild/Users')
const Roles = () => import('../pages/MainChild/Roles')
const Rights = () => import('../pages/MainChild/Rights')
const GoodsMain = () => import('../pages/MainChild/GoodsMain')
const Goods = () => import('../pages/MainChild/GoodsMain/Goods')
const AddGoods = () => import('../pages/MainChild/GoodsMain/AddGoods')
const Params = () => import('../pages/MainChild/Params')
const Categories = () => import('../pages/MainChild/Categories')
const Orders = () => import('../pages/MainChild/Orders')
const Reports = () => import('../pages/MainChild/Reports')

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