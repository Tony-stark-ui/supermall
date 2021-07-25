<template>
  <div>
    <grid-view>
      <goods-list-item
        v-for="(item, index) in categoryDetail"
        :key="index"
        :goodsItem="item"
        class="goods-list-item"
      ></goods-list-item>
    </grid-view>
  </div>
</template>

<script>
import GridView from "../../../components/common/gridView/GridView.vue";
import GoodsListItem from "../../../components/content/goods/GoodsListItem.vue";
export default {
  name: "VueCategorydetail",
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  components: { GridView, GoodsListItem },

  directives: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.goods-list-item {
  position: relative;
  z-index: -100;
}
</style>