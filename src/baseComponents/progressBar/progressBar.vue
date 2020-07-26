<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref=progress></div>
      <div class="progress-btn-wrapper">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data() {
    return {
      progressWidth: 0
    };
  },
  mounted() {
    this.progressWidth = this.refs.progressBar.clientWidth
  },
  computed:{
  },
  watch:{
    percent(newV) {
      let progress = this.$refs.progress
      progress.style.width = this.progressWidth * newV
    }
  },
  methods: {},
};
</script>

<style scoped lang="stylus">
  @import "~@/assets/css/variable.styl"
  .progress-bar
    height 30px
    .bar-inner
      position relative
      top 13px
      height 4px
      background rgba(0, 0, 0, 0.3)
      .progress
        position absolute
        height 4px
        background $color-theme
      .progress-btn-wrapper
        position absolute
        top -6px
        left -8px
        .progress-btn
          position relative
          width 16px
          height 16px
          border-radius 50%
          background $color-theme

</style>
