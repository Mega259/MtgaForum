<template>
  <div>
    <div>{{ "Forum" }}</div>
    <div v-if="getCategoryStatus === 'success'">
      <category-container
        v-for="dat in getCategories"
        :key="dat"
        :categoryData="dat"
        >{{ dat }}</category-container
      >
    </div>
  </div>
</template>

<script>
import CategoryContainer from "./CategoryContainer";
import { mapGetters } from "vuex";
export default {
  name: "Forum",
  components: {
    CategoryContainer,
  },
  data() {
    return {
      data: undefined,
    };
  },
  computed: {
    ...mapGetters(["getCategories", "getCategoryStatus"]),
  },
  async created() {
    if (this.$store.getters.getCategoriesStatus !== "success") {
      await this.$store.dispatch("getCategories");
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
