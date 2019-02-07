import gql from 'graphql-tag'

export const GET_ALL_POSTS_QUERY = gql`
  query GetAllPostsQuery($page: Int = 1, $perPage: Int = 4) {
    allPosts (page: $page, count: $perPage) {
      data {
        id
        title
        contentShort
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
`
