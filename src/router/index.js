import Vue from 'vue';
import VueRouter from 'vue-router';

// 安装插件
Vue.use(VueRouter);
// tabbar模块懒加载
const Home = () => import('views/home/home.vue')
const Category = () => import('views/category/category.vue')
const Cart = () => import('views/cart/cart.vue')
const Profile = () => import('views/profile/profile.vue')

// 配置映射关系
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]


// 导出路由
export default new VueRouter({
  routes,
  mode: 'history'
})