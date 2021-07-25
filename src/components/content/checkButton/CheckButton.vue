<template>
  <div class="check-button" :class="{ checked: isChecked }" @click="checkBtn">
    <img src="~assets/img/cart/tick.svg" v-show="isChecked" alt="" />
  </div>
</template>

<script>
export default {
  name: "VueCheckbutton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },

  components: {},

  directives: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {
    checkBtn() {
      this.$emit("btnClick");
    },
  },
};
</script>

<style  scoped>
.check-button {
  padding-top: 1px;
  width: 20px;
  height: 20px;

  border-radius: 20px;
  text-align: center;
  border: 2px solid #aaa;
}
.checked {
  border-color: #ff8198;
  background-color: #ff8198;
}
</style>