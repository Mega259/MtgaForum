<template>
  <div class="home">
    <Header @selected="handleSelect"></Header>
    <Forum v-if="selected == 'forum'" />
    <Profile v-if="selected == 'profile'" />
    <Articles v-if="selected == 'articles'" />
    <Data v-if="selected == 'data'" />
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
  components: {
    Header,
    Profile,
    Forum,
    Data,
    Articles,
  },
  data() {
    return {
      selected: "forum",
    };
  },
  methods: {
    handleSelect(key) {
      this.selected = key;
    },
  },
};
</script>
