import { createRouter, createWebHashHistory } from 'vue-router'
import Hall from '../views/Hall.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Hall',
    component: Hall
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  }, {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Register
  }, {
    path: '/forum',
    name: 'Forum',
    component: Hall,
    props: { selected: "forum" }
  }, {
    path: '/forum/:categoryName',
    name: 'ForumCategory',
    component: Hall,
    props: { selected: "forum" }
  }, {
    path: '/articles',
    name: 'Articles',
    component: Hall,
    props: { selected: "articles" }
  }, {
    path: '/profile',
    name: 'profile',
    component: Hall,
    props: { selected: "profile" }
  }, {
    path: '/data',
    name: 'Data',
    component: Hall,
    props: { selected: "data" }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
