import { injectable } from 'inversify'
import BaseRepository from '~/repositories/BaseRepository'
import CommentRepositoryInterface from '~/repositories/Comment/CommentRepositoryInterface'
import { GET_COMMENT_REPLIES_QUERY } from '~/apollo/queries/comments/getCommentReplies'
import { CommentCreationInputInterface, CommentsInterface } from '~/apollo/schema/comments'
import { GET_COMMENTS_BY_POST_QUERY } from '~/apollo/queries/comments/getCommentsByPost'
import { CREATE_COMMENT_MUTATION } from '~/apollo/mutations/comments/createComment'
import { GET_COMMENT_QUERY } from '~/apollo/queries/comments/getComment'

@injectable()
export default class CommentRepository extends BaseRepository implements CommentRepositoryInterface {
  public readonly COMMENTS_PER_PAGE = 5

  public async getCommentRepliesPaginated (
    commentId: number,
    repliesPage: number = 1,
    repliesPerPage: number = this.COMMENTS_PER_PAGE
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
        repliesPage,
        repliesPerPage
      }
    })

    return repliesComments
  }

  public async getComment (
    commentId: number,
    repliesPage: number | undefined = 1,
    repliesPerPage: number | undefined = this.COMMENTS_PER_PAGE
  ): Promise<CommentsInterface> {
    const {
      data: {
        comment
      }
    } = await global._$app.$apollo.query({
      query: GET_COMMENT_QUERY,
      variables: {
        id: commentId,
        repliesPage,
        repliesPerPage
      }
    })

    return comment
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

  public async createComment (
    input: CommentCreationInputInterface
  ): Promise<CommentsInterface> {
    const {
      data: {
        createComment: createdComment
      }
    } = await global._$app.$apollo.mutate({
      mutation: CREATE_COMMENT_MUTATION,
      variables: { input }
    })

    return createdComment
  }
}
