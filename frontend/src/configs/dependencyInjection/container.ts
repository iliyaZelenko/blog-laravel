import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './types'
import {
  PathGeneratorInterface,
  CategoryRepositoryInterface,
  PostRepositoryInterface,
  UserRepositoryInterface,
  ObservableInterface
} from './interfaces'
import PathGenerator from '~/services/PathGenerator/PathGenerator'
import CategoryRepository from '~/repositories/Category/CategoryRepository'
import PostRepository from '~/repositories/Post/PostRepository'
import UserRepository from '~/repositories/User/UserRepository'
import Observable from '~/events/core/Observable'

const serviceContainer = new Container()

serviceContainer.bind<PathGeneratorInterface>(TYPES.PathGeneratorInterface).to(PathGenerator)
serviceContainer.bind<CategoryRepositoryInterface>(TYPES.CategoryRepositoryInterface).to(CategoryRepository)
serviceContainer.bind<PostRepositoryInterface>(TYPES.PostRepositoryInterface).to(PostRepository)
serviceContainer.bind<UserRepositoryInterface>(TYPES.UserRepositoryInterface).to(UserRepository)
serviceContainer.bind<ObservableInterface>(TYPES.ObservableInterface).to(Observable)

if (process.server) {
  // const a = '~/events/listeners/SignInListener'
  // console.log(require(a).default)
  // loadEvents()
}

export { serviceContainer }

// function loadEvents () {
//   loadClases('~/events/', ({ key, exportVal: classEvent }) => {
//     const className = classEvent.name
//
//     serviceContainer.bind<UserRepositoryInterface>(className).to(classEvent)
//   })
// }
//
// function loadClases (path, callback) {
//   // @ts-ignore
//   const req = require.context(path, true, /\.(ts)$/)
//
//   req.keys().forEach(key => {
//     const exportVal = req(key).default
//
//     callback({ key, exportVal })
//   })
// }
