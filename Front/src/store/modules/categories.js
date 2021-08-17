import axios from 'axios';
import Category from '../../models/Categories.js'
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
    state.category = 
  }
}

const actions = {
  async getCategories({ commit, rootState }) {
    try {
      const response = await axios.get('http://0.0.0.0:8000/categories')
      if (!response.data) {
        console.log('no data')
        commit('DOWNLOAD_ERROR')
      } else {
        console.log('response: ', response.data.map(el => new Category(el)))
        commit('DOWNLOAD_SUCCESS', response.data.map(el => new Category(el)))
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
