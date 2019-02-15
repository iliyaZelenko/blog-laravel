import { PostInterface, PostsInterface } from '~/apollo/schema/posts'

export default interface PostRepositoryInterface {
  readonly POST_COMMENTS_PER_PAGE

  getCategoryPosts (categoryId: number, page: number): Promise<PostsInterface>
  getPost (id: number, commentsPerPage?: number): Promise<PostInterface | null>
  getAll (page?: number): Promise<PostsInterface>
}
