<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList.v_hot">
      <div>
        <div v-if="sliderImgList.content && sliderImgList.content.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="item in sliderImgList.content" :key="item.id">
              <a>
                <img class="needsclick" @load="loadImage" :src="item.pic_info.url">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="item in discList.v_hot" :key="item.content_id" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.cover">
              </div>
              <div class="text">
                <h2 class="name">{{item.username}}</h2>
                <p class="desc">{{item.title}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.v_hot || !discList.v_hot.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import { recommendsApi } from '@/http/api'
  import { ERR_OK } from '@/http/config'
  import Slider from 'components/slider/slider.vue'
  import Scroll from '@/baseComponents/scroll/scroll'
  import Loading from '@/baseComponents/loading/loading'

  export default {
    name: "index",
    data() {
      return {
        recommends: [],
        discList: [],
        sliderImgList: []
      }
    },
    created() {
      this._getRecommend()
    },
    methods: {
      _getRecommend() {
        let params = {
          uin: 0,
          outCharset: 'utf-8¬ice=0',
          platform: 'h5',
          needNewCode: 1,
          tpl: 3,
          page: 'detail',
          type: 'top',
          topid: 36
        }
        // Object.assign(params, commonParams)
        recommendsApi.getRecommend(params, res => {
          res = res.response
          console.log(res)
          if (res.code === ERR_OK) {
            // 轮播图
            this.sliderImgList = res.focus.data
            this.discList = res.recomPlaylist.data
            console.log(this.sliderImgList.content.length)
          } else {
            console.log(res)
          }
        })
      },
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },
      selectItem(item) {
        console.log(item)
      },
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''

        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
    },
    components: {
      Scroll,
      Slider,
      Loading
    }
  }
</script>

<style scoped lang="stylus">
  @import '~@/assets/css/variable.styl'

  .recommend {
    position fixed
    top 88px
    bottom 0
    width 100%
    .recommend-content {
      height 100%
      overflow hidden
      .slider-wrapper {
        position relative
        width 100%
        overflow hidden
      }
      .recommend-list {
        .list-title {
          height 65px
          line-height: 65px
          text-align center
          font-size $font-14
          color $color-theme
        }
        .item {
          display flex
          box-sizing border-box
          align-content center
          padding 0 20px 20px
          .icon {
            flex 0 0 60px
            width 60px
            padding-right 20px
          }
          .text {
            display flex
            flex-direction column
            justify-content center
            flex 1
            line-height 20px
            overflow hidden
            font-size $font-14
            .name {
              margin-bottom 10px
              color $color-text
            }
            .desc {
              color $color-text-d
            }
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
  }
</style>