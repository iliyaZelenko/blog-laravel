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
      posts (count: $perPage, page: $page) {
        data {
          id
          title
          titleSlug
          contentShort
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
