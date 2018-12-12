import gql from 'graphql-tag'

export const GET_POSTS_QUERY = gql`
  query GetPostsQuery($page: Int = 1) {
#    myAlias: paginatedPosts(page: $page) {
#      ...
#    }
    paginatedPosts(page: $page) {
      posts {
        id
        title
        text
        comments {
          text
          author
        }
      }
      pageInfo {
#        page
        pagesCount
#        perPage
#        totalItems
#        hasNextPage
      }
#      директива иусловия
#      friends @include(if: $withFriends) {
#        name
#      }
    }
  }
`
