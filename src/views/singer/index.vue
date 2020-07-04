<template>
  <div class="singer">
    <list-view :data="singerList" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
  import {singersApi} from '@/http/api'
  import {ERR_OK} from '@/http/config'
  import listView from './listView'
  import { mapMutations  } from 'vuex'

  export default {
    name: "index",
    data() {
      return {
        singerList: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      _getSingerList() {
        let params = {
          type: -1,
          area: -1,
        }
        let arr = new Array(27).fill(0)
        let resArr = new Array(27)
        for(let index in arr) {
          if (Number(index) === 0) {
            params.initial = -1
            singersApi.getSingerList(params, res => {
              if (res.code === ERR_OK) {
                this.singerList.push(res.artists)
                resArr[index] = res.artists
              }
            })
          } else {
            params = {
              initial: String.fromCharCode(parseInt(index) + 96),
              limit: 10
            }
            arr[index] = new Promise((resolve, reject) => {
              singersApi.getSingerList(params, res => {
                if (res.code === ERR_OK) {
                  resArr[index] = res.artists
                  resolve()
                } else {
                  reject(res)
                }
              })
            })
          }
        }
        Promise.all(arr).then(() => {
          this.singerList = resArr
          console.log(resArr)
        })
      },
      selectSinger(singer) {
        this.setSinger(singer)
        this.$router.push('/singer/singerDetail/' + singer.id)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      listView
    }
  }
</script>

<style scoped lang="stylus">
  .singer
    position fixed
    top 88px
    bottom 0
    width 100%
</style>