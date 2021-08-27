import axios from 'axios';
axios.defaults.baseURL = ''
const state = {
  status: 'inactive',
  categories: []
}

const getters = {
  getCategoryStatus(state) { return state.status },
  getCategories(state) { return state.categories },
  getCategoryByTitle: (state) => (title) => {
    console.log("getCategoryByTitle", title, state.categories)
    return Object.values(state.categories).filter(el => el.title === title).length > 0 ? Object.values(state.categories).find(el => el.title === title) : {}
  },
}

const mutations = {
  DOWNLOAD_ERROR(state) {
    state.status = 'error'
  },
  DOWNLOAD_SUCCESS(state, data) {
    console.log("category success", data)
    state.status = 'success'
    state.categories = data
  }
}

const actions = {
  async downloadCategories({ commit }) {
    try {
      const response = await axios.get('http://0.0.0.0:8000/category')
      if (!response.data) {
        console.log('no data')
        commit('DOWNLOAD_ERROR')
      } else {
        console.log("downloadCategories", [...response.data.data])
        commit('DOWNLOAD_SUCCESS', [...response.data.data])
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
