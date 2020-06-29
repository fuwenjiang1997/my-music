<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index}" v-for="(item, index) in dots" :key="index">
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { addClass } from '@/assets/js/dom'
  import BScroll from '@better-scroll/core'
  import Slide from '@better-scroll/slide'

  BScroll.use(Slide)

  export default {
    name: 'slider',
    data() {
      return {
        dots: [],
        currentPageIndex: 0,
        playTimer: 0
      }
    },
    props: {
      // 是否无缝轮播
      loop: {
        type: Boolean,
        default: true
      },
      // 是否自动轮播
      autoPlay: {
        type: Boolean,
        default: true
      },
      // 自动播放时间间隔
      interval: {
        type: Number,
        default: 4000
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()
      }, 20)
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    methods: {
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        clearTimeout(this.playTimer)
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          slide: {
            loop: true,
            threshold: 100
          },
          useTransition: true,
          momentum: false,
          bounce: false,
          stopPropagation: true,
          probeType: 2
        })
        this.slider.on('scrollEnd', this._onScrollEnd)

        // user touches the slide area
        this.slider.on('beforeScrollStart', () => {
          clearTimeout(this.playTimer)
        })
        this.autoGoNext()
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _onScrollEnd() {
        this.currentPageIndex = this.slider.getCurrentPage().pageX
        this.autoGoNext()
      },
      autoGoNext() {
        clearTimeout(this.playTimer)
        this.playTimer = setTimeout(() => {
          this.nextPage()
        }, 4000)
      },
      nextPage() {
        this.slider.next()
      }
    },
    beforeDestroy() {
      clearTimeout(this.playTimer)
      window.removeEventListener('resize', this._setSliderWidth)
      this.slider.destroy()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@/assets/css/variable.styl'
  .slider {
    position relative
    min-height 1px
    .slider-group {
      overflow hidden
      white-space nowrap
      .slider-item {
        float left
        box-sizing border-box
        text-align center
        a {
          display block
          width 100%
          overflow hidden
          text-decoration none
        }
        img {
          display block
          width 100%
        }
      }

    }
    .dots {
      position absolute
      right 0
      left 0
      bottom 12px
      text-align center
      font-size 0
      .dot {
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active {
          width: 20px
          border-radius: 5px
          background: $color-text-ll
        }
      }
    }
  }
</style>