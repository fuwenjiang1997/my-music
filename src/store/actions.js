import * as types from './mutationsTypes'

export const selectPlay = function ({commit}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list) // 顺序播放列表
  commit(types.SET_PLAY_LIST, list)  // 播放列表
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}