import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './types'
import {
  PathGeneratorInterface,
  CategoryRepositoryInterface,
  PostRepositoryInterface,
  UserRepositoryInterface
} from './interfaces'
import PathGenerator from '~/services/PathGenerator/PathGenerator'
import CategoryRepository from '~/repositories/Category/CategoryRepository'
import PostRepository from '~/repositories/Post/PostRepository'
import UserRepository from '~/repositories/User/UserRepository'

const serviceContainer = new Container()

serviceContainer.bind<PathGeneratorInterface>(TYPES.PathGeneratorInterface).to(PathGenerator)
serviceContainer.bind<CategoryRepositoryInterface>(TYPES.CategoryRepositoryInterface).to(CategoryRepository)
serviceContainer.bind<PostRepositoryInterface>(TYPES.PostRepositoryInterface).to(PostRepository)
serviceContainer.bind<UserRepositoryInterface>(TYPES.UserRepositoryInterface).to(UserRepository)

export { serviceContainer }
