import Vue from 'vue'
import Router from 'vue-router'
import CreateUser from  '@/views/CreateUser.vue'
import CreatePost from '@/views/CreatePost.vue'
import Home from '@/views/Home.vue'

Vue.use(Router)

export default new Router({

  mode: 'history',
  routes: [
    { 
      path: '/', 
      name: 'home',
      component: Home,
    },
    {
      path: '/signup',
      name: 'createUser',
      component: CreateUser,
    },
    {
      path: '/create',
      name: 'createPost',
      component: CreatePost,
    }
  ]
})