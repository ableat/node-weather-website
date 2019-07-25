<template>
  <img :src="getIconImagePath">
</template>

<script>
const ICON_IMAGE_PATH_STORE = {
  fog: '../../weathericons/fog.png',
  'partly-cloudy-day': '../../weathericons/partly-cloudy-day.png',
  'clear-day': '../../weathericons/clear-day.png',
  default: '../../weathericons/default.png',
  'partly-cloudy-night': '../../weathericons/partly-cloudy-night.png',
  rain: '../../weathericons/rain.png',
  snow: '../../weathericons/snow.png',
  wind: '../../weathericons/wind.png',
  'clear-night': '../../weathericons/clear-night.png'
}
export default {
  props: { iconName: String },
  computed: {
    getIconImagePath: function () {
      return ICON_IMAGE_PATH_STORE[this.iconName]
    }
  }
}

</script>

<style>
img {
    height: 50px;
}
</style>
