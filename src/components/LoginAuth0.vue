<template>

    <div>
        <span @click="showLogin()" class="login">Log in with Auth0</span>
    </div>

</template>

<script>
import Auth0Lock from 'auth0-lock'

export default {

    data: () => ({
        secretThing: '',
        lock: new Auth0Lock('AJhg1KjBM1iEAof3307nVM34qnJwlqqD', 'jharmon141.auth0.com')
    }),

    mounted() {

        //check for authentication on mount
        this.lock.on('authenticated', (authResult) => {
            localStorage.setItem('id_token', authResult.idToken);
            this.$router.push({ name: 'CreateUser' });
        });

        this.lock.on('authorization_error', (error) => {
            // handle error when authorizaton fails
        });
    },

    methods: {

        showLogin() {
            this.lock.show();
        },
    }
}

</script>
