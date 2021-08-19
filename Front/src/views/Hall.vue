<template>
  <div class="home">
    <Header @selected="handleSelect" :active-index="selected"></Header>
    <Forum v-if="selected == 'forum'" />
    <Profile v-if="selected == 'profile'" />
    <Articles v-if="selected == 'articles'" />
    <Data v-if="selected == 'data'" />
    <el-button type="primary" @click="funcionprueba">Prueba</el-button>
    <div>{{ pruebaData }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Profile from "@/components/Profile.vue";
import Forum from "@/components/Forum.vue";
import Data from "@/components/Data.vue";
import Articles from "@/components/Articles.vue";

export default {
  name: "Hall",
  props: {
    selected: { type: String, default: "forum" },
  },
  computed: {
    pruebaData() {
      return this.$store.state.category.categories;
    },
  },
  components: {
    Header,
    Profile,
    Forum,
    Data,
    Articles,
  },
  methods: {
    handleSelect(key) {
      this.$router.push(key);
    },
    funcionprueba() {
      this.$store.dispatch("getCategories");
    },
  },
};
</script>
