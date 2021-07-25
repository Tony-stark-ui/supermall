<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
// import BScroll from "@better-scroll/core";
// import ObserveDom from "@better-scroll/observe-dom";
// import Pullup from "@better-scroll/pull-up";
// BScroll.use(Pullup);
// BScroll.use(ObserveDom);
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: {},
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      //observeDOM: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      // mouseWheel: false,
      // isableMouse: false,
      // disableTouch: false,
      //pullUpLoad: true,
    });
    // 监听滚动位置
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });

    // 监听上拉加载更多
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    // f返回顶部
    callBack() {
      this.scroll.scrollTo(0, 0, 500);
    },
    // 上拉加载更多，有这个属性才能监听上拉加载更多事件
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
    },
    // 重新计算高度
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },
  watch: {
    data() {
      setTimeout(this.refresh, 20);
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
}
</style>>
