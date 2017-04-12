import Vue from 'vue'
import Router from 'vue-router'
import CreateUser from  '../components/CreateUser.vue'
import CreatePost from '../components/CreatePost.vue'
import App from '../App.vue'

Vue.use(Router)

export default new Router({

  routes: [

    { 
      path: '/', 
      name: 'App',
      component: App,
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
