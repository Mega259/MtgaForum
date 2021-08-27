<template>
  <div>
    <topic-container
      v-for="dat in getFormattedTopicsCategory"
      :key="dat"
      :topicData="dat"
      @click="handleTopicClick(dat._id)"
    >
    </topic-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TopicContainer from "./TopicContainer.vue";
export default {
  name: "ForumCategory",
  components: {
    TopicContainer,
  },
  data() {
    return {
      // reconstructedName: this.$route.params.categoryName.replace("-", " "),
      // categoryId: "",
    };
  },
  computed: {
    ...mapGetters([
      "topic/getTopicsCategory",
      "category/getCategories",
      "category/getCategoryByTitle",
    ]),
    reconstructedName() {
      return this.$route.params.categoryName.replace("-", " ");
    },
    categoryId() {
      console.log(
        "category computed",
        this.getCategories,
        console.log(this.$store.getters),
        this.$store.getters["category/getCategoryByTitle"](
          this.reconstructedName
        )
      );
      return this.$store.getters["category/getCategoryByTitle"](
        this.reconstructedName
      )._id;
    },
    getFormattedTopicsCategory() {
      return Object.entries(this.$store.getters["topic/getAllTopics"]).filter(
        (key) => key[0] === this.categoryId
      )[0][1];
    },
  },
  async created() {
    if (this.$store.state.category.status !== "success") {
      await this.$store.dispatch("category/downloadCategories");
    }

    if (this.$store.state.topic.status !== "success") {
      await this.$store.dispatch(
        "topic/downloadTopicsCategory",
        this.categoryId
      );
    }
  },
  methods: {
    handleTopicClick(topicId) {
      console.log("handleTopicClic" + topicId);
      this.$router.push({
        name: "ForumTopic",
        params: { topicId: topicId },
      });
    },
  },
};
</script>

<style>
</style>