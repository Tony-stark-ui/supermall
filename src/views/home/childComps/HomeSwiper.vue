<template>
  <swiper>
    <!-- 通过循环的方式将banners里面的数据传给轮播图 -->
    <swiper-item v-for="item in banners">
      <!-- 这里通过v-bind动态绑定变量里面的属性 -->
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
//引入轮播图组件
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  // 这里没有数据要通过props拿到父组件中的数据
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>
/
<style>
</style>