import Vue from 'vue'
import VueRouter from 'vue-router'
import RankRouter from './rank'
import RecommendRouter from './recommend'
import SearchRouter from './search'
import SingerRouter from './singer'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: "index",
      redirect: '/recommend'
    },
    ...RankRouter,
    ...RecommendRouter,
    ...SearchRouter,
    ...SingerRouter
]

const router = new VueRouter({
  routes
})

export default router
