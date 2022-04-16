import { gql } from "@apollo/client"

export const GET_POST_USER = gql`
  query Posts($userId: ID) {
    posts(userId: $userId) {
      _id
      title
      content
      author {
        email
      }
    }
  }
`;