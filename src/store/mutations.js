import * as mutationsTypes from './mutationsTypes'

const mutations = {
  [mutationsTypes.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [mutationsTypes.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [mutationsTypes.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [mutationsTypes.SET_PLAY_LIST](state, list) {
    if (Object.prototype.toString.call(list) === '[object Array]') {
      state.playList = list
    } else {
      state.playList = [list]
    }
  },
  [mutationsTypes.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [mutationsTypes.SET_MODE](state, mode) {
    state.mode = mode
  },
  [mutationsTypes.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  }

}

export default mutations