<template>
    <div>

        <login v-if="!authenticated" />

        <div v-else>
            <span class="logout" @click="logout()">Logout</span>
            <newpost />
        </div>

        <div class="feed">
            <feed />
        </div>

    </div>

</template>

<script>
import ListPage from './ListPage.vue'
import NewPostLink from './NewPostLink.vue'
import LoginAuth0 from './LoginAuth0.vue'
import gql from 'graphql-tag'

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`

export default {
    name: 'app',
    data: () => ({
        authenticated: false,
        user: {}
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
            localStorage.removeItem('id_token');
            localStorage.removeItem('profile');
            this.authenticated = false;
        },
    },

    apollo: {
        user: {
            query: userQuery,
            fetchPolicy: 'network-only',
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
