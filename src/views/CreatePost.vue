<template>
  <div class="create">
    <input v-model="description" placeholder="Description">
    <input v-model="imageUrl" placeholder="Image url">

    <button @click="create">Create Post</button>
  </div>
</template>


<script>
import { createPost } from '@/graphql/mutations.js'

export default {
  name: 'CreatePost',
  props: {
      authentications: Boolean
  },

  data: () => ({
    description: '',
    imageUrl: '',
  }),

  methods: {
    create() {
      const description = this.description
      const imageUrl = this.imageUrl

      this.$apollo.mutate({
        mutation: createPost,
        variables: {
          description,
          imageUrl,
        },
      }).then(() => {
          this.$router.push({ name: 'Home' });
      }).catch((error) => {
          console.error(error)
      })
    },
  },
}
</script>


<style>
.create {
    text-align: center;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
}
</style>