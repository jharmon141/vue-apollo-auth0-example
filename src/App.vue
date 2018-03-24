<template>
  <div id="app">

    <router-view v-bind="{ loading, user, authenticated, lock, fetchUser }"
      v-on:logout="logout" />

  </div>
</template>

<script>
import Auth0Lock from 'auth0-lock'
import { userQuery } from './graphql/queries'

export default {
  name: 'App',
  data: () => ({
    user: null,
    lock: new Auth0Lock(process.env.VUE_APP_AUTH0_CLIENT_ID, process.env.VUE_APP_AUTH0_DOMAIN, {
      auth: {
        responseType: 'token',
      }
    }),
    loading: 0
  }),

  computed: {
    authenticated() {
      return !!this.user
    }
  },

  apollo: {
    user: {
      query: userQuery,
      loadingKey: 'loading'
    }
  },

  methods: {

    logout() {
      localStorage.removeItem('auth0IdToken')
      localStorage.removeItem('profile')
      this.user = null
    },

    async fetchUser() {
      const token = localStorage.getItem('auth0IdToken')
      await this.$apollo.queries.user.refetch()
      if(!this.user && token) {
        this.$router.push({ name: 'createUser' })
      }
    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

ul li {
  list-style: none;
}

input:focus {
  box-shadow: none;
  outline: none;
  border-color: #40b883;
}

input {
  padding: 8px;
  border: solid 1px #bbb;
  border-radius: 2px;
}
</style>
