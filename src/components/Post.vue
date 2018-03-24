<template>
  <div>
    <img :src='post.imageUrl' :style='image'>
    <div>{{ post.description }}</div>
  </div>
</template>


<script>
  export default {
    name: 'Post',
    props: {
        post: Object
    },
    data: () => ({
      image: {
        'min-width': '50%',
        'max-width': '50%'
      }
    })
  }
</script>