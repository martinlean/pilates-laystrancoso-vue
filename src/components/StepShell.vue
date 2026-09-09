<script setup>
import { computed } from 'vue'

const props = defineProps({
  stepId: { type: Number, default: null },
  showBack: { type: Boolean, default: false },
})
defineEmits(['back'])

// The original site derives the top progress bar from (current step / 24) * 100
// at runtime — it is not a value stored per step. Hidden on step 1.
const progress = computed(() => {
  if (props.stepId === null || props.stepId <= 1) return null
  return (props.stepId / 24) * 100
})
</script>

<template>
  <div class="min-h-screen bg-stone-100 flex flex-col">
    <div class="w-full max-w-[34rem] mx-auto px-4 pt-4">
      <button
        v-if="showBack"
        type="button"
        aria-label="Voltar"
        class="mb-2 text-gray-500 text-xl leading-none"
        @click="$emit('back')"
      >
        ←
      </button>
      <div v-if="progress !== null" class="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div class="h-full bg-blue-500 transition-all duration-300" :style="{ width: progress + '%' }" />
      </div>
    </div>
    <div class="w-full max-w-[34rem] mx-auto px-4 flex-1 flex flex-col pb-10">
      <slot />
    </div>
  </div>
</template>
