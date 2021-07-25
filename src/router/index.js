import Vue from 'vue';
import VueRouter from 'vue-router';

// 安装插件
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// tabbar模块懒加载
const Home = () => import('views/home/home.vue')
const Category = () => import('views/category/category.vue')
const Cart = () => import('views/cart/cart.vue')
const Profile = () => import('views/profile/profile.vue');
const Detail = () => import('views/detail/Detail.vue')

// 配置映射关系
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  // 首页
  {
    path: '/home',
    component: Home
  },
  // 分类
  {
    path: '/category',
    component: Category
  },
  // 购物车
  {
    path: '/cart',
    component: Cart
  },
  // 我的
  {
    path: '/profile',
    component: Profile
  },
  // 详情页
  {
    // 动态路由传入id
    path: '/detail/:id',
    component: Detail
  }
]


// 导出路由
export default new VueRouter({
  routes,
  mode: 'history'
})