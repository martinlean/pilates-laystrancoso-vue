<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({ step: { type: Object, required: true } })
const router = useRouter()
const pct = ref(0)
const topProgress = computed(() => (props.step.id / 24) * 100)
let raf = null
let start = null

const current = ref(0)
let testimonialTimer = null

onMounted(() => {
  start = performance.now()
  const tick = (now) => {
    const elapsed = now - start
    pct.value = Math.min(100, Math.round((elapsed / props.step.durationMs) * 100))
    if (elapsed < props.step.durationMs) {
      raf = requestAnimationFrame(tick)
    } else {
      router.push(`/${props.step.id + 1}`)
    }
  }
  raf = requestAnimationFrame(tick)

  if (props.step.testimonials) {
    testimonialTimer = setInterval(() => {
      current.value = (current.value + 1) % props.step.testimonials.length
    }, 2000)
  }
})
onUnmounted(() => {
  raf && cancelAnimationFrame(raf)
  testimonialTimer && clearInterval(testimonialTimer)
})
</script>

<template>
  <div class="min-h-screen bg-stone-100 flex flex-col">
    <div class="w-full max-w-[34rem] mx-auto px-4 pt-4">
      <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div class="h-full bg-blue-500 transition-all duration-300" :style="{ width: topProgress + '%' }" />
      </div>
    </div>
    <div class="w-full max-w-[34rem] mx-auto px-4 flex-1 flex flex-col justify-center">
      <div v-if="step.newsMockup" class="bg-white rounded-2xl overflow-hidden mb-6 border border-gray-200">
        <div class="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
          <span class="text-gray-500">≡</span>
          <span class="font-featured font-bold text-sm">
            gI <span class="text-blue-500">{{ step.newsMockup.badge }}</span>
          </span>
        </div>
        <div class="p-3">
          <p class="font-semibold text-gray-950 text-sm leading-snug">{{ step.newsMockup.headline }}</p>
        </div>
      </div>

      <div v-if="step.testimonials" class="mb-6">
        <div class="bg-white rounded-2xl p-3 border border-gray-200">
          <span class="text-yellow-400 block mb-1">★★★★★</span>
          <p class="text-sm font-semibold text-gray-950">{{ step.testimonials[current].name }}</p>
          <p class="text-xs text-gray-500 mb-2">{{ step.testimonials[current].role }}</p>
          <p class="text-sm text-gray-700">{{ step.testimonials[current].text }}</p>
        </div>
      </div>

      <p v-if="step.statusText" class="text-center font-bold text-gray-950 mb-4">{{ step.statusText }}</p>

      <div class="flex items-center justify-between text-sm text-gray-500 mb-1">
        <span>Analisando suas respostas</span>
        <span>{{ pct }}%</span>
      </div>
      <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-3">
        <div class="h-full bg-blue-500 transition-all" :style="{ width: pct + '%' }" />
      </div>
      <p v-if="step.rotatingTexts" class="text-center text-gray-950 font-medium mb-6">{{ step.rotatingTexts[0] }}</p>
    </div>
  </div>
</template>
