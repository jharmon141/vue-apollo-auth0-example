<template>
    <div>
        <template v-if="loading > 0">
            Loading...
        </template>

        <template v-else-if="loading === 0">
            <div class="createUser">
                <input v-model="email"
                    placeholder="E-mail Address">
                <input v-model="name"
                    placeholder="Name">
                <input v-model="emailSubscription"
                    type="checkbox"
                    id="emailSubscription">
                <label for="emailSubscription">Subscribe to email notifications?</label>

                <button @click="createUser()">Sign Up</button>
            </div>
        </template>

    </div>
</template>


<script>
import { createUser } from '@/graphql/mutations.js'

export default {
    name: 'CreateUser',
    props: {
        loading: Number,
        user: Object,
        authenticated: Boolean,
        fetchUser: Function
    },

    data: () => ({
        email: '',
        name: '',
        emailSubscription: false
    }),

    methods: {
        createUser() {
            const idToken = window.localStorage.getItem('auth0IdToken')
            const emailAddress = this.email
            const name = this.name
            const emailSubscription = this.emailSubscription

            this.$apollo.mutate({
                mutation: createUser,
                variables: {
                    idToken,
                    name,
                    emailAddress,
                    emailSubscription,
                },
            }).then(() => {
                this.fetchUser()
                this.$router.push({ name: 'home' });
            }).catch((error) => {
                console.error(error)
            })
        },
    },
}
</script>


<style>
.createUser {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
</style>