import { PostsInterface } from '~/apollo/schema/posts'
import { CommentsInterface } from '~/apollo/schema/comments'

export interface UserInterface {
  id: number
  nickname: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  avatar: AvatarInterface
  gender: UserGenderStatus
  // birthday: DateTime
  // createdAt: DateTime! @rename(attribute: "created_at")
  // updatedAt: DateTime! @rename(attribute: "updated_at")
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
