<template>
  <div>
    <nav-bar class="navbar">
      <div slot="center" class="text">商品分类</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "",

  components: { NavBar },

  directives: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.navbar {
  background-color: #ff8198;
}
.text {
  color: aliceblue;
  font-size: 18px;
}
</style>