import { CommentsInterface } from '~/apollo/schema/comments'

export default interface CommentRepositoryInterface {
  readonly COMMENTS_PER_PAGE

  getCommentRepliesPaginated (commentId: number, page: number, perPage: number): Promise<CommentsInterface>
  getCommentsPaginatedByPost (postId: number, page: number, perPage: number): Promise<CommentsInterface>
}
