<template>
  <ul>
    <li v-for="group in data" class="list-group" ref="listGroup" :key="group.id">
      <h2 class="list-group-title">{{}}</h2>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'listView',
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    mounted() {
    },
    watch: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>