<template>
  <div class="play-list">
    <scroll>
      <ul></ul>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import Scroll from '@/baseComponents/scroll/scroll'
  export default {
    mounted() {
      console.log(this.playList)
    },
    computed: {
      ...mapGetters([
        'playList'
      ])
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>