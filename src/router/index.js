import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Todo from '../views/Todo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/todo/:id',
    name: 'todo',
    component: Todo
  }
]

const router = new VueRouter({
  routes
})

export default router
