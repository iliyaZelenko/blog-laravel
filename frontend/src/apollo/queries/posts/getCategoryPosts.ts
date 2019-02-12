import gql from 'graphql-tag'

export const GET_CATEGORY_POSTS_QUERY = gql`
  query GetCategoryQuery ($id: ID!, $page: Int = 1, $perPage: Int = 4) {
    category (id: $id) {
      id
      # этот запрос должен совпадать с тем что в getCategory!
      posts (count: $perPage, page: $page) {
        data {
          id
          title
          titleSlug
          contentShort
          createdAt
          ratingValue
          ratingValuePositive
          ratingValueNegative
          user {
            id
            avatar {
              sm
              md
            }
            createdAt
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
