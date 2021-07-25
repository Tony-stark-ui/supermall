<template>
  <div class="bottom-bar">
    <div class="check-content">
      <!-- 选中按钮 -->
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计:{{ totalPrice }}</div>
    <div class="calcute" @click="calcClick">去计算：{{ checkList }}</div>
  </div>
</template>

<script>
// 引入封装的选中按钮
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "VueCartbottombar",

  components: {
    CheckButton, //注册选中按钮
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
    // 监听去计算的点击
    calcClick() {
      if (this.$store.state.cartList.length === 0) {
        this.$toast.show("请添加商品", 1500);
      } else {
        this.$toast.show("结算选中商品", 1500);
      }
    },
  },
  computed: {
    // 计算总价
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return item.price * item.count + preValue;
          }, 0)
      );
    },
    // 选中的个数
    checkList() {
      return (
        "(" +
        this.$store.state.cartList.filter((item) => {
          return item.checked;
        }).length +
        ")"
      );
    },
    // 全选按钮的状态
    isSelectAll() {
      // return !this.$store.state.cartList.filter((item) => !item.checked).length;
      return !this.$store.state.cartList.find((item) => !item.checked);
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 50px;
  background-color: #eee;
  position: relative;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.check-content {
  display: flex;
  margin-left: 8px;
  line-height: 21px;
  width: 60px;
}
.check-button {
  margin-right: 5px;
  width: 20px;
  height: 20px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calcute {
  width: 130px;
  height: 100%;
  background-color: #ff8198;
  line-height: 50px;
  text-align: center;
  color: #eefeee;
}
</style>