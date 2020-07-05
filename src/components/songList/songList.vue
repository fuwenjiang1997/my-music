<template>
  <div class="song-list">
    <ul>
      <li
        class="item font-14"
        v-for="(song, index) in songs"
        :key="index"
        @click="selectItem(song, index)"
      >
        <div class="rank">
          <span></span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getSongName(song)}}-{{song.al.name}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      songs: {
        type: Array,
        default() {
          return []
        }
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    created() {
    },
    computed: {
    },
    methods: {
      getSongName(song) {
        let arr = []
        song.ar.forEach(item => {
          arr.push(item.name)
        })
        return arr.join('·')
      },
      selectItem(item, index) {
        this.$emit('selectItem', {item, index})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~@/assets/css/variable.styl'
  @import '~@/assets/css/mixin.styl'
  .song-list
    .item
      display flex
      align-items center
      box-sizing border-box
      height 64px
      .rank
        flex 0 0 25px
        width 25px
        margin-right 30px
        text-align center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            bg-image('third')
        .text
          color $color-theme
          font-size $font-size-large
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
</style>