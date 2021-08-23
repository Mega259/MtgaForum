import axios from 'axios';
axios.defaults.baseURL = ''
const state = {
  status: 'inactive',
  topics: []
}

const getters = {
  getTopicStatus(state) { return state.status },
  getTopicsCategory(state) { return state.topics }
}

const mutations = {
  DOWNLOAD_ERROR(state) {
    state.status = 'error'
  },
  DOWNLOAD_SUCCESS(state, data) {
    state.status = 'success'
    console.log(data)
    state.topics = [...data]
  }
}

const actions = {
  async downloadTopicsCategory({ commit }, categoryId) {
    console.log(categoryId)
    try {
      const response = await axios.get(`http://0.0.0.0:8000/topic?categoryId=${categoryId}`)
      if (!response.data) {
        console.log('no data')
        commit('DOWNLOAD_ERROR')
      } else {
        commit('DOWNLOAD_SUCCESS', response.data.data, categoryId)
      }
    } catch (err) {
      console.log(err)
      commit('DOWNLOAD_ERROR')
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
