import { gql } from "@apollo/client"

export const CREATE_POST = gql`
  mutation CreatePost($data: PostInput!) {
    createPost(data: $data) {
      _id
      title
      content
      author {
        email
      }
    }
}
`;