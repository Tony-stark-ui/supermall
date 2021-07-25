<template>
  <div class="category">
    <cate-gory-top-bar class="cate-gory-top-bar"></cate-gory-top-bar>

    <div class="conter">
      <cate-gory-side
        :classify="categories"
        @SelectItem="SelectItem"
        class="side"
      ></cate-gory-side>
      <cate-gory-view
        :subcategories="showSubcategory"
        class="categroy-view"
        :category-detail="showCategoryDetail"
        @tabClick="tabClick"
      ></cate-gory-view>
    </div>
  </div>
</template>

<script>
// 网络请求
import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "../../network/category";
// 顶部导航栏
import CateGoryTopBar from "./childComps/CateGoryTopBar.vue";
// 侧边栏
import CateGorySide from "./childComps/CateGorySide.vue";
// 商品部分
import CateGoryView from "./childComps/CateGoryView.vue";

export default {
  name: "VueCategory",

  components: {
    CateGoryTopBar, //顶部导航兰
    CateGorySide, //侧栏
    CateGoryView, //商品列表
  },

  directives: {},

  data() {
    return {
      // 分类数据
      categories: [],
      // 商品数据
      categoryData: {},
      currentIndex: -1,
      currentType: "pop",
    };
  },
  created() {
    // 请求数据
    this.getCategory();
  },

  mounted() {},

  methods: {
    getCategory() {
      getCategory().then((res) => {
        console.log(res);
        // 保存侧栏数据
        this.categories = res.data.category.list;
        // 初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        this.getSubcategories(0);
      });
    },
    // 根据分类的下表请求对应数据
    getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this.getCategoryDetail("pop");
        this.getCategoryDetail("sell");
        this.getCategoryDetail("new");
      });
    },
    // 根据类型请求对应商品数据
    getCategoryDetail(type) {
      // 1)获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2)发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 3)将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    // 侧边栏点击事件
    SelectItem(index) {
      // this.currentIndex = index;
      this.getSubcategories(index);
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
    },
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) {
        return {};
      }
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) {
        return [];
      }
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
};
</script>

<style scoped>
.cate-gory-top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
}
.conter {
  display: flex;
}
.side {
  width: 100px;
  position: fixed;
  top: 44px;
}
.tab-contro {
  position: absolute;
  width: calc(100% - 101px);
  z-index: 3;
  right: 0;
  bottom: 0;
}
/* #tab-content {
  overflow: hidden;
  height: calc(100vh - 49px - 44px);
  /* flex: 1; 
} */
.categroy-view {
  margin-left: 100px;
  margin-top: 44px;
  margin-bottom: 59px;
}
</style>