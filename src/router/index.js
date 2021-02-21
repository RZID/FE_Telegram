import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Chat from '../views/Chat.vue'
import store from '../store/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: store.getters['auth/getToken'] ? '/chat' : '/login'
  },
  {
    path: '/chat/:chatId',
    name: 'Chat',
    component: Chat,
    meta: {
      for: 'logged'
    }
  },
  {
    path: '/chat/',
    name: 'Root',
    component: Chat,
    meta: {
      for: 'logged'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      for: 'unlog'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      for: 'unlog'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.for === 'unlog') {
    if (store.getters['auth/getToken']) {
      router.push('/')
    } else {
      next()
    }
  } else if (to.meta.for === 'logged') {
    if (store.getters['auth/getToken']) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router
