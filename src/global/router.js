import Vue from 'vue'
import VueRouter from 'vue-router'
const Note = () => import('@/pages/Note.vue')

Vue.use(VueRouter)

console.log(process.env.BASE_URL)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/note'
  },
  {
    path: '*',
    name: '404',
    redirect: '/note'
  },
  {
    path: '/note',
    name: 'note',
    component: Note
  }
]

const base = process.env.NODE_ENV === 'development' ? '/' : 'greatbear412.github.io/'

const router = new VueRouter({
  mode: 'history',
  base: base,
  routes
})

export default router
