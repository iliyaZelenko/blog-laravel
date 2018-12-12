<template>
  <section class="w-100 h-100">
    <nuxt-link :to="localePath({ name: 'posts-page', params: { page: 1 } })">
      Посты
    </nuxt-link>

    <v-layout justify-center>
      <v-flex xs4>
        <apollo-mutation
          :mutation="CREATE_POST_MUTATION"
          :variables="{
            input
          }"
          @done="onDone"
        >
          <template slot-scope="{ mutate, loading, error }">
            <v-text-field
              v-model="input.title"
              label="Title"
              single-line
            />

            <v-text-field
              v-model="input.text"
              label="Text"
              single-line
            />
            <!--</v-flex>-->
            <!--mutate()-->
            <v-btn
              :loading="loading"
              color="primary"
              @click="mutate"
            >
              Создать пост
            </v-btn>
            <p v-if="error">
              An error occured: {{ error }}
            </p>
          </template>
        </apollo-mutation>
      </v-flex>
    </v-layout>
    <!--
    <v-btn @click="refetch">
      Refetch
    </v-btn>
    hello: <b>{{ hello }}</b>
    Global loading:
    $apollo.loading
    Local loading:
    $apollo.queries.hello.loading
    -->
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from '~/plugins/nuxt-class-component'
import { CREATE_POST_MUTATION } from '~/apollo/queries/mutations/createPost'
// import gql from 'graphql-tag'

@Component({
  // data: () => ({
  //   hello: '222'
  // })
  // apollo: {
  //   hello: {
  //     query: gql`{hello}`
  //   }
  // }
})
export default class Home extends Vue {
  CREATE_POST_MUTATION = CREATE_POST_MUTATION

  input = {
    title: 'My title', // null,
    text: 'My text' // null
  }

  onDone (r) {
    console.log('done', r)
  }

  refetch () {
    this.$apollo.queries.hello.refetch()
  }

  // created () {
  //   this.$apollo.addSmartQuery('hello', {
  //     query: gql`{hello}`
  //   })
  // }
}
</script>
