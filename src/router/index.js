import { createRouter, createWebHistory } from 'vue-router'
import QuizView from '../views/QuizView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/1' },
    {
      path: '/:step(\\d+)',
      name: 'quiz-step',
      component: QuizView,
      props: (route) => ({ step: Number(route.params.step) }),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
