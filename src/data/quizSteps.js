// Mapeamento fiel do funil pilates.laystrancoso.com (24 etapas).
// Textos, opções e erros de digitação do original foram mantidos propositalmente
// (ex: "Dar na coluna", "Supa meta", "execícios", "MInhas", "músuclos", "diminuí",
// "MELHOR AS DORES", "refêrencias", "Minímo ideial", espaço duplo em "poucos  minutos").
//
// A barra de progresso do topo não é armazenada por etapa: o site original a calcula
// como (etapa atual / 24) * 100, escondida apenas na etapa 1. Confirmado lendo o
// valor real (`style="width: N%"`) direto do DOM do site original em cada uma das
// 24 etapas nesta sessão de QA. Ver `(step.id / 24) * 100` em StepShell.vue,
// DiagnosisStep.vue, LoadingStep.vue e OfferStep.vue.

export const CHECKOUT_URL = 'https://pay.onprofit.com.br/hjgVEN8l'

export const quizSteps = [
  // ---------------------------------------------------------------- STEP 1
  {
    id: 1,
    type: 'landing',
    showBack: false,
    titleLines: [
      { text: 'ACABE COM AS DORES E EMAGREÇA', color: 'blue' },
      { text: 'APÓS OS 50 ANOS', color: 'black' },
    ],
    highlight: 'COM EXERCÍCIOS SEGUROS DE PILATES EM CASA',
    heroImage: 'hero.png',
    question: 'Desafio específico para sua idade e objetivo:',
    questionSub: 'Escolha uma opção abaixo:',
    optionLayout: 'grid-2x2-filled',
    options: [
      { label: '40-50 anos', value: '40-50' },
      { label: '51-60 anos', value: '51-60' },
      { label: '61-70 anos', value: '61-70' },
      { label: '71 anos mais', value: '71+' },
    ],
    autoAdvance: true,
    supportText:
      'Faça esse teste para ter um protocolo específico para seu caso. Ao final você ganha seu diagnóstico grátis.',
    footerBadge: '✅ TEMPO ESTIMADO: 49 SEGUNDOS',
  },

  // ---------------------------------------------------------------- STEP 2
  {
    id: 2,
    type: 'single-select',
    showBack: false,
    title: 'Como você classifica seu corpo hoje?',
    optionLayout: 'image-square',
    autoAdvance: true,
    options: [
      { label: 'Muito acima do peso', value: 'muito-acima', image: 'body-muito-acima.webp' },
      { label: 'Um pouco acima do peso', value: 'pouco-acima', image: 'body-pouco-acima.webp' },
      { label: 'Falsa magra', value: 'falsa-magra', image: 'body-falsa-magra.webp' },
      { label: 'Magra', value: 'magra', image: 'body-magra.webp' },
    ],
  },

  // ---------------------------------------------------------------- STEP 3
  {
    id: 3,
    type: 'multi-select',
    showBack: false,
    title: 'Você tem alguma patologia?',
    subtitle: 'Pode escolher várias opções:',
    optionLayout: 'plain',
    continueButton: 'Continuar',
    autoAdvance: false,
    options: [
      { label: 'Dar na coluna/lombar/cervical', value: 'coluna' },
      { label: 'Dor no joelho/quadril/ombro', value: 'joelho' },
      { label: 'Hérnia de disco/bico papagaio', value: 'hernia' },
      { label: 'Artrite/artrose/osteoporose', value: 'artrite' },
      { label: 'Fibromialgia', value: 'fibromialgia' },
      { label: 'Outros', value: 'outros' },
      { label: 'Não tenho dores/patologias', value: 'nenhuma' },
    ],
  },

  // ---------------------------------------------------------------- STEP 4
  {
    id: 4,
    type: 'single-select',
    showBack: false,
    title: 'Você tem dificuldades para fazer tarefas do dia a dia?',
    optionLayout: 'emoji-left',
    autoAdvance: true,
    options: [
      { emoji: '🫤', richHTML: 'Tenho <strong>dificuldade</strong> em <u>várias coisas</u>', value: 'muitas' },
      { emoji: '😐', richHTML: 'Tenho <strong>dificuldades</strong> em <u>algumas coisas</u>', value: 'algumas' },
      { emoji: '😃', richHTML: 'Não tenho dificuldade em nada', value: 'nenhuma' },
    ],
  },

  // ---------------------------------------------------------------- STEP 5
  {
    id: 5,
    type: 'single-select',
    showBack: false,
    title: 'Quantos quilos você gostaria de eliminar?',
    optionLayout: 'plain',
    autoAdvance: true,
    options: [
      { label: '0-10kg', value: '0-10' },
      { label: '11-15kg', value: '11-15' },
      { label: '16-20kg', value: '16-20' },
      { label: 'Mais de 21kg', value: '21+' },
      { label: 'Não quero emagrecer', value: 'nao-quero' },
    ],
  },

  // ---------------------------------------------------------------- STEP 6
  {
    id: 6,
    type: 'carousel-interstitial',
    showBack: false,
    title: 'Supa meta é super possível de alcançar, em menos tempo que você imagina.',
    linkSubtitle: 'Já ajudamos mais de 20 mil mulheres após os 50 anos',
    slides: [
      { image: 'depoimento-59anos.png', age: '59 anos' },
      { image: 'depoimento-prova2.png', age: '58 anos' },
      { image: 'hero.png', age: '64 anos' },
    ],
    continueButton: 'CONTINUAR TESTE GRATUITO',
    supportText: 'Na próxima etapa você irá descobrir a causa das suas dores e da dificuldade de emagrecer',
  },

  // ---------------------------------------------------------------- STEP 7
  {
    id: 7,
    type: 'single-select',
    showBack: false,
    title: 'Qual é o corpo que você gostaria de ter?',
    optionLayout: 'image-rect-3col',
    autoAdvance: true,
    options: [
      { label: 'Bem magro', value: 'bem-magro', image: 'desejo-bem-magro.jpg' },
      { label: 'Um pouco mais magro', value: 'pouco-magro', image: 'desejo-pouco-magro.jpg' },
      { label: 'Definido', value: 'definido', image: 'desejo-definido.jpg' },
    ],
  },

  // ---------------------------------------------------------------- STEP 8
  {
    id: 8,
    type: 'single-select',
    showBack: false,
    title: 'Como é seu metabolismo?',
    optionLayout: 'emoji-left',
    autoAdvance: true,
    options: [
      { emoji: '🐢', richHTML: '<strong>Lento-</strong> Difícil para perder e fácil para ganhar peso', value: 'lento' },
      {
        emoji: '🔥',
        richHTML: '<strong>Acelerado-</strong> Fácil de perder e difícil para ganhar peso',
        value: 'acelerado',
      },
    ],
  },

  // ---------------------------------------------------------------- STEP 9
  {
    id: 9,
    type: 'single-select',
    showBack: false,
    title: 'Se sente insegura na hora de fazer execícios?',
    optionLayout: 'emoji-left',
    autoAdvance: true,
    options: [
      { emoji: '🥲', richHTML: '<strong>Sim</strong>, fico com dúvidas do que posso fazer', value: 'sim' },
      { emoji: '🥺', richHTML: '<strong>Não</strong>, faço qualquer coisa', value: 'nao' },
    ],
  },

  // ---------------------------------------------------------------- STEP 10
  {
    id: 10,
    type: 'single-select',
    showBack: false,
    title: 'Você acumula gordura na barriga com facilidade?',
    optionLayout: 'emoji-right',
    autoAdvance: true,
    options: [
      { emoji: '😫', label: 'Sim, é o principal lugar', value: 'sim' },
      { emoji: '😞', label: 'Acumulo mais em outros locais', value: 'outros' },
    ],
  },

  // ---------------------------------------------------------------- STEP 11
  {
    id: 11,
    type: 'single-select',
    showBack: false,
    title: 'Após os 40 anos, percebeu aumento das dores e ganho de peso?',
    optionLayout: 'emoji-right',
    autoAdvance: true,
    options: [
      { emoji: '😫', label: 'Sim, bastante', value: 'sim' },
      { emoji: '😞', label: 'Não, sempre tive esses problemas', value: 'nao' },
    ],
  },

  // ---------------------------------------------------------------- STEP 12
  {
    id: 12,
    type: 'loading',
    showBack: true,
    durationMs: 3500,
    rotatingTexts: ['Identificando a causa raiz do problema'],
  },

  // ---------------------------------------------------------------- STEP 13
  {
    id: 13,
    type: 'diagnosis',
    showBack: true,
    alertTitle: '⚠️CAUSA RAIZ IDENTIFICADA ⚠️',
    alertLine1: 'SEU PROBLEMA É:',
    alertLine2: 'BAIXA HORMONAL',
    chartLabel: 'Veja seu estado atual:',
    chart: {
      yMin: 0,
      yMax: 80,
      xAxisLeft: 'Alta hormonal',
      xAxisRight: 'Baixa hormonal',
      markerIdeal: { label: 'Minímo ideial', value: 80 },
      markerYou: { label: 'Você', value: 35 },
    },
    highlightList: [
      { html: '1- <mark>Seu metabolismo</mark> está trabalhando em apenas 27% da sua capacidade.' },
      { html: '2-<mark>Seus hormônios estão em baixa</mark>, aproximadamente apenas 32% da produção máxima.' },
    ],
    greenBox: 'MAS CALMA QUE ISSO TEM SOLUÇÃO',
    continueButton: 'CONTINUAR PARA SOLUÇÃO',
  },

  // ---------------------------------------------------------------- STEP 14
  {
    id: 14,
    type: 'multi-select',
    showBack: true,
    title: 'Quais são seus outros objetivos?',
    subtitle: 'Pode marcar vários:',
    optionLayout: 'plain',
    continueButton: 'Continuar',
    autoAdvance: false,
    options: [
      { label: 'Melhorar flacidez', value: 'flacidez' },
      { label: 'Melhorar qualidade de vida', value: 'qualidade-vida' },
      { label: 'Mais disposição e energia', value: 'disposicao' },
      { label: 'Melhorar a saúde', value: 'saude' },
    ],
  },

  // ---------------------------------------------------------------- STEP 15
  {
    id: 15,
    type: 'multi-select',
    showBack: true,
    title: 'O que mais te impede de fazer exercícios e cuidar da sua saúde?',
    subtitle: 'Pode escolher várias opções:',
    optionLayout: 'emoji-right',
    continueButton: null,
    autoAdvance: true,
    options: [
      { emoji: '🏃‍♀️', label: 'Falta de tempo', value: 'tempo' },
      { emoji: '😴', label: 'Cansaço e indisposição', value: 'cansaco' },
      { emoji: '😰', label: 'Medo de me machucar', value: 'medo' },
      { emoji: '👎', label: 'Falta de apoio familiar', value: 'apoio' },
    ],
  },

  // ---------------------------------------------------------------- STEP 16
  {
    id: 16,
    type: 'single-select',
    showBack: true,
    title: 'Como é seu dia a dia?',
    optionLayout: 'emoji-right',
    autoAdvance: true,
    options: [
      { emoji: '🚗', label: 'Trabalho fora e tenho uma rotina corrida', value: 'fora' },
      { emoji: '🏠', label: 'Trabalho em casa e tenho uma rotina flexível', value: 'casa' },
      { emoji: '😊', label: 'Atualmente não trabalho', value: 'nao-trabalho' },
    ],
  },

  // ---------------------------------------------------------------- STEP 17
  {
    id: 17,
    type: 'single-select',
    showBack: true,
    title: 'Atualmente você faz algum tipo de exercício?',
    optionLayout: 'plain',
    autoAdvance: true,
    options: [
      { label: 'SIM', value: 'sim' },
      { label: 'NÃO', value: 'nao' },
    ],
  },

  // ---------------------------------------------------------------- STEP 18
  {
    id: 18,
    type: 'loading',
    showBack: false,
    durationMs: 3500,
    rotatingTexts: ['Identificando a solução para seu caso'],
    newsMockup: {
      badge: 'SAÚDE',
      headline: 'Pilates em casa é a modalidade mais recomendada pelos médicos após os 50 anos',
      underline: 'mais recomendada pelos médicos',
      image: 'noticia-pilates.jpg',
    },
  },

  // ---------------------------------------------------------------- STEP 19
  {
    id: 19,
    type: 'solution',
    showBack: true,
    title: 'PARABÉNS, SEU TESTE IDENTIFICOU QUE O PILATES EM CASA É PERFEITO PARA SEU CASO',
    titleUnderline: 'PILATES EM CASA',
    image: 'solucao-pilates.jpg',
    subtitle2: 'POR QUE O PILATES É PERFEITO PARA SEU CASO?',
    cards: [
      { title: 'Emagrece rápido', text: 'Regula os hormônios, acelera o metabolismo, fazendo você emagrecer' },
      { title: 'Melhora as dores', text: 'Recupera os músuclos, fortalece o corpo e diminuí as dores.' },
    ],
    listTitle: 'EM POUCOS DIAS VOCÊ VAI:',
    checklist: ['MELHOR AS DORES', 'EMAGRECER', 'FORTALECER E DESTRAVAR O CORPO'],
    question: 'VOCÊ DESEJA TER ACESSO AOS EXERCÍCIOS DE PILATES?',
    ctaButton: 'SIM, PRECISO MUITO',
  },

  // ---------------------------------------------------------------- STEP 20
  {
    id: 20,
    type: 'single-select',
    showBack: true,
    title: 'Você acredita que exercícios seguros e rápidos de pilates irão te ajudar?',
    optionLayout: 'emoji-right',
    autoAdvance: true,
    options: [
      { emoji: '😀', label: 'Sim, é exatamente o que eu preciso', value: 'sim' },
      { emoji: '💪🏽', label: 'Vale o teste', value: 'teste' },
    ],
  },

  // ---------------------------------------------------------------- STEP 21
  {
    id: 21,
    type: 'single-select',
    showBack: true,
    title: 'Se nada mudar, como será sua vida daqui um tempo?',
    optionLayout: 'emoji-right',
    autoAdvance: true,
    options: [
      { emoji: '🐡', label: 'Vou estar mais gorda e feia', value: 'gorda' },
      { emoji: '🤧', label: 'Minha saúde vai piorar muito', value: 'saude' },
      { emoji: '👚', label: 'Nenhuma roupa vai vestir bem', value: 'roupa' },
      { emoji: '😭', label: 'MInhas dores só irão piorar', value: 'dores' },
    ],
  },

  // ---------------------------------------------------------------- STEP 22
  {
    id: 22,
    type: 'single-select',
    showBack: true,
    title: 'Você está disposta a dedicar poucos  minutos por dias nas próximas semanas para mudar sua realidade?',
    optionLayout: 'emoji-right',
    autoAdvance: true,
    options: [
      { emoji: '😀', label: 'Sim, preciso mudar', value: 'sim' },
      { emoji: '🙏🏼', label: 'Estou disposta a pelo menos tentar', value: 'tentar' },
    ],
  },

  // ---------------------------------------------------------------- STEP 23
  {
    id: 23,
    type: 'loading',
    showBack: false,
    durationMs: 4500,
    statusText: 'PREPARANDO SEU PROTOCOLO',
    testimonials: [
      {
        name: 'Bianca Fortunato',
        role: 'Advogada',
        avatar: 'avatar-bianca-fortunato.jpg',
        text: 'O desafio resolveu minhas dores e de brinde emagreci 9kg.',
      },
      {
        name: 'Camila Ferreira',
        role: 'Do lar/vendedora',
        avatar: 'avatar-camila-ferreira.jpg',
        text:
          'Após os 50 eu achava que não seria possível recuperar meu corpo. Com 1 mês de desafio eu eliminei 6kg e estou tonificando músculos',
      },
    ],
  },

  // ---------------------------------------------------------------- STEP 24
  {
    id: 24,
    type: 'offer',
    showBack: true,
    videoTitle: 'ASSISTA ESSE VÍDEO RÁPIDO PARA LIBERAR SEU ACESSO AO DESAFIO',
    videoTitleHighlight: 'LIBERAR SEU ACESSO AO DESAFIO',
    videoEmbedSrc: 'https://scripts.converteai.net/3b97e218-32f3-4b4e-bd42-156bc5536a12/players/69ebca3b9c356ea99e9210ed/v4/embed.html',
    ctaText: 'CLIQUE AQUI PRA PARTICIPAR',
    checkoutUrl: CHECKOUT_URL,
    socialProofTitle: 'Veja o que as nossas alunas falam:',
    testimonials: [
      {
        name: 'Camila.kashioto',
        date: '10/04/2025',
        avatar: 'avatar-camila.jpg',
        text: 'Eu amei as aulas, são fáceis e funcionam muito. A professora é nota 10, minha dor do ciático sumiu.',
      },
      {
        name: 'Barbara_89',
        date: '02/05/2025',
        avatar: 'avatar-barbara.jpg',
        text: 'Tenho 62 anos e minha dor na coluna estava terrível. Em uma semana a dor sumiu e perdi 4kg',
      },
      {
        name: 'Marcinha.rocha',
        date: '29/08/2025',
        avatar: 'avatar-marcinha.jpg',
        text:
          'Gostaria de agradecer a professora, tenho 65 anos com artrose, hérnia de disco e dor joelho. Perdi 3kg tbm, em uma semana sou outra mulher.',
      },
    ],
    pricing: {
      badge: 'ÚLTIMAS VAGAS OFERTA',
      oldPrice: 'DE R$97,00',
      discount: '60%OFF',
      newPrice: 'R$29,90',
      terms: 'à vista',
    },
    includesTitle: 'Veja tudo que você vai receber:',
    includesList: [
      'Uma semana (seg a sex) de aulas AO VIVO de pilates em casa, direto no seu whatsapp.',
      'Gravação das aulas por 30 dias, pra você fazer quando quiser.',
      'Grupo de apoio e motivação no whatsapp.',
      'Guia de compras para saber o que comprar e como economizar no mercado.',
    ],
    productMockup: 'mockup-produto.png',
    teacherSection: {
      title: 'Conheça sua professora',
      photo: 'professora-lays.png',
      paragraphs: [
        'Eu me chamo Lays Trancoso, sou profissional de educação física e professora de pilates certificada há mais de 7 anos.',
        'Já ajudei mais de 20 mil mulheres acima dos 50 anos a recuperar os músculos, melhorar a qualidade de vida e diminuir as dores.',
        'Sou conhecida como uma das maiores refêrencias de pilates em casa no Brasil.',
      ],
    },
  },
]

export function getStep(id) {
  return quizSteps.find((s) => s.id === Number(id))
}
