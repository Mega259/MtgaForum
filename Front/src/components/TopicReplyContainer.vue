<template>
  <div class="box" @click="handleClick">
    <p>{{ topicData.content }}</p>
  </div>
</template>

<script>
export default {
  name: "CategoryContainer",
  props: {
    topicData: {
      type: Object,
      default: () => {
        return { title: "invent", description: "invent" };
      },
    },
  },
  methods: {
    handleClick() {},
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