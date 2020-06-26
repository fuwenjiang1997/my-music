<template>
  <div class="recommend" ref="recommend">
    <div>
      <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data () {
      return {
        recommends: [],
        discList: []
      }
    }
  }
</script>

<style scoped>

</style>