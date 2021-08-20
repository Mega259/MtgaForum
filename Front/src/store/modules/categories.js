import axios from 'axios';
axios.defaults.baseURL = ''
const state = {
  status: 'inactive',
  categories: []
}

const getters = {
  getCategoryStatus(state) { return state.status },
  getCategories(state) { return state.categories }
}

const mutations = {
  DOWNLOAD_ERROR(state) {
    state.status = 'error'
  },
  DOWNLOAD_SUCCESS(state, data) {
    state.status = 'success'
    state.categories = [...data]
  }
}

const actions = {
  async getCategories({ commit }) {
    try {
      const response = await axios.get('http://0.0.0.0:8000/category')
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
