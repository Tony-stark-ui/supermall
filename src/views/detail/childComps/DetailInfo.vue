<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>

    <div
      class="info-list"
      v-for="(item, index) in detailInfo.detailImage[0].list"
    >
      <img :src="item" @load="imgLoad" alt="" />
    </div>
  </div>
</template>

<script>
import { debounce } from "../../../common/utils";
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
    },
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0,
    };
  },
  watch: {
    detailInfo() {
      // 获取图片的个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    },
  },
  created() {
    // // //自动刷新页面函数
    // function refresh() {
    //   let url = location.href;
    //   let once = url.split("#");
    //   if (once[1] != 1) {
    //     url += "#1";
    //     self.location.replace(url);
    //     window.location.reload();
    //   }
    //   console.log(url);
    //   // url = url.slice(0, url.length - 2);
    //   // console.log(url);
    // }
    // setTimeout(() => {
    //   refresh();
    // }, 0);
    // console.log(this.$route.path);
  },

  methods: {
    imgLoad() {
      //判断, 所有的图片都加载完了, 那么进行一次回调就可以了.
      if (++this.counter === this.imagesLength) {
        this.$emit("imageLoad");
      }
      // debounce(this.$emit("imageLoad"), 50);
    },
  },
};
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  position: relative;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}

.info-list img {
  width: 100%;
}
</style>
