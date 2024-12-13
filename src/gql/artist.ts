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
        spotifyLink,
        youtubeLink,
        facebookLink,
        instagramLink,
        soundcloudLink,
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
