import { injectable } from 'inversify'
import BaseRepository from '~/repositories/BaseRepository'
import { GET_CATEGORY_POSTS_QUERY } from '~/apollo/queries/posts/getCategoryPosts'
import PostRepositoryInterface from '~/repositories/Post/PostRepositoryInterface'
import { PostInterface, PostsInterface } from '~/apollo/schema/posts'
import { GET_POST_QUERY } from '~/apollo/queries/posts/getPost'

@injectable()
export default class PostRepository extends BaseRepository implements PostRepositoryInterface {
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

  public async getPost (id: number): Promise<PostInterface> {
    const { data: { post } } = await global._$app.$apollo.query({
      query: GET_POST_QUERY,
      variables: { id }
    })

    return post
  }
}
