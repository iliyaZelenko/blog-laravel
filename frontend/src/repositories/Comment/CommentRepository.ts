import { injectable } from 'inversify'
import BaseRepository from '~/repositories/BaseRepository'
import CommentRepositoryInterface from '~/repositories/Comment/CommentRepositoryInterface'
import { GET_COMMENT_REPLIES_QUERY } from '~/apollo/queries/comments/getCommentReplies'
import { CommentsInterface } from '~/apollo/schema/comments'
import { GET_COMMENTS_BY_POST_QUERY } from '~/apollo/queries/comments/getCommentsByPost'

@injectable()
export default class CommentRepository extends BaseRepository implements CommentRepositoryInterface {
  public readonly COMMENTS_PER_PAGE = 5

  public async getCommentRepliesPaginated (
    commentId: number,
    page: number = 1,
    perPage: number = this.COMMENTS_PER_PAGE
  ): Promise<CommentsInterface> {
    const {
      data: {
        comment: {
          repliesComments
        }
      }
    } = await global._$app.$apollo.query({
      query: GET_COMMENT_REPLIES_QUERY,
      variables: {
        id: commentId,
        page,
        perPage
      }
    })

    return repliesComments
  }

  public async getCommentsPaginatedByPost (
    postId: number,
    page: number = 1,
    perPage: number = this.COMMENTS_PER_PAGE
  ): Promise<CommentsInterface> {
    const {
      data: {
        comments
      }
    } = await global._$app.$apollo.query({
      query: GET_COMMENTS_BY_POST_QUERY,
      variables: {
        postId,
        page,
        perPage
      }
    })

    return comments
  }
}
