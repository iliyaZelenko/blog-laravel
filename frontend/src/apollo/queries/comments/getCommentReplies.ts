import gql from 'graphql-tag'

export const GET_COMMENT_REPLIES_QUERY = gql`
  query GetCommentQuery($id: ID!, $page: Int = 1, $perPage: Int = 10) {
    comment (id: $id) {
      repliesComments (page: $page, count: $perPage) {
        data {
          ...CommentsFields
          repliesComments(count: 1) {
            data {
              ...CommentsFields
            }
          }
        }
        paginatorInfo {
          count
          currentPage
          perPage
          total
          lastPage
        }
      }
    }
  }

  fragment CommentsFields on Comment {
    id
    content
    createdAt
    ratingValue
    ratingValuePositive
    ratingValueNegative
    repliesCount
    user {
      id
      nickname
      fullName
      avatar {
        sm
        md
      }
      createdAt
      gender
      age
    }
  }
`
