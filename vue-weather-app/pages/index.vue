<template>
  <v-layout
    justify-center
    align-center
    fluid
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <logo />
      <v-card>
        <v-card-title class="headline">
          Weather
        </v-card-title>
        <v-card-text>
          Enter location here to get the current weather and forecast.
        </v-card-text>
        <v-card-actions>
          <v-text-field
            v-model="location"
            single-line
            outline
          >
            {{ location }}
          </v-text-field>
        </v-card-actions>
        <v-card-actions>
          <v-btn
            large
            color="submit"
            @click="getWeather"
          >
            Submit
          </v-btn>
        </v-card-actions>
        <v-card-text>
          {{ location }}
          {{ weather }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import geocode from '../utils/geocode'
import forecast from '../utils/forecast'
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data() {
    return {
      location: null,
      weather: null
    }
  },
  methods: {
    getWeather() {
      if (location === '') {
        this.weather = 'You must enter a location.'
      } else {
        geocode(this.location, (error, { latitude, longitude, location } = {}) => {
          if (error) {
            this.weather = error
          }
          forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
              this.weather = 'Forecast data unavailable'
            }
            this.weather = JSON.stringify({
              forecast: forecastData,
              location
            })
          })
        })
      }
    }
  }
}
</script>
