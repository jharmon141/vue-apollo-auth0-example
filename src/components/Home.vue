<template>
    <div class="home">

        <login :lock="lock" v-if="!authenticated" />

        <div v-else class="logout">
            <div class="logoutButton">
                <span class="logoutText" @click="logout()">Logout</span>
            </div>
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
import Auth0Lock from 'auth0-lock'
import gql from 'graphql-tag'

export default {
    name: 'home',

    props: {
        authenticated: {
            type: Boolean
        },
        user: {
            type: Object
        },
        lock: {
            type: Object
        }
    },

    components: {
        'login': LoginAuth0,
        'feed': ListPage,
        'newpost': NewPostLink
    },

    methods: {

        login() {
            this.lock.show()
        },

        logout() {
            this.$parent.logout()
        }

    },

}
</script>


<style>

.logoutButton {
    width: 130px;
    height: 36px;
    cursor: pointer;
    background-color: red;
    color: white;
    font-size: 26px;
    padding-top: 5px;
    margin-bottom: 8px;
}

.logout {
    width: 130px;
}

.logoutText {
    vertical-align: center;
}

</style>
