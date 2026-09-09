import { defineStore } from 'pinia'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    answers: {},
  }),
  getters: {
    totalSteps() {
      return 24
    },
  },
  actions: {
    setAnswer(stepId, value) {
      this.answers[stepId] = value
    },
    toggleMultiAnswer(stepId, value) {
      const current = this.answers[stepId] ? [...this.answers[stepId]] : []
      const idx = current.indexOf(value)
      if (idx >= 0) {
        current.splice(idx, 1)
      } else {
        current.push(value)
      }
      this.answers[stepId] = current
    },
    getAnswer(stepId) {
      return this.answers[stepId]
    },
  },
})
