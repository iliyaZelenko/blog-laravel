import { CategoryInterface } from '~/apollo/schema/categories'

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
  titleSlug: string
  contentShort: string
  user: {
    nickname: string
    fullName: string
  }
  category: CategoryInterface
}
