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
  content: string
  user: UserInterface
  post: PostInterface
  repliedComment: UserInterface
  repliesComments: CommentsInterface
}
