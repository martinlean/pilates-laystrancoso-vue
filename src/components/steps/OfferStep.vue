<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { imageUrl } from '../../utils/images'

const props = defineProps({ step: { type: Object, required: true } })

// O site original mantém todo o conteúdo abaixo do vídeo (CTA, depoimentos,
// preço, mockup, professora) oculto (classe "hidden" do Tailwind) até
// liberar o acesso. Medido com precisão via MutationObserver instrumentado
// direto no DOM do original (não dá pra ler o valor configurado porque a
// árvore de componentes vem criptografada no __NEXT_DATA__ do Inlead, e a
// liberação acontece dentro de um player de terceiro em iframe cross-origin
// - scripts.converteai.net): em 2 medições independentes e controladas o
// delay ficou em 205,01s e 204,99s desde a montagem da etapa (uma 3ª medição
// isolada deu 254s, tratada como outlier). O gatilho é o tempo de parede
// desde que a etapa carrega, não o tempo de reprodução do vídeo (uma
// hipótese de gatilho por currentTime do vídeo foi testada e descartada:
// em medições diferentes o vídeo estava em ~55s e ~98s de reprodução no
// exato momento da liberação, enquanto o tempo de parede se manteve
// consistente). Usamos 205s (205000ms) como valor final.
const revealed = ref(false)
let revealTimer = null
onMounted(() => {
  revealTimer = setTimeout(() => {
    revealed.value = true
  }, 205000)
})
onUnmounted(() => {
  revealTimer && clearTimeout(revealTimer)
})

const titleParts = computed(() => {
  const idx = props.step.videoTitle.indexOf(props.step.videoTitleHighlight)
  if (idx === -1) return [props.step.videoTitle, '', '']
  return [
    props.step.videoTitle.slice(0, idx),
    props.step.videoTitleHighlight,
    props.step.videoTitle.slice(idx + props.step.videoTitleHighlight.length),
  ]
})

function goCheckout() {
  window.location.href = props.step.checkoutUrl
}

function back() {
  window.history.back()
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

      <h1 class="font-featured font-bold text-xl text-gray-950 text-center mb-4">
        {{ titleParts[0] }}<span class="bg-yellow-300">{{ titleParts[1] }}</span>{{ titleParts[2] }}
      </h1>

      <div class="relative w-full max-w-[400px] mx-auto mb-6" style="padding-top: 177.7777%">
        <iframe
          :src="step.videoEmbedSrc"
          class="absolute inset-0 w-full h-full rounded-2xl"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
        />
      </div>

      <div v-show="revealed">
        <button type="button" class="w-full min-h-14 rounded-2xl font-semibold text-white bg-blue-500 mb-6" @click="goCheckout">
          {{ step.ctaText }}
        </button>

        <h2 class="font-bold text-blue-600 text-center mb-3">{{ step.socialProofTitle }}</h2>
        <div class="flex flex-col gap-3 mb-6">
          <div v-for="(t, i) in step.testimonials" :key="i" class="bg-white rounded-2xl p-3 border border-gray-200">
            <div class="flex items-center gap-2 mb-1">
              <img :src="imageUrl(t.avatar)" alt="" class="w-8 h-8 rounded-full object-cover flex-shrink-0 bg-gray-200" />
              <div>
                <p class="text-sm font-semibold text-gray-950">{{ t.name }}</p>
                <p class="text-xs text-gray-500">{{ t.date }}</p>
              </div>
              <span class="ml-auto text-yellow-400">★★★★★</span>
            </div>
            <p class="text-sm text-gray-700">{{ t.text }}</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-200 p-4 text-center mb-6">
          <p class="text-red-600 font-bold uppercase mb-1">{{ step.pricing.badge }}</p>
          <p class="text-gray-500 line-through">{{ step.pricing.oldPrice }}</p>
          <p class="text-red-500 font-bold">{{ step.pricing.discount }}</p>
          <p class="text-3xl font-extrabold text-gray-950">{{ step.pricing.newPrice }}</p>
          <p class="text-gray-500 text-sm mb-3">{{ step.pricing.terms }}</p>
          <button type="button" class="w-full min-h-14 rounded-2xl font-semibold text-white bg-blue-500" @click="goCheckout">
            {{ step.ctaText }}
          </button>
        </div>

        <h2 class="font-bold text-gray-950 mb-3">{{ step.includesTitle }}</h2>
        <ul class="flex flex-col gap-2 mb-4">
          <li v-for="(item, i) in step.includesList" :key="i" class="flex items-start gap-2 text-gray-950 text-sm">
            <span class="text-green-500">✅</span>{{ item }}
          </li>
        </ul>
        <img :src="imageUrl(step.productMockup)" alt="Produto" class="w-full rounded-2xl mb-6" />

        <h2 class="font-bold text-gray-950 mb-3">{{ step.teacherSection.title }}</h2>
        <img
          :src="imageUrl(step.teacherSection.photo)"
          alt="Lays Trancoso"
          class="w-24 h-24 rounded-full object-cover mx-auto mb-3 bg-gray-200"
        />
        <p v-for="(p, i) in step.teacherSection.paragraphs" :key="i" class="text-gray-700 text-sm mb-2">{{ p }}</p>

        <div class="bg-white rounded-2xl border border-gray-200 p-4 text-center mb-8 mt-4">
          <p class="text-red-600 font-bold uppercase mb-1">{{ step.pricing.badge }}</p>
          <p class="text-gray-500 line-through">{{ step.pricing.oldPrice }}</p>
          <p class="text-red-500 font-bold">{{ step.pricing.discount }}</p>
          <p class="text-3xl font-extrabold text-gray-950">{{ step.pricing.newPrice }}</p>
          <p class="text-gray-500 text-sm mb-3">{{ step.pricing.terms }}</p>
          <button type="button" class="w-full min-h-14 rounded-2xl font-semibold text-white bg-blue-500" @click="goCheckout">
            {{ step.ctaText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
