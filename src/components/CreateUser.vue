<template>

    <div>
        <input v-model="email" placeholder="E-mail Address">
        <input v-model="name" placeholder="Name">
        <input v-model="emailSubscription" type="checkbox" @click="toggleSubscription()">
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
            const userInfo = {
                idToken: localStorage.getItem('auth0IdToken'),
                emailAddress: this.email,
                name: this.name,
                emailSubscription: this.emailSubscription,
            }

            // Mutation
            this.$apollo.mutate({
                mutation: createUser,
                variables: {userInfo},
                updateQueries: {
                    userQuery: (prev, { mutationResult }) => {
                        return {
                            // append at head of list because we sort the posts reverse chronological
                            user: [mutationResult.data.createPost, ...prev.allPosts],
                        }
                    },
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
