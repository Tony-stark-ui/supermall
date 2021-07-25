<template>
  <swiper class="detail-swiper">
    <swiper-item class="swiper-item" v-for="item in topImages">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
// 引入轮播图
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "Detailswiper",

  // 轮播图数据
  props: {
    topImages: {
      type: Array,
      defaule() {
        return [];
      },
    },
  },

  components: {
    Swiper,
    SwiperItem,
  },

  directives: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>