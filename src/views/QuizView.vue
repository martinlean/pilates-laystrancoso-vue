<script setup>
import { computed } from 'vue'
import { getStep } from '../data/quizSteps'

import LandingStep from '../components/steps/LandingStep.vue'
import SingleSelectStep from '../components/steps/SingleSelectStep.vue'
import MultiSelectStep from '../components/steps/MultiSelectStep.vue'
import CarouselInterstitialStep from '../components/steps/CarouselInterstitialStep.vue'
import LoadingStep from '../components/steps/LoadingStep.vue'
import DiagnosisStep from '../components/steps/DiagnosisStep.vue'
import SolutionStep from '../components/steps/SolutionStep.vue'
import OfferStep from '../components/steps/OfferStep.vue'

const props = defineProps({ step: { type: Number, required: true } })

const stepData = computed(() => getStep(props.step))

const componentMap = {
  landing: LandingStep,
  'single-select': SingleSelectStep,
  'multi-select': MultiSelectStep,
  'carousel-interstitial': CarouselInterstitialStep,
  loading: LoadingStep,
  diagnosis: DiagnosisStep,
  solution: SolutionStep,
  offer: OfferStep,
}

const currentComponent = computed(() => (stepData.value ? componentMap[stepData.value.type] : null))
</script>

<template>
  <component :is="currentComponent" v-if="currentComponent" :key="step" :step="stepData" />
  <div v-else class="min-h-screen flex items-center justify-center text-gray-500">Etapa não encontrada.</div>
</template>
