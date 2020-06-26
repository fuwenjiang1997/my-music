<template>
  <div class="recommend" ref="recommend">
    <div>
      <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">

      </div>
    </div>
  </div>
</template>

<script>
  // import { getRecommend } from '@/http/recommend'
  import api from '@/http/api'
  import { commonParams } from '@/http/config'

  export default {
    name: "index",
    data () {
      return {
        recommends: [],
        discList: []
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
        Object.assign(params, commonParams)
        api.recommends.getRecommend(params, res => {
          console.log(res)
          // if (res.code === ERR_OK) {
          //   this.discList = res.data.list
          // } else {
          //   console.log(res)
          // }
        })
      }
    }
  }
</script>

<style scoped>

</style>