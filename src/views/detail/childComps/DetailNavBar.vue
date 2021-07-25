<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="left" class="back">
        <img src="~assets/img/common/back.svg" alt="" @click="backClick" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          class="title-item"
          :class="{ active: index === currentIndex }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "VueDetailnavbar",

  components: {
    NavBar,
  },

  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },

  mounted() {},

  methods: {
    // 导航点击切换颜色
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    // 点击返回上一页
    backClick() {
      // 这个方法是路由回退
      this.$router.go(-1);
    },
  },
};
</script>

<style  scoped>
.nav-bar {
  border-bottom: 1px solid #eee;
}
.title {
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 13px;
}
.active {
  color: #e172a8;
}
.back img {
  margin-top: 11px;
}
</style>