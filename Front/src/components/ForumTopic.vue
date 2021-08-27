<template>
  <div>
    <div>
      <p>{{ topicData.title }}</p>
      <p>{{ topicData.content }}</p>
    </div>
    <topic-reply-container v-for="dat in replyData" :key="dat" :topicData="dat">
    </topic-reply-container>
  </div>
</template>

<script>
import TopicReplyContainer from "./TopicReplyContainer.vue";
export default {
  name: "ForumCategory",
  components: {
    TopicReplyContainer,
  },
  computed: {
    replyData() {
      return this.$store.getters["topic/getFullTopic"]["topicReplies"];
    },
    topicData() {
      return this.$store.getters["topic/getFullTopic"]["topic"];
    },
  },
  async created() {
    await this.$store.dispatch(
      "topic/downloadFullTopic",
      this.$route.params.topicId
    );
  },
  // Get the topic information
  // Get the replies information
  // await this.$store.dispatch(
  //   "downloadTopicReplies",
  //   this.$route.params.topicId
  // );
};
</script>

<style>
</style>