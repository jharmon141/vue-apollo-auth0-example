<template>

    <div class="createUser">
        <input v-model="email" placeholder="E-mail Address">
        <input v-model="name" placeholder="Name">
        <input v-model="emailSubscription" type="checkbox">
        <span>Subscribe to email notifications?</span>

        <button @click="create()">Sign Up</button>

    </div>

</template>

<script>
import gql from 'graphql-tag'
import VueTypes from 'vue-types'

const createUser = gql`
  mutation ($idToken: String!, $name: String!, $emailAddress: String!, $emailSubscription: Boolean!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, emailAddress: $emailAddress, emailSubscription: $emailSubscription) {
      id
    }
  }
`

export default {

    data: () => ({
        email: '',
        name: '',
        emailSubscription: false,
    }),

    props: {
        user: {
            type: Object
        }
    },

    mounted() {

        // redirect if user is logged in or did not finish Auth0 Lock dialog
        if (this.user.id ||  window.localStorage.getItem('auth0IdToken') === null) {
            console.warn('not a new user or already logged in')
            this.$router.push({ name: 'Home' });
        }

    },

    methods: {

        create() {

            let idToken = window.localStorage.getItem('auth0IdToken')
            let emailAddress = this.email
            let name = this.name
            let emailSubscription = this.emailSubscription
            console.log(idToken)

            // Mutation
            this.$apollo.mutate({
                mutation: createUser,
                variables: {
                    idToken,
                    emailAddress,
                    name,
                    emailSubscription,
                },
            }).then((data) => {
                // Result
                console.log(data)
                this.$router.push({ name: 'Home' });
            }).catch((error) => {
                // Error
                console.error(error)
            })
        },
    },

}
</script>

<style>

.createUser {
    text-align: center;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
}
</style>
