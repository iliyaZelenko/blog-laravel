import { injectable } from 'inversify'
import BaseRepository from '~/repositories/BaseRepository'
import { GET_AUTH_USER_QUERY } from '~/apollo/queries/auth/getAuthUser'
import UserRepositoryInterface from '~/repositories/User/UserRepositoryInterface'
import { UserInterface } from '~/apollo/schema/users'

@injectable()
export default class UserRepository extends BaseRepository implements UserRepositoryInterface {
  public async getAuthUser (): Promise<UserInterface> {
    const { data: { me } } = await global._$app.$apollo.query({
      query: GET_AUTH_USER_QUERY
    })

    return me
  }
}
