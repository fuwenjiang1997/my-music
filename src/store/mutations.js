import * as mutationsTypes from './mutationsTypes'

const mutations = {
  [mutationsTypes.SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default mutations