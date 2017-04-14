<template>
  <div>
    <img :src='post.imageUrl' v-bind:style='image'>
    <div>{{ post.description }}</div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      image: {
        'min-width': '50%',
        'max-width': '50%'
      }
    }),
    props: {
      post: {
        type: Object,
        default: function () {
          return { description: '', imageUrl: '' }
        }
      },
    },
  }
</script>
