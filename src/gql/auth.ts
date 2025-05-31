import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      access_token
      user {
        id
        email
        fullName
        locationId
        type
        category
        isFirstLogin
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout($refreshToken: String!) {
    logout(refreshToken: $refreshToken) {
      message
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      access_token
      user {
        id
        email
        fullName
        locationId
        type
        category
      }
    }
  }
`;

export const ARTIST_ACCOUNT_VALIDATION_MUTATION = gql`
  mutation AccountValidation($accountValidationInput: AccountValidationInput!) {
    accountValidation(accountValidationInput: $accountValidationInput) {
      message
    }
  }
`;