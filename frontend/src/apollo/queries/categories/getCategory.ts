import gql from 'graphql-tag'

export const GET_CATEGORY_QUERY = gql`
  query GetCategoryQuery ($id: ID!, $page: Int = 1, $perPage: Int = 4) {
    category (id: $id) {
      id
      name
      description
      path
      haveChild
      ancestorsAndSelfInfo {
        id
        name
        path
      }
      children {
        id
        name
        path
        postsCount
        allPostsCount
        childrenCount
        allChildrenCount
      }
      # этот запрос должен совпадать с тем что в getCategoryPosts!
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
