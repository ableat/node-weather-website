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
      <searchCard />
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import searchCard from '~/components/searchCard.vue'

export default {
  components: {
    Logo,
    searchCard
  }
}
</script>
