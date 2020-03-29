import Vue from 'vue'
import Router from 'vue-router'
import TeacherBoard from '@/views/TeacherBoard.vue'
import StudentBoard from '@/views/StudentBoard.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TeacherBoard',
      component: TeacherBoard
    },
    {
      path: '/student',
      name: 'StudentBoard',
      component: StudentBoard
    }
  ]
})
