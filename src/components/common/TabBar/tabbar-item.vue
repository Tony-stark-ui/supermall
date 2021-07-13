<template>
  <div id="tabbaritem" @click="tabClick">
    <div v-if="!isActive"><slot name="img1"></slot></div>
    <div v-else><slot name="img2"></slot></div>
    <div :class="{ active: isShow }"><slot name="text"></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    path: String,
  },
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) != -1;
    },
  },
  methods: {
    tabClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style>
#tabbaritem {
  flex: 1;
  text-align: center;
  height: 49px;
}
#tabbaritem img {
  width: 24px;
  height: 24px;
  margin-top: 5px;
}
.active {
  color: #e172a8;
}
</style>