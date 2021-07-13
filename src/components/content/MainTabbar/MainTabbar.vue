<template>
  <tabbar>
    <tabbar-item path="/home">
      <img slot="img1" src="~assets/img/tabbar/首页.png" alt="" />
      <img slot="img2" src="~assets/img/tabbar/首页 (1).png" alt="" />
      <div slot="text">首页</div>
    </tabbar-item>
    <tabbar-item path="/category">
      <img slot="img1" src="~assets/img/tabbar/标签.png" alt="" />
      <img slot="img2" src="~assets/img/tabbar/标签 (1).png" alt="" />
      <div slot="text">分类</div>
    </tabbar-item>
    <tabbar-item path="/cart">
      <img slot="img1" src="~assets/img/tabbar/记录.png" alt="" />
      <img slot="img2" src="~assets/img/tabbar/记录 (1).png" alt="" />
      <div slot="text">购物车</div>
    </tabbar-item>
    <tabbar-item path="/profile">
      <img slot="img1" src="~assets/img/tabbar/会员.png" alt="" />
      <img slot="img2" src="~assets/img/tabbar/会员 (1).png" alt="" />
      <div slot="text">我的</div>
    </tabbar-item>
  </tabbar>
</template>

<script>
import tabbar from "common/TabBar/tabbar.vue";
import TabbarItem from "common/TabBar/tabbar-item.vue";
export default {
  components: {
    tabbar,
    TabbarItem,
  },
};
</script>

<style>
</style>