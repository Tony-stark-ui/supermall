<template>
  <div class="home">
    <!-- 顶部导航栏组件 -->
    <nav-bar class="home-nav">
      <h2 slot="center">购物街</h2>
    </nav-bar>

    <!-- 选项卡组件2 -->
    <tab-contro
      class="tab-contro2"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabContro2"
      v-show="tabControFixed"
    ></tab-contro>

    <!-- 封装的滚动组件 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <!-- 轮播图组件 -->
      <!-- 将banners数据通过props传给自己 -->
      <home-swiper
        :banners="banners"
        @swiperImgLoad="swiperImgLoad"
      ></home-swiper>
      <!-- 推荐信息组件 -->
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <!-- 本周推荐组件 -->
      <feature-view></feature-view>
      <!-- 选项卡组件 -->
      <tab-contro
        class="tab-contro"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabContro1"
      ></tab-contro>
      <!-- 商品列表组件 -->
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <!-- 返回顶部组件 -->
    <back-top @click.native="backClick" v-show="isShow"></back-top>
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

// // 引入返回顶部组件
import BackTop from "components/content/backTop/BackTop.vue";

// 引入网络请求模块
import { getHomeMultidata, getHomeGoods } from "network/home";

// 引入封装好的防抖函数
import { debounce } from "../../common/utils";

// 引入封装好的滚动框架
import Scroll from "components/common/scroll/Scroll.vue";

// 引入混入的返回顶部事件
//import { backTopMixin } from "../../common/mixins";

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
    Scroll, //注册封装的滚动组件
    BackTop, //注册返回顶部组件
  },
  // 使用混入
  //mixin: [backTopMixin],

  data() {
    return {
      // 轮播图数据
      banners: [], //这个变量用于保存请求过来的数据
      // 推荐数据
      recommends: [],
      // 选项卡数据
      goods: {
        pop: { page: 0, list: [] }, //存放流行的数据
        new: { page: 0, list: [] }, //存放新品的数据
        sell: { page: 0, list: [] }, //存放精选的数据
      },
      currentType: "pop", //默认请求数据的类型
      isShow: false, //返回顶部按钮默认隐藏
      tabOffsetTop: 0, //保存tabContro的offsetTop
      tabControFixed: false, //默认隐藏第二个tabContro
      saveY: 0, //保存home滚动的位置
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
  // 声明周期函数，销毁组件后调用
  destroyed() {
    console.log(666);
  },

  // 生命周期函数，组件挂载完调用这个函数
  mounted() {
    // 使用防抖动函数
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    // 通过事件总线监听goodsListItem里面图片加载事件
    this.$bus.$on("imgLoad", () => {
      refresh();
    });
  },

  //活跃的时候返回该位置
  activated() {
    //一进入组件就滚动到离开时保存的位置
    this.$refs.scroll.scroll.scrollTo(0, this.saveY, 10);
    //refresh():重新计算 better-scroll,
    this.$refs.scroll.refresh();
  },
  //离开时保存一个位置
  deactivated() {
    //1. 保存离开时的位置
    this.saveY = this.$refs.scroll.scroll.y;
    console.log("home ", this.saveY);
  },

  methods: {
    // 防抖动函数的封装
    // debounce(func, delay) {
    //   let timer = null;
    //   return function (...args) {
    //     if (timer) {
    //       clearTimeout(timer);
    //     }
    //     timer = setTimeout(() => {
    //       func.apply(this, args);
    //     }, delay);
    //   };
    // },
    /**
     * 网络请求相关的方法
     */
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

        this.$refs.scroll.finishPullUp();
      });
    },

    /**
     * 事件监听的方法
     */
    // 自定义点击事件
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabContro2.currentIndex = index;
      this.$refs.tabContro1.currentIndex = index;
    },
    // // 点击返回顶部
    backClick() {
      this.$refs.scroll.callBack();
    },
    // scroll组件的方法，滚动的距离
    contentScroll(position) {
      // 判断backTop是否显示
      this.isShow = Math.abs(position.y) > 1000;

      // 决定tabContro是否吸顶(position:fixed)
      const offsetTop = this.tabOffsetTop - 40;
      this.tabControFixed = Math.abs(position.y) > offsetTop;
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    // 监听轮播图图片加载完成
    swiperImgLoad() {
      // 获取tabContro的offsetTop
      // 所有的组件都有一个属性$el：用于获取组件中的元素
      //  保存tabContro的offsetTop的值
      this.tabOffsetTop = this.$refs.tabContro1.$el.offsetTop;
    },
  },
};
</script>

<style scoped>
/* 主页样式 */
.home {
  /* padding-top: 44px; */
  height: 100vh;
}
/* 顶部导航样式 */
.home-nav {
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; 
  z-index: 999;*/
  background-color: #ff8198;
  color: #fff;
}
/* 选项卡样式 */
.tab-contro2 {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
}
/* 滚动框架 */
.content {
  height: calc(100% - 93px);
  overflow: hidden;
}
/* tabContro吸顶效果 */
/* .tabFixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
</style>>

