import Vue from 'vue'
import Router from 'vue-router'
import CreateUser from  '../components/CreateUser.vue'
import CreatePost from '../components/CreatePost.vue'
import Home from '../components/Home.vue'

Vue.use(Router)

export default new Router({

  mode: 'history',
  routes: [
    { 
      path: '/', 
      name: 'Home',
      component: Home,
    },
    {
      path: '/signup',
      name: 'CreateUser',
      component: CreateUser,
    },
    {
      path: '/create',
      name: 'CreatePost',
      component: CreatePost,
    },
  ]

})
