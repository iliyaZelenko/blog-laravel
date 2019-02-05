<template>
  <!--height: 100%;-->
  <div style="border: 1px solid rgba(0,0,0,.12);">
    <v-img
      src="http://sharethingz.com/wp-content/uploads/2014/08/avatar-512x350.png?x96597"
      lazy-src="https://practice.privatbank.ua/Content/images/no-avatar.png"
      aspect-ratio="1"
      class="grey lighten-2"
    >
      <v-layout
        slot="placeholder"
        fill-height
        align-center
        justify-center
        ma-0
      >
        <v-progress-circular
          color="grey lighten-5"
          indeterminate
        />
      </v-layout>
    </v-img>

    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>email</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Почта</v-list-tile-title>
          <v-list-tile-sub-title>{{ $auth.user.email }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>chat</v-icon>
        </v-list-tile-action>
      </v-list-tile>

      <v-divider inset />

      <v-list-tile>
        <v-list-tile-action>
          <v-icon>schedule</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Created at</v-list-tile-title>
          <v-list-tile-sub-title>{{ $auth.user.createdAt }}</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-icon>chat</v-icon>
        </v-list-tile-action>
      </v-list-tile>

      <v-divider inset />

      <v-list-tile>
        <v-list-tile-action>
          <v-icon>verified_user</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Has verified email</v-list-tile-title>
          <v-list-tile-sub-title>{{ $auth.user.hasVerifiedEmail }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider inset />

      <v-list-tile>
        <v-list-tile-action>
          <v-icon>location_on</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Location</v-list-tile-title>
          <v-list-tile-sub-title>Черкассы, Черкасская область</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <div id="map" />
  </div>
</template>

<script>
export default {
  data: () => ({
    map: null
  }),
  mounted () {
    if (this.map) {
      return
    }

    const script = document.createElement('script')
    const key = 'AIzaSyAqEnLDFIYA4FBcReiN2Z8eqkLidAYcpdo'
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`
    script.async = script.defer = true

    document.body.appendChild(script)

    window.initMap = this.initMap
  },
  methods: {
    initMap () {
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 49.414988, lng: 32.048163 },
        zoom: 10 // 16
      })
    }
  }
}
</script>

<style lang="stylus">
  #map
    height: 250px;
    width: 100%;
</style>
