import gql from 'graphql-tag'

export const GET_POST_QUERY = gql`
  query GetPostQuery($id: ID!, $commentsPage: Int = 1, $commentsPerPage: Int = 10) {
    post (id: $id) {
      id
      title
      titleSlug
      content
      user {
        id
        nickname
        fullName
        avatar {
          sm
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
          content
          user {
            id
            nickname
            fullName
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
`
