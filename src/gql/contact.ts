import { gql } from "@apollo/client";

export const GET_ALL_ACTIVE_CONTACT = gql`
  query GetAllActiveContact($limit: Int, $offset: Int) {
    getAllActiveContact(limit: $limit, offset: $offset) {
      id
      user {
        id
        name
        email
      }
      reason
      comment
      status
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_CLOSE_CONTACT = gql`
  query GetAllCloseContact($limit: Int, $offset: Int) {
    getAllCloseContact(limit: $limit, offset: $offset) {
      id
      user {
        email
        id
        name
      }
      reason
      comment
      status
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($contactId: ID!, $status: String, $comment: String) {
    updateContact(contactId: $contactId, status: $status, comment: $comment) {
      message
    }
  }
`;
