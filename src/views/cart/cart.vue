<template>
  <div class="cart">
    <!-- 顶部导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
  </div>
</template>

<script>
// 引入顶部导航栏
import NavBar from "components/common/navbar/NavBar";
// 引入商品列表
import CartList from "./childComps/CartList.vue";

// 直接将vuex中的getters转为这里的计算属性
import { mapGetters } from "vuex";

export default {
  components: {
    NavBar, //注册顶部导航兰组件
    CartList, //注册商品列表组件
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength;
    // },
    // 这样可以将vuex中的getters转为计算属性来使用
    ...mapGetters(["cartLength"]),
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: #ff8198;
  color: azure;
  font-size: 18px;
}
</style>