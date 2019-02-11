import gql from 'graphql-tag'

export const GET_CATEGORY_POSTS_QUERY = gql`
  query GetCategoryQuery ($id: ID!, $page: Int = 1, $perPage: Int = 4) {
    category (id: $id) {
      id
      posts (count: $perPage, page: $page) {
        data {
          id
          title
          content
          user {
            nickname
            fullName
          }
        }
        paginatorInfo {
          lastPage
          currentPage
          count
          total
        }
      }
    }
  }
`
