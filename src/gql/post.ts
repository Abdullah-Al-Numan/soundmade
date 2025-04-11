import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($createPostInput: PostInput!) {
    createPost(createPostInput: $createPostInput) {
      message
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $updatePostInput: PostInput!) {
    updatePost(id: $id, updatePostInput: $updatePostInput) {
      message
    }
  }
`;

