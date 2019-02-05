import gql from 'graphql-tag'

export const GET_CATEGORY_QUERY = gql`
  query GetCategoryQuery($id: ID!, $page: Int = 1, $perPage: Int = 4) {
    category(id: $id) {
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
      }
      posts(count: $perPage, page: $page) {
        data {
          id
          title
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

// интерфейс именно получаемой категории через GraphQL, поэтому этот интерфейс не нужно обобщать
export interface CategoryInterface {
  id: number
  name: string
  path: string
  children: any[]
  ancestorsAndSelfInfo: any
  haveChild: boolean
  // postsCount: number,
  // allPostsCount: number,
  posts: PostsInterface
}

export interface PostsInterface {
  data: PostInterface[]
  paginatorInfo: {
    lastPage: number
    currentPage: number
    count: number
    total: number
  }
}

export interface PostInterface {
  id: number
  title: string
  contentShort: string
  user: {
    nickname: string
    fullName: string
  }
}
