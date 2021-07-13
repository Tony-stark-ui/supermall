<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
import tabbarItem from "./tabbar-item.vue";
export default {
  components: {
    tabbarItem,
  },
};
</script>

<style>
#tabbar {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -2px 1px rgba(100, 100, 100, 0.1);
}
</style>