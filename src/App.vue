<template>
    <div class="app">

        <router-view :user='user' :authenticated='authenticated' :lock='lock'></router-view>

    </div>

</template>

<script>
import NewPostLink from './components/NewPostLink.vue'
import Home from './components/Home.vue'
import LoginAuth0 from './components/LoginAuth0.vue'
import CreateUser from './components/CreateUser.vue'
import CreatePost from './components/CreatePost.vue'
import Auth0Lock from 'auth0-lock'
import gql from 'graphql-tag'

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default {

    name: 'app',

    data: () => ({
        authenticated: false,
        user: {},
        lock: new Auth0Lock('iBYFD3fZpwKmvINx4Spwm1zjP5M137QH', 'jharmon141.auth0.com', {
            auth: {
                responseType: 'token',
            }
        }),
    }),

    apollo: {
        user: {
            fetchPolicy: 'network-only',
            query: userQuery,
        },
    },

    components: {
        'CreateUser': CreateUser,
        'Home': Home,
        'CreatePost': CreatePost,
        'LoginAuth0': LoginAuth0
    },

    methods: {

        logout() {
            // To log out, we just need to remove the token and profile
            // from local storage
            localStorage.removeItem('auth0IdToken')
            localStorage.removeItem('profile')
            this.authenticated = false
            this.user = {}
        },

        checkAuth() {
            return !!localStorage.getItem('auth0IdToken')
        }

    },

    beforeMount() {

        this.$apollo.query({
            query: userQuery,
        }).then((response) => {
            // Result
            this.authenticated = this.checkAuth()
            console.log(this.authenticated)
        })
    }
}

</script>

<style>

body, input, button {
    font-family: Helvetica, sans-serif;
    font-size: 16pt;
}

ul li {
    list-style: none;
}

.app {
    text-align: center;
    display: flex;
    justify-content: center;

    padding: 12px;
    margin: auto;
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
