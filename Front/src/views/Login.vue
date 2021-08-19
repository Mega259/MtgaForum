<template>
  <div class="login">
    <h1>{{ msg }}</h1>
    <el-row>
      <el-col :span="9"><div></div></el-col>
      <el-col :span="6"
        ><div>
          <el-input placeholder="Username" v-model="username"></el-input></div
      ></el-col>
      <el-col :span="9"><div></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="9"><div></div></el-col>
      <el-col :span="6"
        ><div>
          <el-input
            placeholder="password"
            v-model="password"
            show-password
          ></el-input></div
      ></el-col>
      <el-col :span="9"><div></div></el-col>
    </el-row>
    <el-button type="primary" @click="tryToLogIn">Entrar</el-button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async tryToLogIn() {
      await this.$store.dispatch("login", {
        email: this.username,
        password: this.password,
      });
      if (this.$store.state.login.status == "success") {
        this.$emit("login");
        this.$router.push("forum");
      } else {
        alert("Username or password not correct");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

a {
  color: #42b983;
}
.el-row {
  margin: 5px;
}
</style>
