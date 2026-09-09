<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import StepShell from '../StepShell.vue'
import { imageUrl } from '../../utils/images'

const props = defineProps({ step: { type: Object, required: true } })
const router = useRouter()

const titleParts = computed(() => {
  const idx = props.step.title.indexOf(props.step.titleUnderline)
  if (idx === -1) return [props.step.title, '', '']
  return [
    props.step.title.slice(0, idx),
    props.step.titleUnderline,
    props.step.title.slice(idx + props.step.titleUnderline.length),
  ]
})

function cta() {
  router.push(`/${props.step.id + 1}`)
}

function back() {
  router.push(`/${props.step.id - 1}`)
}
</script>

<template>
  <StepShell :step-id="step.id" :show-back="step.showBack" @back="back">
    <h1 class="font-featured font-bold text-xl text-gray-950 text-center mt-2 mb-4">
      {{ titleParts[0] }}<span class="underline">{{ titleParts[1] }}</span>{{ titleParts[2] }}
    </h1>

    <img :src="imageUrl(step.image)" alt="Solução Pilates" class="w-full rounded-2xl mb-4" />

    <h2 class="font-featured font-bold text-center text-gray-950 mb-3">{{ step.subtitle2 }}</h2>

    <div class="grid grid-cols-2 gap-3 mb-4">
      <div v-for="(c, i) in step.cards" :key="i" class="bg-white rounded-2xl p-3 border border-gray-200">
        <p class="font-bold text-gray-950 bg-yellow-200 inline-block px-1 rounded mb-1">{{ c.title }}</p>
        <p class="text-sm text-gray-700">{{ c.text }}</p>
      </div>
    </div>

    <p class="font-bold text-center text-gray-950 mb-2">{{ step.listTitle }}</p>
    <ul class="flex flex-col gap-2 mb-4">
      <li v-for="(item, i) in step.checklist" :key="i" class="flex items-center gap-2 text-gray-950">
        <span class="text-green-500">✅</span>{{ item }}
      </li>
    </ul>

    <p class="text-center font-bold text-blue-600 mb-3">{{ step.question }}</p>
    <button type="button" class="w-full min-h-14 rounded-2xl font-semibold text-white bg-blue-500 mb-6" @click="cta">
      {{ step.ctaButton }}
    </button>
  </StepShell>
</template>
