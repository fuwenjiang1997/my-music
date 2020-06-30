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
    <div class="list-shortcut">
      <ul>
        <li v-for="(item, index) in singerLetterList" :key="index" class="item font-12" :class="{'current': currentIndex === index}">
          {{item}}
        </li>
      </ul>
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
  export default {
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1,
        singerLetterList: {}
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
        console.log(this.$refs.listView)
      }
    },
    methods: {
      singerLetter(data) {
        this.singerLetterList = Object.assign({}, singerLetter(data))
      },
      scroll(pos) {
        console.log(pos)
        this.scrollY = pos.y
      },
      refresh() {
        this.$refs.listView.refresh()
      },
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
    position absolute
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
    .loading-container {
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
    }
  }
</style>