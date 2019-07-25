<template>
  <v-layout
    justify-center
    align-center
    fluid
  >
    <v-flex
      xs12
      sm10
      md10
      lg10
    >
      <logo />
      <searchCard />
      <link>
      <v-card light>
        <v-card-title
          class="headline"
        >
          Your search: {{ $route.params.id }}
          <v-card-text
            v-if="!weatherData"
          >
            Your search did not succeed. Please try again.
          </v-card-text>
          <v-card-text
            v-else
          >
            Showing weather and forecast for {{ locationFetched }}
          </v-card-text>
        </v-card-title>
      </v-card>
      <v-container
        fluid
        grid-list-md
        style="display: inline-flex; "
      >
        <v-card v-for="item in weatherData" :key="item.icon">
          <weathericon
            :iconName="item.icon"
          />
          <wcaption
            :caption="item.day"
            :summary="item.summary"
          />
        </v-card>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import weathericon from '~/components/weathericon.vue'
import logo from '~/components/logo.vue'
import searchCard from '~/components/searchCard'
import wcaption from '~/components/wcaption'
export default {
  components: {
    weathericon,
    logo,
    searchCard,
    wcaption
  },
  data() {
    return {
    }
  },
  asyncData({ params }) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(params.id) + '.json?access_token=pk.eyJ1IjoiZ3JlZ2Vja2hhcnQiLCJhIjoiY2p2bnJxcG4wMDNlYjQ0cWxxNm1rN2E5ayJ9.Uk5j5HKkwnFnbFWYRBieSQ'
    let mapboxLocation = ''
    return axios.get(url).then((res) => {
      const latitude = res.data.features[0].center[1]
      const longitude = res.data.features[0].center[0]
      mapboxLocation = res.data.features[0].place_name
      console.log(mapboxLocation) // eslint-disable-line
      return axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/1023eda4d96d67a931f77985468b3f63/' + latitude + ',' + longitude)
    }).then(({ data }) => {
      // What is the fancy Javascript way of doing this?
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const today = new Date()
      const todayIndex = today.getDay()
      const weekDays = [days[todayIndex],
        days[todayIndex + 1],
        days[todayIndex + 2],
        days[todayIndex + 3],
        days[todayIndex + 4],
        days[todayIndex + 5]]
        console.log(mapboxLocation) // eslint-disable-line
      return { weatherData: [
        { icon: data.daily.data[0].icon, day: weekDays[0], summary: data.daily.data[0].summary },
        { icon: data.daily.data[1].icon, day: weekDays[1], summary: data.daily.data[1].summary },
        { icon: data.daily.data[2].icon, day: weekDays[2], summary: data.daily.data[2].summary },
        { icon: data.daily.data[3].icon, day: weekDays[3], summary: data.daily.data[3].summary },
        { icon: data.daily.data[4].icon, day: weekDays[4], summary: data.daily.data[4].summary },
        { icon: data.daily.data[5].icon, day: weekDays[5], summary: data.daily.data[5].summary }],
      locationFetched: mapboxLocation }
    }).catch((err) => {
      return { location: err + 'Unable to get data.' }
    })
  }
}
</script>

<style>

</style>
