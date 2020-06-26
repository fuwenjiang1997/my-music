<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text font-18">Love Music</h1>
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine font-20"></i>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "MHeader"
  }
</script>

<style scoped lang="stylus">
  @import '~@/assets/css/variable.styl'
  @import '~@/assets/css/mixin.styl'

  .m-header {
    position relative
    height 44px
    text-align center
    color $color-theme
    font-size 0
    .icon {
      display inline-block
      width 30px
      height 32px
      margin-top: 6px
      margin-right 9px
      vertical-align top
      bg-image('logo')
      background-size 30px 32px
    }
    .text {
      display inline-block
      vertical-align top
      line-height 44px
    }
    .mine {
      position absolute
      top 0
      right 0
      .icon-mine {
        display block
        padding 12px
        color $color-theme
      }
    }
  }
</style>