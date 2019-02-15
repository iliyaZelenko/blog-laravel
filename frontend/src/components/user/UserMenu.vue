<template>
  <v-menu
    v-model="menuModel"
    :close-on-content-click="false"
    origin="center center"
    transition="slide-x-transition"
    open-on-hover
    offset-y
  >
    <div slot="activator">
      <slot name="activator" />
    </div>

    <v-card>
      <v-list style="padding: 14px 6px;">
        <v-list-tile avatar>
          <v-list-tile-avatar
            style="cursor: pointer;"
            @click="onUserClick"
          >
            <user-avatar
              :user="user"
              size-type="md"
              el-size="66px"
            />
          </v-list-tile-avatar>

          <v-list-tile-content
            style="cursor: pointer;"
            class="ml-2"
            @click="onUserClick"
          >
            <v-list-tile-title>
              {{ user.nickname }}
            </v-list-tile-title>
            <v-list-tile-sub-title v-if="user.fullName">
              {{ user.fullName }}
            </v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              :class="favoriteModel ? 'red--text' : ''"
              icon
              @click="favoriteModel = !favoriteModel"
            >
              <v-icon>favorite</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <div class="px-2 pb-2">
        <b>
          Registered at:
        </b>
        <time>
          {{ $date(user.createdAt) }}
        </time>
        <div v-if="user.gender">
          <b>
            Gender:
          </b>
          <time>
            {{ user.gender === 'MALE' ? 'male' : 'female' }}
          </time>
        </div>
        <div v-if="user.age">
          <b>
            Age:
          </b>
          <time>
            {{ user.age }}
          </time>
        </div>
      </div>

      <v-divider />

      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-switch
              v-model="blockModel"
              color="red"
            />
          </v-list-tile-action>
          <v-list-tile-title>Block user</v-list-tile-title>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-switch
              v-model="subscribeModel"
              color="purple"
            />
          </v-list-tile-action>
          <v-list-tile-title>Subscribe to user</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { Inject } from 'vue-inversify-decorator'
import { TYPES } from '~/configs/dependencyInjection/types'
import Component from '~/plugins/nuxt-class-component'
import { UserInterface } from '~/apollo/schema/users'
import UserAvatar from '~/components/user/avatar/UserAvatar.vue'
import { PathGeneratorInterface } from '~/configs/dependencyInjection/interfaces'

@Component({
  name: 'UserMenu',
  components: { UserAvatar }
})
export default class UserMenu extends Vue {
  @Prop(Object) user!: UserInterface

  @Inject(TYPES.PathGeneratorInterface) private pathGenerator!: PathGeneratorInterface

  public blockModel: boolean = false
  public subscribeModel: boolean = false
  public favoriteModel: boolean = false

  public menuModel: boolean = false

  onUserClick () {
    this.$router.push(
      this.pathGenerator.generate({
        name: 'profile-user',
        params: {
          user: this.user.id.toString()
        }
      })
    )
  }
}
</script>
