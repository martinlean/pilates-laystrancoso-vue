<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({ step: { type: Object, required: true } })
const router = useRouter()

function continueNext() {
  router.push(`/${props.step.id + 1}`)
}

function back() {
  router.push(`/${props.step.id - 1}`)
}

// Chart geometry (viewBox units)
const VB_W = 440
const VB_H = 190
const X1 = 44
const X2 = 420
const Y_TOP = 14
const Y_BOTTOM = 160

function valueToY(v) {
  const { yMin, yMax } = props.step.chart
  const ratio = (v - yMin) / (yMax - yMin)
  return Y_BOTTOM - ratio * (Y_BOTTOM - Y_TOP)
}

const yIdeal = computed(() => valueToY(props.step.chart.markerIdeal.value))
const yYou = computed(() => valueToY(props.step.chart.markerYou.value))

const ticks = computed(() => {
  const { yMin, yMax } = props.step.chart
  const steps = 4
  return Array.from({ length: steps + 1 }, (_, i) => {
    const value = yMin + ((yMax - yMin) * i) / steps
    return { value: Math.round(value), y: valueToY(value) }
  }).reverse()
})

const areaPoints = computed(
  () => `${X1},${Y_BOTTOM} ${X1},${yIdeal.value} ${X2},${yYou.value} ${X2},${Y_BOTTOM}`,
)

function pct(v, total) {
  return (v / total) * 100
}
</script>

<template>
  <div class="min-h-screen bg-stone-100 flex flex-col">
    <div class="w-full max-w-[34rem] mx-auto px-4 pt-4 flex-1 flex flex-col pb-10">
      <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div class="h-full bg-blue-500 transition-all duration-300" :style="{ width: (step.id / 24) * 100 + '%' }" />
      </div>
      <button type="button" aria-label="Voltar" class="mb-2 text-gray-500 text-xl leading-none text-left" @click="back">
        ←
      </button>

      <div class="bg-red-50 border border-red-200 rounded-2xl p-4 text-center mb-4">
        <p class="text-red-600 font-bold mb-1">{{ step.alertTitle }}</p>
        <p class="text-gray-950 font-medium">{{ step.alertLine1 }}</p>
        <p class="text-red-600 font-extrabold underline text-lg">{{ step.alertLine2 }}</p>
      </div>

      <p class="font-bold text-xl text-gray-950 mb-2">{{ step.chartLabel }}</p>

      <div class="bg-white rounded-2xl p-4 pt-8 mb-4 border border-gray-200 relative">
        <div class="relative" :style="{ paddingBottom: (VB_H / VB_W) * 100 + '%' }">
          <svg :viewBox="`0 0 ${VB_W} ${VB_H}`" class="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="diagLineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#dc2626" />
                <stop offset="50%" stop-color="#facc15" />
                <stop offset="100%" stop-color="#22c55e" />
              </linearGradient>
              <linearGradient id="diagFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="white" stop-opacity="0.9" />
                <stop offset="100%" stop-color="white" stop-opacity="0.05" />
              </linearGradient>
              <mask id="diagAreaMask">
                <rect x="0" y="0" :width="VB_W" :height="VB_H" fill="url(#diagFade)" />
              </mask>
            </defs>

            <polygon :points="areaPoints" fill="url(#diagLineGrad)" mask="url(#diagAreaMask)" />
            <line :x1="X1" :y1="yIdeal" :x2="X2" :y2="yYou" stroke="url(#diagLineGrad)" stroke-width="3" stroke-linecap="round" />

            <text v-for="t in ticks" :key="t.value" :x="X1 - 10" :y="t.y + 4" text-anchor="end" font-size="13" fill="#9ca3af">
              {{ t.value }}
            </text>

            <circle :cx="X1" :cy="yIdeal" r="11" fill="#d1d5db" opacity="0.6" />
            <circle :cx="X1" :cy="yIdeal" r="6" fill="#dc2626" stroke="white" stroke-width="2" />
            <circle :cx="X2" :cy="yYou" r="11" fill="#d1d5db" opacity="0.6" />
            <circle :cx="X2" :cy="yYou" r="6" fill="#22c55e" stroke="white" stroke-width="2" />
          </svg>

          <span
            class="absolute -translate-x-1/2 -translate-y-full bg-white border border-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-950 whitespace-nowrap shadow-sm"
            :style="{ left: pct(X1, VB_W) + '%', top: pct(yIdeal, VB_H) + '%', marginTop: '-8px' }"
          >
            {{ step.chart.markerIdeal.label }}
          </span>
          <span
            class="absolute -translate-x-1/2 -translate-y-full bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white whitespace-nowrap shadow-sm"
            :style="{ left: pct(X2, VB_W) + '%', top: pct(yYou, VB_H) + '%', marginTop: '-8px' }"
          >
            {{ step.chart.markerYou.label }}
          </span>
        </div>
        <div class="flex justify-between text-sm text-gray-500 mt-2">
          <span>{{ step.chart.xAxisLeft }}</span>
          <span>{{ step.chart.xAxisRight }}</span>
        </div>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <p v-for="(item, i) in step.highlightList" :key="i" class="text-gray-950 text-sm" v-html="item.html" />
      </div>

      <div class="bg-green-50 border border-green-200 rounded-2xl p-3 text-center font-semibold text-green-700 mb-6">
        {{ step.greenBox }}
      </div>

      <button type="button" class="w-full min-h-14 rounded-2xl font-semibold text-white bg-blue-500 mb-6" @click="continueNext">
        {{ step.continueButton }}
      </button>
    </div>
  </div>
</template>

<style scoped>
:deep(mark) {
  background-color: #fef08a;
  padding: 0 2px;
}
</style>
