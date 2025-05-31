import { gql } from "@apollo/client";

export const PAYMENT_INFO = gql`
  query GetSubscriptionPaymentInfo {
    getSubscriptionPaymentInfo {
      id
      status
      transactionIdentifier
      customerName
      purchaseDate
      users {
        id
        username
        fullName
        email
      }
      artists {
        id
        username
        fullName
        email
      }
    }
  }
`;
