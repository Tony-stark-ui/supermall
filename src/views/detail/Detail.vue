<template>
  <div id="detail">
    <!-- 顶部导航了 -->
    <detail-nav-bar @titleClick="titleClick" ref="navbar"></detail-nav-bar>

    <scroll class="content" ref="scroll" @scroll="scroll" :probeType="3">
      <!-- 轮播图 -->
      <detailswiper :top-images="topImages"></detailswiper>
      <!-- 商品信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 商品详情 -->
      <detail-info :detail-info="detailInfo" @imageLoad="imgLoad"></detail-info>
      <!-- 商品参数 -->
      <detail-param-info
        ref="param"
        :param-info="paramInfo"
      ></detail-param-info>
      <!-- 用户评论 -->
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <!-- 推荐商品 -->
      <goods-list ref="recommend" :goods="recommend"></goods-list>
    </scroll>
    <!-- 返回顶部组件 -->
    <back-top @click.native="backClick" v-show="isShow"></back-top>
    <!-- 底部导航栏 -->
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <!-- toase组件 -->
    <toast></toast>
  </div>
</template>

<script>
// 引入封装好的顶部导航组件
import DetailNavBar from "./childComps/DetailNavBar.vue";
// 引入轮播图组件
import Detailswiper from "./childComps/DetailSwiper.vue";
// 引入商品信息组件
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
// 引入店铺信息组件
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
// 引入商品详情组件
import DetailInfo from "./childComps/DetailInfo.vue";
// 引入商品参数组件
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
// 引入用户评论组件
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
// 引入推荐组件
import GoodsList from "components/content/goods/GoodsList";
// 引入底部导航栏
import DetailBottomBar from "./childComps/DeatilBottomBar.vue";
// 引入返回顶部组件
import BackTop from "components/content/backTop/BackTop.vue";
// 引入混入的返回顶部事件
//import { backTopMixin } from "../../common/mixins";
// 引入toase组件
import Toast from "components/common/toast/Toast.vue";

import { mapActions } from "vuex";

// 引入网络请求
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

// 引入滚动插件
import Scroll from "components/common/scroll/Scroll.vue";

export default {
  name: "Detail",
  components: {
    DetailNavBar, //注册顶部导航组件
    Detailswiper, //注册轮播图组件
    DetailBaseInfo, //注册商品信息组件
    DetailShopInfo, //注册店铺信息组件
    Scroll, //注册滚动插件
    DetailInfo, //注册商品详情组件
    DetailParamInfo, //注册商品参数组件
    DetailCommentInfo, //注册评论组件
    GoodsList, //注册推荐组件
    DetailBottomBar, //注册底部导航栏组件
    BackTop, //注册返回顶部组件
    Toast, //注册toase组件
  },
  // 使用混入
  //mixin: [backTopMixin],

  data() {
    return {
      // 保存商品id
      iid: null,
      // 轮播图数据
      topImages: [],
      // 商品基本信息数据
      goods: {},
      // 店铺信息
      shop: {},
      // 商品详情
      detailInfo: {},
      // 商品参数
      paramInfo: {},
      // 评论信息
      commentInfo: {},
      // 推荐数据
      recommend: [],
      // 导航栏位置
      themeTops: [],
      // 记录i的值
      currentIndex: 0,
      //返回顶部按钮默认隐藏
      isShow: false,
      // toase显示的内容
      // message: "加入购物车成功",
      // show: false,
    };
  },

  // 生命周期函数，组件创建完后拿到路由中的id
  created() {
    // 通过$route拿到路由中的params中的id
    this.iid = this.$route.params.id;

    // 发送网络请求
    this.getDetail();
  },

  mounted() {
    // this.$refs.scroll.refresh();
  },

  methods: {
    ...mapActions(["addCart"]),
    // 请求数据
    getDetail() {
      getDetail(this.iid).then((res) => {
        console.log("详情页数据");
        console.log(res);
        const data = res.result;
        // 获取轮播图数据
        this.topImages = data.itemInfo.topImages;
        // 获取商品基本信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 获取店铺信息
        this.shop = new Shop(data.shopInfo);
        // 获取商品详情
        this.detailInfo = data.detailInfo;
        // 商品参数数据
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        // 评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
        console.log("评论数据");
        console.log(this.commentInfo);
      });
      getRecommend().then((res) => {
        this.recommend = res.data.list;
        console.log(res.data.list);
      });
    },

    // 自定义方法，图片加载完成
    imgLoad() {
      this.$refs.scroll.refresh();
      // 获取组件offsett
      this.themeTops.push(0);
      // 获取组件的offse不能直接获取，要加一个$el才可以获取
      this.themeTops.push(this.$refs.param.$el.offsetTop);
      this.themeTops.push(this.$refs.comment.$el.offsetTop);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTops);
    },
    // 点击导航栏跳到对应的位置
    titleClick(index) {
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTops[index], 500);
    },
    // 滚动到某个位置导航栏变色
    scroll(position) {
      // 滚动到某个位置导航栏变色
      const positionY = -position.y;
      let length = this.themeTops.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((positionY >= this.themeTops[i] &&
            positionY < this.themeTops[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTops[i]))
        ) {
          this.currentIndex = i;
          this.$refs.navbar.currentIndex = this.currentIndex;
        }
      }
      // 判断backTop是否显示
      this.isShow = Math.abs(position.y) > 1000;
    },
    // 点击返回顶部
    backClick() {
      this.$refs.scroll.callBack();
    },
    // 接收发送的添加购物车事件
    addToCart() {
      // 获取购车车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.tltle = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 将商品添加到购物车
      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });
      this.addCart(product).then((res) => {
        console.log(res);
      });
      this.$toast.show("添加成功", 1500);
    },
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 99;
}

/*滚动框架*/
.content {
  height: calc(100% - 102px);

  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow: hidden;
  background-color: #fff;
}
</style>