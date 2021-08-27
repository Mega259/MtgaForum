<template>
  <div class="home">
    <Header @selected="handleSelect" :active-index="selected"></Header>
    <Forum
      class="maxheight"
      v-if="selected == 'forum'"
      :selected="$route.params.categoryName"
    />
    <Profile class="maxheight" v-if="selected === 'profile'" />
    <Articles class="maxheight" v-if="selected === 'articles'" />
    <Data class="maxheight" v-if="selected === 'data'" />
    <forum-category v-if="selected === 'categoryTopics'" />
    <forum-topic v-if="selected === 'topicReplies'" />
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
import ForumCategory from "../components/ForumCategory.vue";
import ForumTopic from "@/components/ForumTopic.vue";

export default {
  name: "Hall",
  props: {
    selected: { type: String, default: "forum" },
  },
  computed: {
    pruebaData() {
      return this.$store.state.topic.topics;
    },
  },
  components: {
    Header,
    Profile,
    Forum,
    Data,
    Articles,
    ForumCategory,
    ForumTopic,
  },
  methods: {
    handleSelect(key) {
      console.log(key);
      this.$router.push({ name: key });
    },
    funcionprueba() {
      // this.$store.dispatch(
      //   "downloadTopicsCategory",
      //   "612360e01dca915cf43b8cde"
      // );
    },
  },
};
</script>

<style lang="scss" scoped>
.maxheight {
  height: 1000px;
}
</style>
