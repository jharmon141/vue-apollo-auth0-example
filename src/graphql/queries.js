import gql from 'graphql-tag'

export const userQuery = gql`
  query {
    user {
      id,
      name,
      emailAddress,
      emailSubscription
    }
  }
`

export const postsQuery = gql`
  query allPosts {
    allPosts(orderBy: createdAt_DESC) {
      id
      imageUrl
      description
    }
  }
`