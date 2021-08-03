import { createStore } from 'vuex'
import loginStore from './modules/login'


export default createStore({
  modules: {
    login: loginStore,
  }
})