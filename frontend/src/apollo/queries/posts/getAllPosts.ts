import gql from 'graphql-tag'

export const GET_ALL_POSTS_QUERY = gql`
  query GetAllPostsQuery($page: Int = 1, $perPage: Int = 8) {
    allPosts (page: $page, count: $perPage) {
      data {
        id
        title
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
        count
        currentPage
        perPage
        total
        lastPage
      }
    }
  }
`
