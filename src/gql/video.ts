import { gql } from "@apollo/client";

export const CREATE_VIDEO = gql`
  mutation CreateVideo($createVideoInput: VideoInput!) {
    createVideo(createVideoInput: $createVideoInput) {
      message
    }
  }
`;

export const UPDATE_VIDEO = gql`
  mutation UpdateVideo($id: ID!, $updateVideoInput: VideoInput!) {
    updateVideo(id: $id, updateVideoInput: $updateVideoInput) {
      message
    }
  }
`;
