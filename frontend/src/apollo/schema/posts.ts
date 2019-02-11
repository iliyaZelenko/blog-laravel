import { CategoryInterface } from '~/apollo/schema/categories'
import { TagInterface } from '~/apollo/schema/tags'

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
    id: number
    nickname: string
    fullName: string
  }
  category: CategoryInterface
  tags: TagInterface[]
}
