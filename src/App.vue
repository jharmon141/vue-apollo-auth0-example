<template>
    <div class="app">

        <router-view :user='user'></router-view>

    </div>

</template>

<script>
import ListPage from './components/ListPage.vue'
import NewPostLink from './components/NewPostLink.vue'
import LoginAuth0 from './components/LoginAuth0.vue'
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
        lock: new Auth0Lock('iBYFD3fZpwKmvINx4Spwm1zjP5M137QH', 'jharmon141.auth0.com'),
    }),

    components: {
        'login': LoginAuth0,
        'feed': ListPage,
        'newpost': NewPostLink,
    },

    methods: {

        login() {
            this.lock.show();
        },

        logout() {
            // To log out, we just need to remove the token and profile
            // from local storage
            localStorage.removeItem('id_token')
            localStorage.removeItem('profile')
            this.authenticated = false
        },
    },

    mounted() {

        this.lock.on('authenticated', (authResult) => {
            console.log('authenticated')
            localStorage.setItem('auth0IdToken', authResult.idToken)
            this.lock.getProfile(authResult.idToken, (error, profile) => {
                if (error) {
                    // Handle error
                    return
                }
                // Set the token and user profile in local storage
                localStorage.setItem('profile', JSON.stringify(profile))

                this.authenticated = true
            })
        })
        this.lock.on('authorizaton_error', (error) => {
            // handle error when authorizaton fails
        })
    },

    apollo: {
        user: {
            query: userQuery,
            forceFetch: true,
        },
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
