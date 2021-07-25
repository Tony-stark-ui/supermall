// 引入返回顶部组件
import BackTop from "components/content/backTop/BackTop.vue";
export const backTopMixin = {
  components: {
    BackTop, //注册返回顶部组件
  },
  data() {
    return {
      isShow: false, //返回顶部按钮默认隐藏
    }
  },
  methods: {
    // 点击返回顶部
    backClick() {
      this.$refs.scroll.callBack();
    },
  }
}