<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="forum">Forum</el-menu-item>
    <el-menu-item index="articles">Articles</el-menu-item>
    <el-menu-item index="data">Data</el-menu-item>
    <el-menu-item index="profile">Profile</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      activeIndex: "forum",
    };
  },
  methods: {
    handleSelect(key) {
      this.$emit("selected", key);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
