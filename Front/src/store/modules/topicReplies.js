import axios from 'axios';
axios.defaults.baseURL = ''
const state = {
  status: 'inactive',
  topicReplies: {}
}

const getters = {
  getTopicReplayStatus(state) { return state.status },
  getTopicReplies(state) { return state.topicReplies },
  getTopicRepliesTopic(state, topicId) { return state.topicReplies[topicId] }
}

const mutations = {
  DOWNLOAD_ERROR(state) {
    state.status = 'error'
  },
  DOWNLOAD_SUCCESS(state, data) {
    console.log("topicReply success", data)
    const topicId = Object.keys(data)[0]
    if (Object.keys(state.topicReplies).length !== 0 && topicId in state.topicReplies) {
      state.topicReplies[topicId] = data
    } else if (Object.keys(state.topicReplies).length !== 0) {
      state.topicReplies = { ...data, ...state.topicReplies }
    } else {
      state.topicReplies = data
    }
    state.status = 'success'
  }
}

const actions = {
  async downloadTopicReplies({ commit }, topicId) {
    try {
      const response = await axios.get(`http://0.0.0.0:8000/topicReply?topicId=${topicId}`)
      if (!response.data) {
        console.log('no data')
        commit('DOWNLOAD_ERROR')
      } else {
        const toAdd = {}
        toAdd[topicId] = response.data.data
        commit('DOWNLOAD_SUCCESS', toAdd)
      }
    } catch (err) {
      console.log(err)
      commit('DOWNLOAD_ERROR')
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
