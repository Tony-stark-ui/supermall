<template>
  <div class="category-side">
    <div
      v-for="(item, index) in classify"
      class="side-item"
      @click="itemClick(index)"
      :class="{ active: index === currentIndex }"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "VueCategoryside",
  props: {
    classify: {
      type: Array,
    },
  },

  components: {},

  directives: {},

  data() {
    return {
      currentIndex: 0,
    };
  },

  mounted() {},

  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("SelectItem", index);
    },
  },
  computed: {},
};
</script>

<style scoped>
.category-side {
  flex-grow: 0;
  width: 100px;
  background-color: #f6f6f6;
}
.side-item {
  width: 100px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}
.active {
  background-color: #fff;
  border-left: 3px solid #ff8198;
  color: #ff8198;
}
</style>