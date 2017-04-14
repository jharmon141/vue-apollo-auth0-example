<template>

    <div class="login">
        <span @click="showLogin()" class="loginText">Log in with Auth0</span>
    </div>

</template>

<script>
import Auth0Lock from 'auth0-lock'

export default {

    props: {
        authenticated: {
            type: Boolean
        },
        lock: {
            type: Object
        }
    },

    methods: {

        showLogin() {
            this.lock.show()
        },
    },

    mounted() {
        //check for authentication on mount
        this.lock.on('authenticated', (authResult) => {
            window.localStorage.setItem('auth0IdToken', authResult.idToken);
            this.$router.push({ name: 'CreateUser' });
        });
        this.lock.on('authorization_error', (error) => {
            // handle error when authorizaton fails
        });
    },
}

</script>

<style>

.login {
    width: 130px;
    height: 46px;
    cursor: pointer;
    background-color: blue;
    color: white;
}

.loginText {
    font-size: 18px;
    display: inline-block;
    vertical-align: center;
}

</style>
