import gql from 'graphql-tag'

export const createUser = gql`
  mutation ($idToken: String!, $name: String!, $emailAddress: String!, $emailSubscription: Boolean!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, emailAddress: $emailAddress, emailSubscription: $emailSubscription) {
      id
    }
  }
`

export const createPost = gql`
  mutation createPost($description: String!, $imageUrl: String!) {
    createPost(description: $description, imageUrl: $imageUrl) {
      id
      imageUrl
      description
    }
  }
`