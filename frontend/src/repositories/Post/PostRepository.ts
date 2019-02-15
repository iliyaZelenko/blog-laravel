import { injectable } from 'inversify'
import BaseRepository from '~/repositories/BaseRepository'
import { GET_CATEGORY_POSTS_QUERY } from '~/apollo/queries/posts/getCategoryPosts'
import PostRepositoryInterface from '~/repositories/Post/PostRepositoryInterface'
import { PostInterface, PostsInterface } from '~/apollo/schema/posts'
import { GET_POST_QUERY } from '~/apollo/queries/posts/getPost'
import { GET_ALL_POSTS_QUERY } from '~/apollo/queries/posts/getAllPosts'

@injectable()
export default class PostRepository extends BaseRepository implements PostRepositoryInterface {
  public readonly POST_COMMENTS_PER_PAGE = 10

  public async getCategoryPosts (categoryId: number, page: number = 1): Promise<PostsInterface> {
    const {
      data: {
        category: {
          posts
        }
      }
    } = await global._$app.$apollo.query({
      query: GET_CATEGORY_POSTS_QUERY,
      variables: {
        page,
        id: categoryId
      }
    })

    return posts
  }

  public async getAll (page: number = 1): Promise<PostsInterface> {
    const { data: { allPosts } } = await global._$app.$apollo.query({
      query: GET_ALL_POSTS_QUERY,
      variables: { page }
    })

    return allPosts
  }

  public async getPost (id: number, commentsPerPage: number = this.POST_COMMENTS_PER_PAGE): Promise<PostInterface> {
    const { data: { post } } = await global._$app.$apollo.query({
      query: GET_POST_QUERY,
      variables: { id, commentsPerPage }
    })

    return post
  }
}
