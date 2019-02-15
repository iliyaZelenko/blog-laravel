import gql from 'graphql-tag'

export const GET_POST_QUERY = gql`
  query GetPostQuery($id: ID!, $commentsPage: Int = 1, $commentsPerPage: Int = 10) {
    post (id: $id) {
      id
      title
      titleSlug
      content
      ratingValue
      ratingValuePositive
      ratingValueNegative
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
      category {
        id
        name
        path
      }
      tags {
        id
        name
        about
      }
      comments (page: $commentsPage, count: $commentsPerPage) {
        data {
          ...CommentsFields
          repliesComments(count: 1) {
            data {
              ...CommentsFields
#              repliesComments(count: 1) {
#                data {
#                  ...CommentsFields
#                }
#              }
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
