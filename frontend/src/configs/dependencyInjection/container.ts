import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './types'
import {
  PathGeneratorInterface,
  CategoryRepositoryInterface,
  PostRepositoryInterface
} from './interfaces'
import PathGenerator from '~/services/PathGenerator/PathGenerator'
import CategoryRepository from '~/repositories/Category/CategoryRepository'
import PostRepository from '~/repositories/Post/PostRepository'

const serviceContainer = new Container()

serviceContainer.bind<PathGeneratorInterface>(TYPES.PathGeneratorInterface).to(PathGenerator)
serviceContainer.bind<CategoryRepositoryInterface>(TYPES.CategoryRepositoryInterface).to(CategoryRepository)
serviceContainer.bind<PostRepositoryInterface>(TYPES.PostRepositoryInterface).to(PostRepository)

export { serviceContainer }
