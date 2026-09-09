<script setup>
import { useRouter } from 'vue-router'
import { useQuizStore } from '../../stores/quiz'
import { imageUrl } from '../../utils/images'

const props = defineProps({ step: { type: Object, required: true } })
const router = useRouter()
const store = useQuizStore()

function select(value) {
  store.setAnswer(props.step.id, value)
  router.push(`/${props.step.id + 1}`)
}
</script>

<template>
  <div class="min-h-screen bg-stone-100 flex flex-col">
    <div class="w-full max-w-[34rem] mx-auto px-4 pt-6 flex-1 flex flex-col pb-10">
      <h1 class="font-featured font-extrabold uppercase text-center leading-tight text-2xl mb-3">
        <span
          v-for="(line, i) in step.titleLines"
          :key="i"
          class="block"
          :class="line.color === 'blue' ? 'text-blue-500' : 'text-gray-950'"
        >
          {{ line.text }}
        </span>
      </h1>

      <p class="text-center mb-4">
        <span class="font-bold uppercase text-blue-500 bg-yellow-300 px-2 py-1 rounded">
          {{ step.highlight }}
        </span>
      </p>

      <img :src="imageUrl(step.heroImage)" alt="Antes e depois" class="w-full rounded-2xl mb-4" />

      <h2 class="font-featured font-bold text-xl text-gray-950 text-center mt-2 mb-1">{{ step.question }}</h2>
      <p v-if="step.questionSub" class="text-gray-500 text-center mb-4">{{ step.questionSub }}</p>

      <div class="grid grid-cols-2 gap-3 mb-4">
        <button
          v-for="opt in step.options"
          :key="opt.value"
          type="button"
          class="min-h-14 rounded-2xl bg-blue-500 text-white font-semibold flex items-center gap-2 justify-center px-3"
          @click="select(opt.value)"
        >
          <span class="w-4 h-4 rounded-full border-2 border-white flex-shrink-0" />
          {{ opt.label }}
        </button>
      </div>

      <div class="bg-blue-50 text-gray-950 text-center rounded-2xl p-4 mb-4">
        {{ step.supportText }}
      </div>

      <p class="text-center text-green-600 font-semibold mb-6">{{ step.footerBadge }}</p>
    </div>
  </div>
</template>
