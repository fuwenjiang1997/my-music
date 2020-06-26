<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/MHeader'
  import Tab from "components/tab/Tab";

  export default {
    components: {Tab, MHeader},
    comments: {
      MHeader,
      Tab
    }
  }
</script>

<style lang="stylus">
</style>
