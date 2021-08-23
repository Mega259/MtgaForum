import { createStore } from 'vuex'
import loginStore from './modules/login'
import categoryStore from './modules/categories.js'
import topicStore from './modules/topics.js'

export default createStore({
  modules: {
    login: loginStore,
    category: categoryStore,
    topic: topicStore
  }
})