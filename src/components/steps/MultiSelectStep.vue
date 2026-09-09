<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '../../stores/quiz'
import StepShell from '../StepShell.vue'

const props = defineProps({ step: { type: Object, required: true } })
const router = useRouter()
const store = useQuizStore()

const selected = computed(() => store.getAnswer(props.step.id) || [])

function toggle(value) {
  store.toggleMultiAnswer(props.step.id, value)
  if (props.step.autoAdvance) {
    router.push(`/${props.step.id + 1}`)
  }
}

function continueNext() {
  router.push(`/${props.step.id + 1}`)
}

function back() {
  router.push(`/${props.step.id - 1}`)
}
</script>

<template>
  <StepShell :step-id="step.id" :show-back="step.showBack" @back="back">
    <h1 class="font-featured font-bold text-xl text-gray-950 text-center mt-2 mb-1">{{ step.title }}</h1>
    <p v-if="step.subtitle" class="text-gray-500 text-center mb-4">{{ step.subtitle }}</p>

    <div class="flex flex-col gap-3 mb-6">
      <button
        v-for="opt in step.options"
        :key="opt.value"
        type="button"
        class="w-full min-h-14 flex items-center px-4 py-3 rounded-2xl border-2 bg-white text-left"
        :class="[
          selected.includes(opt.value) ? 'border-blue-500' : 'border-gray-200',
          step.optionLayout === 'emoji-right' ? 'justify-between' : '',
        ]"
        @click="toggle(opt.value)"
      >
        <span class="flex items-center gap-3">
          <span
            class="w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center text-xs"
            :class="selected.includes(opt.value) ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300'"
          >
            <span v-if="selected.includes(opt.value)">✓</span>
          </span>
          <span v-if="opt.emoji && step.optionLayout !== 'emoji-right'" class="text-2xl">{{ opt.emoji }}</span>
          <span class="text-gray-950">{{ opt.label }}</span>
        </span>
        <span v-if="opt.emoji && step.optionLayout === 'emoji-right'" class="text-2xl">{{ opt.emoji }}</span>
      </button>
    </div>

    <button
      v-if="step.continueButton"
      type="button"
      :disabled="selected.length === 0"
      class="w-full min-h-14 rounded-2xl font-semibold text-white bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed mb-6"
      @click="continueNext"
    >
      {{ step.continueButton }}
    </button>
  </StepShell>
</template>
