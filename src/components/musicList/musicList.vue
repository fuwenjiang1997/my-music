<template>
  <div class="music-list">music</div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'musicList'
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@/assets/css/variable.styl'
  .music-list
    position fixed
    top 0
    bottom 0
    right 0
    left 0
    background: $color-background
</style>