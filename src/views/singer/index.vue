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
      this._getSingerList()
    },
    methods: {
      async _getSingerList() {
        let arr = new Array(27).fill(0)
        let resArr = new Array(27)
        for(let index in arr) {
          if (Number(index) === 0) {
            singersApi.getSingerList({}, res => {
              if (res.response.code === ERR_OK) {
                this.singerList.push(res.response.singerList.data.singerlist)
                resArr[index] = res.response.singerList.data.singerlist
              }
            })
          } else {
            let params = {
              index
            }
            arr[index] = new Promise((resolve, reject) => {
              singersApi.getSingerList(params, res => {
                if (res.response.code === ERR_OK) {
                  resArr[index] = res.response.singerList.data.singerlist
                  resolve()
                } else {
                  reject(res)
                }
              })
            })
          }
        }
        Promise.all(arr).then(() => {
          // this.singerList = resArr
        })
      }
    },
    components: {
      listView
    }
  }
</script>

<style scoped>

</style>