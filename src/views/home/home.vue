<template>
  <div class="home">
    <!-- 顶部导航栏组件 -->
    <nav-bar class="home-nav">
      <h2 slot="center">购物街</h2>
    </nav-bar>
    <!-- 轮播图组件 -->
    <!-- 将banners数据通过props传给自己 -->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 推荐信息组件 -->
    <home-recommend-view :recommends="recommends"></home-recommend-view>
    <!-- 本周推荐组件 -->
    <feature-view></feature-view>
    <!-- 选项卡组件 -->
    <tab-contro
      class="tab-contro"
      :titles="['流行', '新款', '精选']"
    ></tab-contro>
    <!-- 商品列表组件 -->
    <goods-list :goods="goods['pop'].list"></goods-list>
  </div>
</template>

<script>
// 引入顶部导航栏组件
import NavBar from "components/common/navbar/NavBar";

//引入轮播图组件
// import { Swiper, SwiperItem } from "components/common/swiper";  //这里将轮播图模块又抽取出去了，在childComps文件夹的HomeSwoper文件里面

// 引入抽取出的轮播图模块
import HomeSwiper from "./childComps/HomeSwiper.vue";

// 引入推荐信息模块
import HomeRecommendView from "./childComps/HomeRecommendView.vue";

// 引入本周流行模块
import FeatureView from "./childComps/FeatureView.vue";

// 引入选项卡模块
import TabContro from "components/content/tabContro/TabContro";

// 引入商品列表模块
import GoodsList from "components/content/goods/GoodsList";

// 引入网络请求模块
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  components: {
    NavBar, //注册顶部导航栏组件
    // Swiper, //注册轮播图组件
    // SwiperItem,
    HomeSwiper, //注册抽取出的轮播图组件
    HomeRecommendView, //注册推荐信息组件
    FeatureView, //注册本周流行组件
    TabContro, //注册选项卡组件
    GoodsList, //注册商品列表模块
  },

  data() {
    return {
      // 轮播图数据
      banners: [], //这个变量用于保存请求过来的数据
      // 推荐数据
      recommends: [],
      // 选项卡数据
      goods: {
        pop: { page: 0, list: [] }, //存放流行的数据
        news: { page: 0, list: [] }, //存放新品的数据
        sell: { page: 0, list: [] }, //存放精选的数据
      },
    };
  },
  // 生命周期函数，组件创建好后就发送网络请求
  created() {
    // 1. 请求多个数据
    // 请求首页数据
    this.getHomeMultidata();
    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    // 请求首页数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        console.log(res);
        // 轮播图数据
        this.banners = res.data.banner.list; //将请求到的数据传递给这个变量保存到data中
        // 推荐信息数据
        this.recommends = res.data.recommend.list;
      });
    },
    // 请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style>
.home {
  padding-top: 44px;
}
.home-nav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
  background-color: #ff8198;
  color: #fff;
}
.tab-contro {
  position: sticky;
  top: 44px;
}
</style>