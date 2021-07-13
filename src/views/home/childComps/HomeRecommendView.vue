<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommendItem">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend {
  width: 100%;
  text-align: center;
  display: flex;
  font-size: 12px;
  padding: 15px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommendItem {
  flex: 1;
}
.recommendItem img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>