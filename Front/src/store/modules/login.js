// import jwt from 'jsonwebtoken'
// import signIn from '../../services/login/login'
import axios from 'axios'
axios.defaults.baseURL = ''

const state = {
  isLoggedIn: false,
  token: null,
  status: 'inactive',
  role: 2
}

const getters = {
  isLogged() {
    return state.token
  },
  authStatus() {
    return state.status
  },
  getRole() {
    return state.role
  }
}

const actions = {
  async login({ commit }, { email, password }) {
    try {
      const response = await axios.post('http://0.0.0.0:8000/api/signin', {
        logemail: email,
        logpass: password
      })
      if (!response.data.data.token) {
        console.log('auth error')
      } else {
        commit('AUTH_SUCCESS', response.data.data.token)
      }
    } catch (err) {
      console.log(err)
    }
  },
  logout({ commit }) {
    try {
      commit('AUTH_LOGOUT')
    } catch (err) {
      commit('AUTH_ERROR')
    }
  }
}

const mutations = {
  AUTH_REQUEST() {
    state.status = 'loading'
  },
  AUTH_SUCCESS(state, token, role) {
    state.status = 'success'
    state.role = role
    state.token = token
  },
  AUTH_ERROR() {
    state.status = 'error'
  },
  AUTH_LOGOUT() {
    state.token = null
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
