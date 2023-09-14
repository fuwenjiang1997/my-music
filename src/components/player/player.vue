<template>
  <div class="player" v-if="currentSong" v-show="playList.length > 0">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave">

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
          <div class="middle-l" ref="middle-l">l
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img width="40" height="40" class="image" :src="currentSong.al.picUrl">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">1:01</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent"></progress-bar>
            </div>
            <span class="time time-r">4:01</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-play"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i class="icon-prev" @click="preSong"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i @click="controlPlay" class="icon-mini" :class="playIcon"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i class="icon-next" @click="nextSong"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
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
          <i @click.stop="controlPlay" class="icon-mini" :class="miniIcon"></i>
        </progress-circle>
      </div>
      <div class="control">
        <i class="icon-playlist"></i>
      </div>
    </div>
    </transition>
    <play-list></play-list>
    <audio
      ref="audio"
      :src="song"
      controls
      @canplay="setDuration"
      @timeupdate="updateTime"
      @ended="end"
      style="position: fixed; z-index: -200;opacity: 0;"
    ></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import { mapMutations } from 'vuex'
  import progressCircle from '@/baseComponents/progressCircle/progressCircle'
  import progressBar from '@/baseComponents/progressBar/progressBar'
  import playList from 'components/playList/playList'
  import animations from 'create-keyframe-animation'
  import { song } from '@/http/api'
  import { ERR_OK } from '@/http/config'

  export default {
    components: {
      progressCircle,
      playList,
      progressBar
    },
    data() {
      return {
        songReady: false,
        radius: 32,
        song: null,
        currentTime: 0,
        duration: 0 // 时长
      }
    },
    mounted() {
    },
    computed: {
      cdCls() {
        return this.playing ? 'play' : 'play paused'
      },
      disableCls() {
        return this.songReady ? '' : 'disable'
      },
      percent() {
        return this.currentTime / this.duration
      },
      playIcon() {
        return this.playing ? 'icon-pause' : 'icon-play'
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
    watch: {
      currentSong(newValue) {
        this.songReady = false
        this.setPlayStatus(false)
        // 获取歌曲
        this.getSong(newValue.privilege.id)
        // 获取歌词
        this.getLyric(newValue.privilege.id)
      },
      playing() {
        if(!this.songReady) {
          return
        }
        this.$nextTick(() => {
          let audio = this.$refs.audio
          this.playing ? audio.play() : audio.pause()
        })
      },
      currentTime(newValue) {
        this.currentTime = newValue
      }
    },
    methods: {
      back() {
        this.setFullScreen(false)
      },
      openFullScreen() {
        this.setFullScreen(true)
      },
      enter(el, done) {
        let {x,y,scale} = this._getPosAndScale()
        let animation = {
          0: {
            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0, 0, 0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0, 0, 0) scale(1)`
          }
        }
        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 1000,
            easing: 'linear'
          }
        })

        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
      },
      afterEnter() {
        animations.unregisterAnimation('move')
        this.$refs.cdWrapper.style.animation = ''
      },
      leave(el, done) {
        let {x,y,scale} = this._getPosAndScale()
        this.$refs.cdWrapper.style.transition = 'all 0.4s linear'
        this.$refs.cdWrapper.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        this.$refs.cdWrapper.addEventListener('transitionend', done)
      },
      afterLeave() {
        this.$refs.cdWrapper.style.transition = ''
        this.$refs.cdWrapper.style.transform = ''
      },
      _getPosAndScale() {
        let minWidth = 40
        let maxWidth = window.innerWidth * 0.8
        let maxX = window.innerWidth / 2
        let maxY = window.innerHeight - 20 - maxWidth / 2 // topHeight =  20
        let scale = minWidth / maxWidth
        let x = -(maxX - 20 - minWidth / 2)
        let y = maxY - 30 // minY = 60 / 2
        return { x, y, scale }
      },
      // 控制播放状态
      controlPlay() {
        this.setPlayStatus(!this.playing)
      },
      getSong(id) {
        let params = {
          id
        }
        song.getSong(params, res => {
          if (res.code === ERR_OK) {
            this.song = res.data.length > 0 ? res.data[0].url : null
            this.songReady = true
            if (this.song) {
              this.setPlayStatus(true)
            }
          }
        })
      },
      getLyric(id) {
        let params = {
          id
        }
        song.getLyric(params, res => {
          if (res.code === ERR_OK) {
            console.log(res)
          } else {
            console.log('error')
          }
        })
      },
      preSong() {
        if (parseInt(this.currentIndex) === 0) {
          this.setCurrentIndex(this.playList.length - 1)
        } else {
          this.setCurrentIndex(this.currentIndex - 1)
        }
      },
      nextSong() {
        if (parseInt(this.currentIndex) === this.playList.length) {
          this.setCurrentIndex(0)
        } else {
          this.setCurrentIndex(this.currentIndex + 1)
        }
      },
      updateTime(e) {
        this.currentTime = e.target.currentTime
      },
      end() {
        this.setCurrentIndex(this.currentIndex + 1)
      },
      setDuration(e) {
        this.duration = e.srcElement.duration
        // this.$refs.audio.duration
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayStatus: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX'
      })
    },
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
        .progress-wrapper
          display flex
          align-content center
          width 80%
          margin 0 auto
          padding 10px 0
          .time
            flex 0 0 30px
            width 30px
            font-size $font-size-12
            color $color-text
            line-height 30px
            &.time-l
              text-align left 
            &.time-r
              text-align right
          .progress-bar-wrapper
            flex 1
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
      &.normal-enter-active
        transition all .4s
        .top, .bottom
          transition all .4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-leave-active
        transition all .6s
        .top, .bottom
          transition all .4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        transform translateY(100%)
        /*.top
          transform translate3d(0, -100px, 0)
        .bottom
          transform translate3d(0, 100px, 0)*/
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
    &.mini-enter-active, &.mini-leave-active
      transition all 0.4s
    &.mini-enter, &.mini-leave-to
      opacity 0
      transform translateY(100%)
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