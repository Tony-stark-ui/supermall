<template>
  <div class="tab-contro">
    <div
      v-for="(item, index) in titles"
      class="tab-contro-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style>
.tab-contro {
  z-index: 999;
  display: flex;
  background-color: #fff;
}
.tab-contro-item {
  flex: 1;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  text-align: center;
}
.active {
  color: var(--color-high-text);
}
.tab-contro-item span {
  padding: 0 5px 5px;
}
.active span {
  border-bottom: 3px solid var(--color-high-text);
}
</style>