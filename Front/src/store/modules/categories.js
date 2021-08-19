import axios from 'axios';
axios.defaults.baseURL = ''
const state = {
  status: 'inactive',
  categories: [],
}

const getters = {
  getStatus() { return state.status }
}

const mutations = {
  DOWNLOAD_ERROR(state) {
    state.status = 'error'
  },
  DOWNLOAD_SUCCESS(state, data) {
    state.status = 'success'
    // console.log(data.data)
    state.categories = data
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
        console.log('response: ', response.data.data)
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
