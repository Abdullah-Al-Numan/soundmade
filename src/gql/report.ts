import { gql } from "@apollo/client";

export const GET_ALL_ACTIVE_REPORT = gql`
  query GetAllActiveReport {
    getAllActiveReport {
      id
      reportedContentId
      reportedContentType
      reportedBy {
        id
        name
        email
      }
      reportedTo {
        id
        name
        email
      }
      reportType
      comment
      status
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_Close_REPORT = gql`
  query GetAllCloseReport {
    getAllCloseReport {
      id
      reportedContentId
      reportedContentType
      reportedBy {
        id
        name
        email
      }
      reportedTo {
        id
        name
        email
      }
      reportType
      comment
      status
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_REPORT = gql`
  mutation UpdateReport($reportId: ID!, $status: String, $comment: String) {
    updateReport(reportId: $reportId, status: $status, comment: $comment) {
      message
    }
  }
`;
