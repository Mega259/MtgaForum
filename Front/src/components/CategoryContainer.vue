<template>
  <div class="box" @click="handleClick">
    <p>{{ categoryData.title }}</p>
    <p>{{ categoryData.description }}</p>
  </div>
</template>

<script>
export default {
  name: "CategoryContainer",
  props: {
    categoryData: {
      type: Object,
      default: () => {
        return { title: "invent", description: "invent" };
      },
    },
  },
  methods: {
    handleClick() {
      console.log(this.categoryData);
    },
  },
};
</script>

<style>
.box {
  width: 30%;
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
}
</style>