import gql from 'graphql-tag'

export const GET_COMMENT_QUERY = gql`
  query GetCommentQuery($id: ID!, $repliesPage: Int = 1, $repliesPerPage: Int = 10) {
    comment (id: $id) {
      ...CommentsFields

      repliesComments (page: $repliesPage, count: $repliesPerPage) {
        data {
          ...CommentsFields
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
