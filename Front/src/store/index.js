import { createStore } from 'vuex'
import loginStore from './modules/login'
import categoryStore from './modules/categories.js'

export default createStore({
  modules: {
    login: loginStore,
    category: categoryStore
  }
})