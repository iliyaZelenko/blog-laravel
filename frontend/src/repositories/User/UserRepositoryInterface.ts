import { UserInterface } from '~/apollo/schema/users'

export default interface UserRepositoryInterface {
  getAuthUser (): Promise<UserInterface>
}
