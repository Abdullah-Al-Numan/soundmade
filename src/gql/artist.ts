import { gql } from "@apollo/client";

export const GET_UNAPPROVED_ARTIST_LIST = gql`
  query GetUnapprovedArtist {
    getUnapprovedArtist {
      id
      username
      fullName
      email
      profile {
        bio
        profilePic
      }
      location {
        name
      }
      validation {
        phoneNumber
        spotifyLink
        youtubeLink
        facebookLink
        instagramLink
        soundcloudLink
      }
    }
  }
`;

export const APPROVED_ARTIST = gql`
  mutation ApprovedArtist($userId: ID!) {
    approvedArtist(userId: $userId) {
      message
    }
  }
`;

export const GET_USER_COUNTS = gql`
  query GetUserCounts {
    getUserCounts {
      totalUserCount
      userCount
      artistCount
      b2bCount
      basicCount
      premiumCount
      goldCount
      approvedArtistCount
      unapprovedArtistCount
    }
  }
`;

export const GET_APPROVED_ARTIST_LIST = gql`
  query GetApprovedArtist {
    getApprovedArtist {
      id
      username
      fullName
      email
      profile {
        bio
        profilePic
      }
      location {
        name
      }
      validation {
        phoneNumber
        spotifyLink
        youtubeLink
        facebookLink
        instagramLink
        soundcloudLink
      }
    }
  }
`;

export const UPDATE_ARTIST_MUTATION = gql`
  mutation UpdateArtist($updateArtistInput: UpdateArtistInput!) {
    updateArtist(updateArtistInput: $updateArtistInput) {
      message
    }
  }
`;

export const GET_POSTS_BY_USER_ID = gql`
  query GetPostsByUserId($authorId: ID!, $userId: ID!) {
    getPostsByUserId(authorId: $authorId, userId: $userId) {
      id
      description
      images
      createdAt
      updatedAt

      isPublished
      isPaid
      isBlur
      isLiked

      user {
        id
        username
        fullName
        profile {
          profilePic
        }
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      message
    }
  }
`;
export const GET_VIDEOS_BY_USER_ID = gql`
  query GetVideosByUserId($authorId: ID!, $userId: ID!) {
    getVideosByUserId(authorId: $authorId, userId: $userId) {
      video
      title
      description
      id
      isPublished
      isPaid
      isBlur
      updatedAt
      userId
      createdAt
    }
  }
`;

export const DELETE_VIDEO = gql`
  mutation DeleteVideo($id: ID!) {
    deleteVideo(id: $id)
  }
`;
