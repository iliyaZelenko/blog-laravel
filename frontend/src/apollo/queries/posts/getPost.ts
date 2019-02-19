import gql from 'graphql-tag'

export const COMMENTS_MAX_NESTED_LVL: number = 2

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
        # еслим меняете уровень вложенноси, то меняйте COMMENTS_MAX_NESTED_LVL
        data {
          ...CommentDataFields
          # первый уровень вложенности
          repliesComments (count: 1) {
            data {
              ...CommentDataFields
              # второй уровень вложенности
#              repliesComments(count: 1) {
#                data {
#                  ...CommentFields
#                }
#              }
            }
#            paginatorInfo {
#              ...CommentPaginatorFields
#            }
          }
        }
        paginatorInfo {
          ...CommentPaginatorFields
        }
      }
    }
  }

  fragment CommentDataFields on Comment {
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

  fragment CommentPaginatorFields on PaginatorInfo {
    count
    currentPage
    perPage
    total
    lastPage
  }
`
