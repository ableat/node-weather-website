<template>
  <v-card>
    <v-card-title class="headline">
      Weather
    </v-card-title>
    <v-card-text>
      Enter location here and press <strong>Enter</strong> to get the current weather and forecast.
    </v-card-text>
    <form
      @submit.prevent="submit"
    >
      <v-text-field
        v-model="location"
        placeholder="Enter a location here"
        single-line
        outline
        autofocus=""
      />
    </form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      location: ''
    }
  },
  methods: {
    submit(event) {
        console.log(this.$route) // eslint-disable-line
      if (this.$route.path.includes('weather')) {
        this.$router.replace(this.location)
      } else {
        this.$router.push('weather/' + this.location)
      }
    }
  }
}
</script>

<style>

</style>
