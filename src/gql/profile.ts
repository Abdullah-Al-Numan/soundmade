import { gql } from "@apollo/client";

export const UPDATE_ADMIN_PASSWORD = gql`
  mutation UpdateAdminPassword($input: UpdateAdminPasswordInput!) {
    updateAdminPassword(updateAdminPasswordInput: $input) {
      message
    }
  }
`;

export const UPDATE_SOCIAL_LINK = gql`
  mutation UpdateSocialLink($updateSocialLinkInput: UpdateSocialLinkInput!) {
    updateSocialLink(updateSocialLinkInput: $updateSocialLinkInput) {
      message
    }
  }
`;
