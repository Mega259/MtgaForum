import axios from 'axios';

axios.defaults.baseURL = ''
const state = {
  status: 'inactive',
  topics: {},
  fullTopic: {}
}

const getters = {
  getTopicStatus(state) { return state.status },
  getAllTopics(state) { return state.topics },
  getTopicsCategory: (state) => (categoryId) => {
    console.log("getTopicsCategory", categoryId, state.topics)
    return Object.values(state.topics).filter(el => el.categoryId === categoryId).length > 0 ? Object.values(state.topics).find(el => el.categoryId === categoryId) : []
  },
  getFullTopic(state) { return state.fullTopic }
}

const mutations = {
  DOWNLOAD_ERROR(state) {
    state.status = 'error'
  },
  DOWNLOAD_SUCCESS(state, data) {
    console.log("download topics success", data)
    const categoryId = Object.keys(data)[0]
    if (Object.keys(state.topics).length !== 0 && categoryId in Object.keys(state.topics)) {
      state.topics = { ...state.topics, ...data }
    } else if (Object.keys(state.topics).length === 0) {
      state.topics = { ...data }
    } else {
      state.topics = { ...state.topics, ...data }
    }
    console.log('download topics ending', state.topics)
    state.status = 'success'
  },
  DOWNLOAD_FULL_TOPIC_SUCCESS(state, data) {
    console.log("download full topics success", data)
    state.fullTopic = { ...data }
  }
}

const actions = {
  async downloadTopicsCategory({ commit }, categoryId) {
    try {
      const response = await axios.get(`http://0.0.0.0:8000/topic?categoryId=${categoryId}`)
      if (!response.data) {
        console.log('no data')
        commit('DOWNLOAD_ERROR')
      } else {
        const toAdd = {}
        toAdd[categoryId] = response.data.data
        console.log(toAdd, response.data.data, categoryId)
        commit('DOWNLOAD_SUCCESS', toAdd)
      }
    } catch (err) {
      console.log(err)
      commit('DOWNLOAD_ERROR')
    }
  },
  async downloadFullTopic({ commit }, topicId) {
    try {
      const response = await axios.get(`http://0.0.0.0:8000/topic/fulltopic?id=${topicId}`)
      if (!response.data) {
        console.log('no data')
        commit('DOWNLOAD_ERROR')
      } else {
        const toAdd = {}
        toAdd[topicId] = response.data.data
        console.log(toAdd, response.data.data, topicId)
        commit('DOWNLOAD_FULL_TOPIC_SUCCESS', response.data.data)
      }
    } catch (err) {
      console.log(err)
      commit('DOWNLOAD_ERROR')
    }
  },
  async downloadAllTopicsCategory({ commit }, categoryName) {
    try {
      const response = await axios.get(`http://0.0.0.0:8000/topic/allTopicsCategory?title=${categoryName}`)
      if (!response.data) {
        console.log('no data')
        commit('DOWNLOAD_ERROR')
      } else {
        commit('DOWNLOAD_SUCCESS', response.data.data)
      }
    } catch (err) {
      console.log(err)
      commit('DOWNLOAD_ERROR')
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
