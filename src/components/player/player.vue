<template>
  <div class="player" v-if="currentSong" v-show="playList.length > 0">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img :src="currentSong.al.picUrl">
      </div>
      <div class="top">
        <div class="back" @click="back">
          <i class="icon-back font-22"></i>
        </div>
        <h1 class="title font-18">{{currentSong.name}}</h1>
        <h2 class="subtitle font-14">{{currentSong.singer}}</h2>
      </div>
      <div class="middle">
        <div class="middle-l" ref="middle-l">
          <div class="cd-wrapper" ref="cdWrapper">
            <div class="cd" :class="cdCls">
              <img width="40" height="40" class="image" :src="currentSong.al.picUrl">
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="operators">
          <div class="icon i-left">
            <i class="icon-play"></i>
          </div>
          <div class="icon i-left" :class="disableCls">
            <i class="icon-prev"></i>
          </div>
          <div class="icon i-center" :class="disableCls">
            <i class="icon-play"></i>
          </div>
          <div class="icon i-right" :class="disableCls">
            <i class="icon-next"></i>
          </div>
          <div class="icon i-right">
            <i class="icon icon-not-favorite"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="min-player" v-show="!fullScreen" @click="openFullScreen">
      <div class="icon">
        <img :class="cdCls" width="40" height="40" :src="currentSong.al.picUrl">
      </div>
      <div class="text">
        <h2 class="name font-14">{{currentSong.name}}</h2>
        <p class="desc font-12">{{currentSong.singer}}</p>
      </div>
      <div class="control">
        <progress-circle :radius="radius" :percent="percent">
          <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
        </progress-circle>
      </div>
      <div class="control">
        <i class="icon-playlist"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import { mapMutations } from 'vuex'
  import progressCircle from '@/baseComponents/progressCircle/progressCircle'
  export default {
    data() {
      return {
        songReady: false,
        radius: 32,
      }
    },
    mounted() {
      console.log(this.playList)
      console.log(this.currentSong)
    },
    methods: {
      togglePlaying() {

      },
      back() {
        this.setFullScreen(false)
      },
      openFullScreen() {
        this.setFullScreen(true)
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN'
      })
    },
    computed: {
      cdCls() {
        return this.playing ? 'play' : 'play pause'
      },
      disableCls() {
        return this.songReady ? '' : 'disable'
      },
      percent() {
        // return this.currentTime / this.currentSong.duration
        return 1
      },
      miniIcon() {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
      },
      ...mapGetters([
        'fullScreen',
        'playing',
        'playList',
        'currentIndex',
        'currentSong'
      ])
    },
    components: {
      progressCircle
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@/assets/css/variable"
  @import "~@/assets/css/mixin"

  .player
    .normal-player
      position fixed
      top 0
      bottom 0
      left 0
      right 0
      z-index 150
      background: $color-background
      .background
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position relative
        margin-bottom 20px
        .back
          position absolute
          top 0
          left 6px
          z-index 50
          color $color-theme
          .icon-back
            display block
            padding 9px
            transform rotate(-90deg)
        .title
          width 70%
          margin 0 auto
          line-height 40px
          no-wrap()
          text-align center
          color: $color-text
        .subtitle
          width 70%
          margin 0 auto
          text-align center
          color: $color-text
      .middle
        position fixed
        width 100%
        top 80px
        bottom 170px
        white-space nowrap
        font-size 0
        .middle-l
          display inline-block
          vertical-align top
          position relative
          width 100%
          height 0
          padding-top: 80%
          .cd-wrapper
            position absolute
            left 10%
            top 0
            width 80%
            height 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation rotate 20s linear infinite
              &.paused
                animation-play-state paused
              .image
                position absolute
                top 0
                left 0
                width 100%
                height 100%
                border-radius 50%
      .bottom
        position absolute
        bottom 50px
        width 100%
        .operators
          display flex
          align-items: center
          text-align center
          .icon
            flex 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
  .min-player
    display flex
    align-items center
    position fixed
    bottom 0
    left 0
    z-index 180
    height 60px
    width 100%
    background: $color-highlight-background
    .icon
      flex 0 0 40px
      width 40px
      padding 0 10px 0 20px
      overflow hidden
      img
        border-radius 50%
        &.play
          animation rotate 10s linear infinite
        &.paused
          animation-play-state paused
    .text
      display flex
      flex-direction column
      flex 1
      .name
        margin-bottom 2px
        no-wrap()
        color $color-text
      .desc
        no-wrap()
        line-height 20px
        color $color-text-d
    .control
      flex 0 0 40px
      width 30px
      padding: 0 10px
      .icon-play-mini, .icon-pause-mini, .icon-playlist
        font-size 30px
        color $color-theme-d
      .icon-mini
        font-size 32px
        position absolute
        left 0
        top 0
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>