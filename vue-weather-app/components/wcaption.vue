<template>
  <div :caption="caption" :summary="summary">
    <h3>
      {{ caption }}
    </h3>
    <h2>
      {{ summary }}
    </h2>
  </div>
</template>

<script>
export default {
  props: ['caption', 'summary']
}
</script>

<style>

</style>
