<template>
  <div id="posts-list">
    <template v-if="loading > 0">
      Loading...
    </template>

    <template v-else>
      <ul>
        <li v-for="post in allPosts" :key="post.id">
          <Post :post='post' class="post"/>
        </li>
      </ul>
    </template>
  </div>
</template>


<script>
import Post from './Post.vue'
import { postsQuery } from '@/graphql/queries.js'

export default {
  name: 'PostsList',
  components: {
    Post
  },

  data: () => ({
    allPosts: {},
    loading: 0
  }),

  apollo: {
    allPosts: {
      query: postsQuery,
      loadingKey: 'loading',
    },
  }
}
</script>


<style>
.post {
  margin-bottom: 20px
}
</style>