import { gql } from "@apollo/client";

export const GET_ALL_USERS_BY_TYPE = gql`
  query GetAllUsersByType($type: String!) {
    getAllUsersByType(type: $type) {
      id
      email
      username
      fullName
      category
      profile {
        profilePic
      }
      location {
        name
      }
    }
  }
`;
