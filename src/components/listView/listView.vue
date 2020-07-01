<template>
  <scroll
    @scroll="scroll"
    :listenScroll="listenScroll"
    :probeType="probeType"
    class="list-view"
    :data="data"
    ref="listView"
  >
    <ul>
      <li v-for="(group, index) in data" class="list-group" ref="listGroup" :key="index">
        <h2 class="list-group-title font-12">{{Object.values(singerLetterList)[index]}}</h2>
        <ul>
          <li v-for="item in group" :key="item.id" class="list-group-item">
            <img class="avatar" v-lazy="item.singer_pic">
            <span class="name font-14">{{item.singer_name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in singerLetterList" :key="index" :data-index="index" class="item font-12" :class="{'current': parseInt(currentIndex) === parseInt(index)}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title font-12">{{fixedTitle}} </div>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import { singerLetter } from '@/enums/enmus'
  import Scroll from 'components/scroll/scroll'
  import Loading from 'components/loading/loading'
  import { getData } from '@/assets/js/dom'
  const TITLE_HEIGHT = 18
  export default {
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1,
        singerLetterList: {},
        timer: 0
      }
    },
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
      this.touch = {}
      this.listHeight = []
    },
    mounted() {
      this.$nextTick(() => {
        this.refresh()
      })
    },
    watch: {
      data() {
        this.singerLetter(this.data)
        this.$nextTick(() => {
          this._calculateHeight()
        })
      },
      scrollY(newValue) {
        if (newValue > 0) {
          return this.currentIndex = 0
        }
        let timer = Date.now()
        if (timer - this.timer < 100) {
          return
        }
        console.log(timer - this.timer)
        this.timer = timer
        for (let index = 0; index < this.listHeight.length; index++) {
          let firstY = this.listHeight[index]
          let secondY = this.listHeight[index + 1]
          if (-newValue >= firstY && -newValue < secondY) {
            this.currentIndex = index
            this.diff = secondY + newValue
            return
          }
          console.log(index, firstY, newValue, secondY)
        }
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    methods: {
      singerLetter(data) {
        this.singerLetterList = Object.assign({}, singerLetter(data))
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      refresh() {
        this.$refs.listView.refresh()
      },
      onShortcutTouchStart(el) {
        this.currentIndex = getData(el.target, 'index')
        this.touch.startY = el.touches[0].clientY
        this.touch.anchorIndex = this.currentIndex
        this.scrollTo(this.currentIndex)
      },
      onShortcutTouchMove(el) {
        this.touch.endY = el.touches[0].clientY
        let startY = this.touch.startY
        let deldata = (this.touch.endY - startY) / TITLE_HEIGHT | 0
        this.currentIndex = deldata + parseInt(this.touch.anchorIndex)
        this.scrollTo(this.currentIndex)
      },
      scrollTo(index) {
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0)
      },
      // 计算歌手列表每一个节点的高度
      _calculateHeight() {
        this.listHeight = []
        let listGroup =  this.$refs.listGroup || []
        let height = 0
        this.listHeight.push(height)
        listGroup.forEach((item)=>{
          height += item.clientHeight
          this.listHeight.push(height)
        })
      }
    },
    computed: {
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.singerLetterList[this.currentIndex] || ''
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@/assets/css/variable.styl'
  .list-view {
    /*position relative*/
    position fixed
    width 100%
    height 100%
    overflow hidden
    background $color-background
    .list-group {
       padding-bottom: 30px
       .list-group-title {
         height 30px
         line-height 30px
         padding-left 20px
         color $color-text-l
         background $color-highlight-background
       }
       .list-group-item {
         display flex
         align-items center
         padding 10px 0 15px
         .avatar {
           width 50px
           height 50px
           border-radius 50%
         }
         .name {
           margin-left 20px
           color $color-text-l
         }
       }
     }
    .list-shortcut {
      position fixed
      z-index 30
      top 50%
      right 0
      transform translateY(-50%)
      padding 20px 0
      text-align center
      background $color-background-d
      border-radius 10px
      font-family Helvetica
      .item {
        padding 3px
        line-height 1
        color $color-text-l
        &.current {
          color $color-theme
        }
      }
    }
    .list-fixed {
      position: absolute
      top: -1px
      left: 0
      width: 100%
      .fixed-title {
        height: 30px
        line-height: 30 px
        padding-left: 20px
        color: $color-text-l
        background: $color-highlight-background
      }
    }
    .loading-container {
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
    }
  }
</style>