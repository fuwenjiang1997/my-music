<template>
  <div class="tab font-14 flex">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Tab'
  }
</script>

<style scoped lang="stylus">
  @import '~@/assets/css/variable.styl'
  .tab {
    height 44px
    line-height 44px
    .tab-item {
      flex 1
      text-align center
      .tab-link {
        padding-bottom 5px
        color $color-text-l
      }
    }
  }
</style>