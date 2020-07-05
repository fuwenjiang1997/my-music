<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{singer.name}}</h1>
    <div class="bg-image" :style="`background-image:url(${this.getSinger.img1v1Url})`" ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="hotSongs.length>0" class="play" @click="random">
          <i class="icon-play font-16"></i>
          <div class="text font-12">随机播放全部</div>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll
      @scroll="scroll"
      class="list"
      ref="list"
      :data="hotSongs"
      :probeType="this.probeType"
      :listenScroll="this.listenScroll"
    >
      <div class="song-list-wrapper">
        <song-list @selectItem="selectItem" v-if="hotSongs.length" :songs="hotSongs"></song-list>
      </div>
      <div v-show="!hotSongs.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { singersApi } from '@/http/api'
  import { ERR_OK } from '@/http/config'
  import Loading from '@/baseComponents/loading/loading'
  import Scroll from '@/baseComponents/scroll/scroll'
  import SongList from 'components/songList/songList'
  import { prefixStyle } from '@/assets/js/dom'

  const RESERVED_HEIGHT = 40
  const transform = prefixStyle('transform')
  // const backdrop = prefixStyle('backdrop-filter')
  const backdrop = prefixStyle('filter')

  export default {
    data() {
      return {
        singer: {},
        hotSongs: [],
        scrollY: 0
      }
    },
    created() {
      this.getSingerDesc()
      this.listenScroll = true
      this.probeType = 3
    },
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style.top = this.imageHeight + 'px'
    },
    computed: {
      ...mapGetters({
        getSinger: 'singer'
      })
    },
    methods: {
      getSingerDesc() {
        if(!this.getSinger.id) {
          this.$router.push('/singer')
        }
        let params = {
          id: this.getSinger.id || this.$route.params.id
        }
        singersApi.getSingerDesc(params, res => {
          if (res.code === ERR_OK) {
            this.singer = res.artist
            this.hotSongs = res.hotSongs
          }
        })
      },
      random() {

      },
      goBack() {
        this.$router.back()
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      selectItem({item, index}) {
        console.log(item, index)
        Object.assign(item, {singer: this.singer.name})
        this.selectPlay({
          list: this.hotSongs,
          index
        })
      },
      ...mapActions([
        'selectPlay'
      ])
    },
    watch: {
      scrollY(newY) {
        let zIndex = 0
        let scale = 1 // 缩小
        let blur = 0
        let translateY = Math.max(this.minTransalteY, newY)
        const percent = Math.abs(newY / this.imageHeight)

        if (newY > 0) {
          scale = 1 + percent
          zIndex = 10
        } else {
          blur = Math.min(20, percent * 20)
          console.log(blur)
        }

        this.$refs.layer.style['transform'] = `translate3d(0, ${translateY}px, 0)`
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`
        // this.$refs.bgImage.style[backdrop] = `blur(${blur}px)`
        console.log(this.$refs.filter.style)

        if (newY < this.minTransalteY) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
          this.$refs.playBtn.style.display = 'none'
        } else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
          this.$refs.playBtn.style.display = ''
        }
        this.$refs.bgImage.style[transform] = `scale(${scale})`
        this.$refs.bgImage.style.zIndex = zIndex
      }
    },
    components: {
      Loading,
      Scroll,
      SongList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@/assets/css/variable.styl'
  @import '~@/assets/css/mixin.styl'
  .music-list
    position fixed
    z-index 100
    top 0
    bottom 0
    right 0
    left 0
    background: $color-background
    .back
      position absolute
      top 0
      left 6px
      z-index 50
      .icon-back
        display block
        padding 10px
        color $color-theme
    .title
      position absolute
      top 0
      left 10%
      width 80%
      line-height 40px
      z-index 40
      no-wrap()
      text-align center
      color $color-text
    .bg-image
      position relative
      width 100%
      height 0
      padding-top 70%
      transform-origin top
      background-size cover
      .play-wrapper
          position absolute
          bottom 20px
          z-index 50
          width 100%
          .play
            box-sizing border-box
            width: 135px
            line-height 35px
            margin 0 auto
            text-align center
            border: 1px solid $color-theme
            color: $color-theme
            border-radius: 100px
            .icon-play
              display: inline-block
              margin-right: 6px
            .text
              display: inline-block
              vertical-align top


      .filter
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position relative
      height 100%
      background $color-background
    .list
      position fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>