<template>
  <div class="header_container">
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
    <el-button
      v-if="login"
      type="text"
      class="header_container__button"
      @click="handleLogin"
      >Log in</el-button
    >
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    activeIndex: {
      type: String,
      default: "forum",
    },
  },
  computed: {
    login() {
      return this.$store.state.login.status != "success";
    },
  },
  methods: {
    handleSelect(key) {
      this.$emit("selected", key);
    },
    handleLogin() {
      this.$router.push("login");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  width: 100%;
  height: 50%;
  background-color: red;
  &_container {
    display: flex;
    justify-content: space-around;
    &__button {
    }
  }
}
</style>
