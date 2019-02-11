import { PostInterface, PostsInterface } from '~/apollo/schema/posts'

export default interface PostRepositoryInterface {
  getCategoryPosts (categoryId: number, page: number): Promise<PostsInterface>
  getPost (id: number): Promise<PostInterface | null>
  getAll (page?: number): Promise<PostsInterface>
}
