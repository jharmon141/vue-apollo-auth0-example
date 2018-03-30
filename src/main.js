import Vue from 'vue'
import App from './App.vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, concat } from 'apollo-link'
import VueApollo from 'vue-apollo'
import router from './router'

Vue.config.productionTip = false

const httpLink = new HttpLink({
   uri: process.env.VUE_APP_GRAPHCOOL_URL
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem('auth0IdToken')}`,
    }
  })

  return forward(operation)
})

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(VueApollo)

new Vue({
  el: '#app',
  provide: apolloProvider.provide(),
  router,
  render: h => h(App)
})