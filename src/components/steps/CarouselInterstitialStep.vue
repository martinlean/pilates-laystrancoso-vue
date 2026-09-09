<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import StepShell from '../StepShell.vue'
import { imageUrl } from '../../utils/images'

const props = defineProps({ step: { type: Object, required: true } })
const router = useRouter()
const current = ref(0)
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    current.value = (current.value + 1) % props.step.slides.length
  }, 2500)
})
onUnmounted(() => clearInterval(timer))

function continueNext() {
  router.push(`/${props.step.id + 1}`)
}

function back() {
  router.push(`/${props.step.id - 1}`)
}
</script>

<template>
  <StepShell :step-id="step.id" :show-back="step.showBack" @back="back">
    <h1 class="font-featured font-bold text-xl text-gray-950 text-center mt-2 mb-2">{{ step.title }}</h1>
    <p class="text-blue-500 text-center underline mb-4">{{ step.linkSubtitle }}</p>

    <div class="relative mb-3 rounded-2xl overflow-hidden bg-gray-200 aspect-square">
      <img :src="imageUrl(step.slides[current].image)" alt="Depoimento" class="w-full h-full object-cover" />
      <span class="absolute bottom-2 right-2 bg-black/60 text-white text-sm px-2 py-1 rounded">
        {{ step.slides[current].age }}
      </span>
    </div>
    <div class="flex justify-center gap-2 mb-6">
      <span
        v-for="(s, i) in step.slides"
        :key="i"
        class="w-2 h-2 rounded-full"
        :class="i === current ? 'bg-blue-500' : 'bg-gray-300'"
      />
    </div>

    <button type="button" class="w-full min-h-14 rounded-2xl font-semibold text-white bg-blue-500 mb-3" @click="continueNext">
      {{ step.continueButton }}
    </button>
    <p class="text-center text-gray-500 text-sm mb-6">{{ step.supportText }}</p>
  </StepShell>
</template>
