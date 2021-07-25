<template>
  <div class="cart-list">
    <scroll class="content">
      <!-- 商品列表 -->
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      ></cart-list-item>
    </scroll>
    <!-- 底部导航栏 -->
    <cart-bottom-bar></cart-bottom-bar>
    <!-- toase -->
    <!-- <toast></toast> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll.vue";
// 引入商品列表组件
import CartListItem from "./CartListItem";
// 引入底部导航栏
import CartBottomBar from "./CartBottomBar.vue";

export default {
  name: "VueCartlist",

  components: {
    Scroll,
    CartListItem, //商品列表组件
    CartBottomBar, //底部导航栏
  },

  directives: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {},
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>

<style scoped>
.cart-list {
  height: 100vh;
  overflow: hidden;
}
.content {
  height: calc(100% - 152px);
}
</style>