import { PostInterface } from '~/apollo/schema/posts'
import { UserInterface } from '~/apollo/schema/users'

export interface CommentsInterface {
  data: CommentInterface[]
  paginatorInfo: {
    lastPage: number
    currentPage: number
    count: number
    total: number
  }
}

export interface CommentInterface {
  id: number
  createdAt: string
  updatedAt: string
  content: string
  ratingValue: number
  ratingValuePositive: number
  ratingValueNegative: number
  user: UserInterface
  post: PostInterface
  repliedComment: CommentInterface
  repliesComments: CommentsInterface
}
