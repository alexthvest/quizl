import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from '../pages/HomePage'
import QuizPage from '../pages/QuizPage'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/quiz/:id',
      component: QuizPage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})