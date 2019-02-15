import { PostsInterface } from '~/apollo/schema/posts'
import { CommentsInterface } from '~/apollo/schema/comments'

export interface UserInterface {
  id: number
  createdAt: string
  updatedAt: string
  nickname: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  avatar: AvatarInterface
  gender: UserGenderStatus
  birthday: string
  posts: PostsInterface
  comments: CommentsInterface
}

export interface AvatarInterface {
  lg: string
  md: string
  sm: string
  circle: string
}

export type AvatarSizeTypes = 'lg' | 'md' | 'sm' | 'circle'
export type UserGenderStatus = 'MALE' | 'FEMALE'
