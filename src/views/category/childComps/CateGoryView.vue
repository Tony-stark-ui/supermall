<template>
  <div>
    <grid-view
      :cols="3"
      :lineSpace="15"
      :v-margin="20"
      v-if="subcategories.list"
    >
      <div
        class="item"
        v-for="(item, index) in subcategories.list"
        :key="index"
      >
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="" @load="imgload" />
          <div class="item-text">{{ item.title }}</div>
        </a>
      </div>
    </grid-view>
    <tab-contro
      :titles="titles"
      v-if="isShow"
      @tabClick="tabClick"
      class="tab-contro"
    ></tab-contro>
    <category-detail
      v-if="isShow"
      :categoryDetail="categoryDetail"
    ></category-detail>
  </div>
</template>

<script>
import GridView from "../../../components/common/gridView/GridView";
// tabbarcontro
import TabContro from "components/content/tabContro/TabContro";
import CategoryDetail from "./CategoryDetail";
export default {
  name: "VueCategoryview",
  props: {
    subcategories: {
      type: Object,
      default() {
        return [];
      },
    },
    categoryDetail: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  components: { GridView, TabContro, CategoryDetail },

  directives: {},

  data() {
    return {
      titles: ["综合", "新品", "销量"],
      isShow: false,
    };
  },

  mounted() {},

  methods: {
    imgload() {
      this.isShow = true;
    },
    tabClick(index) {
      this.$emit("tabClick", index);
      console.log(this.categoryDetail);
    },
  },
};
</script>

<style scoped>
.panel img {
  width: 100%;
}

.item {
  text-align: center;
  font-size: 12px;
}

.item-img {
  width: 80%;
}

.item-text {
  margin-top: 15px;
}
.tab-contro {
  position: sticky;
  top: 44px;
}
</style>