import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import AddTask from '@/views/AddTask'
import AuthPage from '@/views/AuthPage'

import NotFound from '@/views/404'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthPage,
  },
  {path: '/add', name: 'addTask', component: AddTask},

  {
    path: '/task/:id',
    name: 'task',
    component: () => import('@/views/Task.vue'),
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('@/views/TaskList'),
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',

  routes,
})

export default router
