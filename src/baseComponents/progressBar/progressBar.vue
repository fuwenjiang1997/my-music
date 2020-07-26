<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref=progress></div>
      <div class="progress-btn-wrapper" ref="progressBtn">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefixStyle } from '@/assets/js/dom'
const transform = prefixStyle('transform')

const progressBtnWidth = 16
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
    this.progressWidth = this.$refs.progressBar.clientWidth
    console.log(this.progressWidth)
  },
  computed:{
  },
  watch:{
    percent(newPercent) {
      const barWidth = this.progressWidth - progressBtnWidth
      const offsetWidth = newPercent * barWidth
      this._offset(offsetWidth)

      // let progress = this.$refs.progress
      // console.log(this.progressWidth * newPercent)
      // progress.style.width = this.progressWidth * newPercent + 'px'
      // let progressBtn = this.$refs.progressBtn
      // console.dir(progress)
      // progressBtn.style.left = -7 + process.clientWidth
      // console.log(process.clientWidth)
      // console.log(progressBtn.style.left)
    }
  },
  methods: {
    _offset (offsetWidth) {
      console.log(offsetWidth)
      this.$refs.progress.style.width = offsetWidth + 'px'
      this.$refs.progressBtn.style[transform] = `translateX(${offsetWidth}px)`
    }
  },
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
