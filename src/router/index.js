import Vue from 'vue'
import Router from 'vue-router'
import ExerciseLog from '@/components/ExerciseLog.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ExerciseLog',
      component: ExerciseLog
    }
  ]
})
