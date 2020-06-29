<template>
  <div>
    <list-view :data="singerList"></list-view>
  </div>
</template>

<script>
  import {singersApi} from '@/http/api'
  import {ERR_OK} from '@/http/config'
  import listView from 'components/listView/listView'

  export default {
    name: "index",
    data() {
      return {
        singerList: []
      }
    },
    mounted() {
      let a = this._getSingerList()
      a.then(res => {
        console.log(res)
      })
    },
    methods: {
      async _getSingerList() {
        let arr = []
        for (let i = 0; i < 27; i++) {
          let params = {}
          if (i !== 0) {
            params.index = i
          }
          await singersApi.getSingerList(params, res => {
            console.log(i)
            if (res.response.code === ERR_OK) {
              arr.push(res.response.singerList.data.singerlist)
            }
          })
        }
        return arr
      }
    },
    components: {
      listView
    }
  }
</script>

<style scoped>

</style>