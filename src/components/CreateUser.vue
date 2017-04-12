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

const createUser = gql`
  mutation ($idToken: String!, $name: String!, $emailAddress: String!, $emailSubscription: Boolean!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, emailAddress: $emailAddress, emailSubscription: $emailSubscription) {
      id
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default {

  data: () => ({
    email: '',
    name: '',
    emailSubscription: false
  }),

    methods: {

        toggleSubscription() {
            if (!this.emailSubscription) {
                this.emailSubscription = true
            } else {
                this.emailSubscription = false
            }
        },

        create() {

                let idToken = localStorage.getItem('auth0IdToken')
                let emailAddress = this.email
                let name = this.name
                let emailSubscription = this.emailSubscription

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
            }).catch((error) => {
                // Error
                console.error(error)
            })
        },
    }
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
