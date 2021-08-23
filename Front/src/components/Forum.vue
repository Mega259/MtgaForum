<template>
  <div>
    <div>{{ "Forum" }}</div>
    <div v-if="getCategoryStatus === 'success' && selected === ''">
      <category-container
        v-for="dat in getCategories"
        :key="dat"
        :categoryData="dat"
        @click="handleCategoryClick(dat.title)"
        >{{ dat }}</category-container
      >
    </div>
    <div v-else>
      <topic-container
        v-for="dat in getTopicsCategory"
        :key="dat"
        :topicData="dat"
      >
      </topic-container>
    </div>
  </div>
</template>

<script>
import CategoryContainer from "./CategoryContainer";
import TopicContainer from "./TopicContainer";
import { mapGetters } from "vuex";

export default {
  name: "Forum",
  props: {
    selected: { type: String, default: "" },
  },
  components: {
    CategoryContainer,
    TopicContainer,
  },
  data() {
    return {
      data: undefined,
    };
  },
  computed: {
    ...mapGetters(["getCategories", "getCategoryStatus", "getTopicsCategory"]),
  },
  methods: {
    handleCategoryClick(categoryTitle) {
      console.log(categoryTitle);
      console.log(this.selected);
      this.$router.push({
        name: "ForumCategory",
        params: { categoryName: categoryTitle.replace(" ", "-") },
      });
    },
  },
  async created() {
    if (this.$store.getters.getCategoriesStatus !== "success") {
      await this.$store.dispatch("downloadCategories");
    }
    console.log(this.selected);
    if (this.selected != "") {
      await this.$store.dispatch(
        "downloadTopicsCategory",
        this.getCategories.filter(
          (el) => el.title === this.selected.replace("-", " ")
        )[0]._id
      );
    }
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
