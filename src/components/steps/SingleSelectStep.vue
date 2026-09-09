<script setup>
import { useRouter } from 'vue-router'
import { useQuizStore } from '../../stores/quiz'
import StepShell from '../StepShell.vue'
import { imageUrl } from '../../utils/images'

const props = defineProps({ step: { type: Object, required: true } })
const router = useRouter()
const store = useQuizStore()

function select(value) {
  store.setAnswer(props.step.id, value)
  if (props.step.autoAdvance) {
    router.push(`/${props.step.id + 1}`)
  }
}

function back() {
  router.push(`/${props.step.id - 1}`)
}
</script>

<template>
  <StepShell :step-id="step.id" :show-back="step.showBack" @back="back">
    <h1 class="font-featured font-bold text-xl text-gray-950 text-center mt-2 mb-6">{{ step.title }}</h1>

    <!-- image-square: horizontal card, radio + label left, square thumbnail right -->
    <div v-if="step.optionLayout === 'image-square'" class="grid grid-cols-2 gap-3 mb-6">
      <button
        v-for="opt in step.options"
        :key="opt.value"
        type="button"
        class="flex items-center rounded-2xl border border-gray-200 bg-white hover:border-blue-500 text-left overflow-hidden"
        @click="select(opt.value)"
      >
        <span class="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 ml-3" />
        <span class="text-sm text-gray-950 flex-1 px-2 py-3">{{ opt.label }}</span>
        <img :src="imageUrl(opt.image)" :alt="opt.label" class="w-16 h-16 object-cover flex-shrink-0" />
      </button>
    </div>

    <!-- image-rect-3col: vertical card, image on top, label centered below -->
    <div v-else-if="step.optionLayout === 'image-rect-3col'" class="grid grid-cols-3 gap-3 mb-6">
      <button
        v-for="opt in step.options"
        :key="opt.value"
        type="button"
        class="flex flex-col items-center gap-2 p-2 rounded-2xl border border-gray-200 bg-white hover:border-blue-500"
        @click="select(opt.value)"
      >
        <img :src="imageUrl(opt.image)" :alt="opt.label" class="w-full rounded-xl object-cover aspect-[4/3]" />
        <span class="text-sm text-gray-950 text-center">{{ opt.label }}</span>
      </button>
    </div>

    <!-- emoji-left / emoji-right / plain / plain-uppercase -->
    <div v-else class="flex flex-col gap-3 mb-6">
      <button
        v-for="opt in step.options"
        :key="opt.value"
        type="button"
        class="w-full min-h-14 flex items-center px-4 py-3 rounded-2xl border border-gray-200 bg-white hover:border-blue-500 text-left"
        :class="step.optionLayout === 'plain-uppercase' ? 'justify-center text-center font-bold uppercase' : 'justify-between'"
        @click="select(opt.value)"
      >
        <span class="flex items-center gap-3">
          <span v-if="opt.emoji && step.optionLayout === 'emoji-left'" class="text-2xl">{{ opt.emoji }}</span>
          <span
            v-if="step.optionLayout !== 'plain-uppercase'"
            class="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0"
          />
          <span v-if="opt.richHTML" class="text-gray-950" v-html="opt.richHTML" />
          <span v-else-if="opt.label" class="text-gray-950">{{ opt.label }}</span>
        </span>
        <span v-if="opt.emoji && step.optionLayout === 'emoji-right'" class="text-2xl">{{ opt.emoji }}</span>
      </button>
    </div>
  </StepShell>
</template>
