import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($createPostInput: PostInput!) {
    createPost(createPostInput: $createPostInput) {
      message
    }
  }
`;
