import { gql } from "@apollo/client";

export const CREATE_VIDEO = gql`
  mutation CreateVideo($createVideoInput: VideoInput!) {
    createVideo(createVideoInput: $createVideoInput) {
      message
    }
  }
`;
