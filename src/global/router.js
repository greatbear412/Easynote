import Vue from 'vue'
import VueRouter from 'vue-router'
const Note = () => import('@/pages/Note.vue')

Vue.use(VueRouter)

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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
