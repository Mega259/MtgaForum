<template>
  <div>
    <div>{{ "Forum" }}</div>

    <div v-if="selected === 'forum'">
      <div v-if="show === ''">
        <category-container
          v-for="category in getCategories"
          :key="category"
          :categoryData="category"
          @click="handleCategoryClick(category)"
        ></category-container>
      </div>
      <div v-if="show === 'category'">
        <forum-category></forum-category>
      </div>
      <div v-if="show === 'topic'">
        <forum-topic></forum-topic>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryContainer from "./CategoryContainer";
import ForumCategory from "./ForumCategory.vue";
import ForumTopic from "./ForumTopic.vue";
import { mapGetters } from "vuex";

export default {
  name: "Forum",
  props: {
    selected: { type: String, default: "forum" },
  },
  components: {
    CategoryContainer,
    ForumCategory,
    ForumTopic,
  },
  data() {
    return {
      realSelected: "",
      show: "",
    };
  },
  computed: {
    ...mapGetters(["category/getCategories", "category/getCategoryStatus"]),
    getCategories() {
      return this.$store.getters["category/getCategories"];
    },
  },
  methods: {
    async handleCategoryClick(category) {
      await this.$store.dispatch(
        "topic/downloadAllTopicsCategory",
        category.title
      );
      this.$router.push({
        name: "ForumCategory",
        params: { categoryName: category.title.replace(" ", "-") },
      });
    },
  },
  async created() {
    if (this.$store.getters.getCategoriesStatus !== "success") {
      await this.$store.dispatch("category/downloadCategories");
    }
    // const reconstructedName = this.$route.params.categoryName.replace("-", " ");
    // const category = this.store.getters.getCategoryByTitle(reconstructedName);
    // await this.$store.dispatch("downloadTopicsCategory", category._id);
    // await this.$store.dispatch(
    //   "downloadTopicReplies",
    //   this.$route.params.topicId
    // );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
}
</style>
