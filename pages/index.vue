<template>
  <div class="min-h-screen bg-slate-300 dark:bg-[#0E1117] z-0">
    <!-- Hero Section -->
    <section class="relative py-20 bg-surface dark:bg-[#1A1F27]">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-primary dark:text-[#F1F5FF] mb-6">
          {{ $t('northKazakhstanWaterPortal') }}
        </h1>
        <p class="text-xl text-secondary dark:text-[#A9B4C6] max-w-2xl mx-auto mb-8">
          {{ $t('monitoringHydrological') }}
        </p>
        <div class="flex justify-center gap-4 flex-wrap">
          <NuxtLink 
            :to="mapUrl" 
            class="px-8 py-3 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            {{ $t('viewInteractiveMap') }}
          </NuxtLink>
          <NuxtLink 
            :to="informUrl" 
            class="px-8 py-3 border-2 border-[#1E6DFF] text-[#1E6DFF] dark:text-[#6CA8FF] dark:border-[#6CA8FF] rounded-lg hover:bg-[#F5F8FF] dark:hover:bg-[#1A1F27] transition-all duration-200"
          >
            {{ $t('pathogenInformation') }}
          </NuxtLink>
        </div>
      </div>
    </section>
    

    <!-- Features Grid -->
    <section class="py-16 bg-slate-50 dark:bg-[#0E1117]">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center text-primary dark:text-[#F1F5FF] mb-12">
          {{ $t('waterQualityParameters') }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Water Level Card -->
          <NuxtLink :to="lab3Url" class="block group">
            <div class="bg-[#FFFFFF] dark:bg-[#212832] h-full rounded-xl p-6 shadow-sm hover:shadow-md border border-[#E2E8F0] dark:border-[#313B47] group-hover:border-[#1E6DFF] dark:group-hover:border-[#6CA8FF] transition-all duration-200">
              <div class="w-12 h-12 bg-[#4DA3FF] dark:bg-[#75B9FF] rounded-lg flex items-center justify-center mb-4">
                <span class="text-white font-bold">💧</span>
              </div>
              <h3 class="text-xl font-semibold text-primary dark:text-[#F1F5FF] mb-2">
                {{ $t('waterLevel') }}
              </h3>
              <p class="text-secondary dark:text-[#A9B4C6]">
                {{ $t('monitorCurrentWater') }}
              </p>
            </div>
          </NuxtLink>

          <!-- Transparency Card -->
          <NuxtLink :to="lab4Url" class="block group">
            <div class="bg-[#FFFFFF] dark:bg-[#212832] h-full rounded-xl p-6 shadow-sm hover:shadow-md border border-[#E2E8F0] dark:border-[#313B47] group-hover:border-[#1E6DFF] dark:group-hover:border-[#6CA8FF] transition-all duration-200">
              <div class="w-12 h-12 bg-[#2ECC71] dark:bg-[#38E39A] rounded-lg flex items-center justify-center mb-4">
                <span class="text-white font-bold">🔍</span>
              </div>
              <h3 class="text-xl font-semibold text-primary dark:text-[#F1F5FF] mb-2">
                {{ $t('waterTransparency') }}
              </h3>
              <p class="text-secondary dark:text-[#A9B4C6]">
                {{ $t('analyzeClarity') }}
              </p>
            </div>
          </NuxtLink>

          <!-- Temperature Card -->
          <NuxtLink :to="lab5Url" class="block group">
            <div class="bg-[#FFFFFF] dark:bg-[#212832] h-full rounded-xl p-6 shadow-sm hover:shadow-md border border-[#E2E8F0] dark:border-[#313B47] group-hover:border-[#1E6DFF] dark:group-hover:border-[#6CA8FF] transition-all duration-200">
              <div class="w-12 h-12 bg-[#FFCB2F] dark:bg-[#FFDD57] rounded-lg flex items-center justify-center mb-4">
                <span class="text-white font-bold">🌡️</span>
              </div>
              <h3 class="text-xl font-semibold text-primary dark:text-[#F1F5FF] mb-2">
                {{ $t('temperature') }}
              </h3>
              <p class="text-secondary dark:text-[#A9B4C6]">
                {{ $t('trackWaterTemperature') }}
              </p>
            </div>
          </NuxtLink>

          <!-- Conductivity Card -->
          <NuxtLink :to="lab6Url" class="block group">
            <div class="bg-[#FFFFFF] dark:bg-[#212832] h-full rounded-xl p-6 shadow-sm hover:shadow-md border border-[#E2E8F0] dark:border-[#313B47] group-hover:border-[#1E6DFF] dark:group-hover:border-[#6CA8FF] transition-all duration-200">
              <div class="w-12 h-12 bg-[#FF4E4E] dark:bg-[#FF6B6B] rounded-lg flex items-center justify-center mb-4">
                <span class="text-white font-bold">⚡</span>
              </div>
              <h3 class="text-xl font-semibold text-primary dark:text-[#F1F5FF] mb-2">
                {{ $t('electricalConductivity') }}
              </h3>
              <p class="text-secondary dark:text-[#A9B4C6]">
                {{ $t('measureSalinity') }}
              </p>
            </div>
          </NuxtLink>

          <!-- Pathogen Risk Card -->
          <NuxtLink :to="informUrl" class="block group">
            <div class="bg-[#FFFFFF] dark:bg-[#212832] h-full rounded-xl p-6 shadow-sm hover:shadow-md border border-[#E2E8F0] dark:border-[#313B47] group-hover:border-[#1E6DFF] dark:group-hover:border-[#6CA8FF] transition-all duration-200">
              <div class="w-12 h-12 bg-[#FF4E4E] dark:bg-[#FF6B6B] rounded-lg flex items-center justify-center mb-4">
                <span class="text-white font-bold">🦠</span>
              </div>
              <h3 class="text-xl font-semibold text-primary dark:text-[#F1F5FF] mb-2">
                {{ $t('pathogenRisk') }}
              </h3>
              <p class="text-secondary dark:text-[#A9B4C6]">
                {{ $t('assessContamination') }}
              </p>
            </div>
          </NuxtLink>

          <!-- Interactive Map Card -->
          <NuxtLink :to="mapUrl" class="block group">
            <div class="bg-[#FFFFFF] dark:bg-[#212832] h-full rounded-xl p-6 shadow-sm hover:shadow-md border border-[#E2E8F0] dark:border-[#313B47] group-hover:border-[#1E6DFF] dark:group-hover:border-[#6CA8FF] transition-all duration-200">
              <div class="w-12 h-12 bg-[#1E6DFF] dark:bg-[#6CA8FF] rounded-lg flex items-center justify-center mb-4">
                <span class="text-white font-bold">🗺️</span>
              </div>
              <h3 class="text-xl font-semibold text-primary dark:text-[#F1F5FF] mb-2">
                {{ $t('interactiveMap') }}
              </h3>
              <p class="text-secondary dark:text-[#A9B4C6]">
                {{ $t('exploreAllMonitoring') }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-surface dark:bg-[#1A1F27]">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-3xl font-bold text-[#1E6DFF] dark:text-[#6CA8FF] mb-2">15+</div>
            <div class="text-secondary dark:text-[#A9B4C6]">{{ $t('monitoringSites') }}</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-[#2ECC71] dark:text-[#38E39A] mb-2">24/7</div>
            <div class="text-secondary dark:text-[#A9B4C6]">{{ $t('dataCollection') }}</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-[#FFCB2F] dark:text-[#FFDD57] mb-2">6</div>
            <div class="text-secondary dark:text-[#A9B4C6]">{{ $t('parameters') }}</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-[#FF4E4E] dark:text-[#FF6B6B] mb-2">99%</div>
            <div class="text-secondary dark:text-[#A9B4C6]">{{ $t('systemUptime') }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Define translations for this page only
const { $i18n } = useNuxtApp()
const { locale } = useI18n()

// Computed properties for localized URLs
const mapUrl = computed(() => {
  if (locale.value === 'en') return '/map'
  if (locale.value === 'ru') return '/ru/map'
  if (locale.value === 'kk') return '/kk/map'
  return '/map'
})

const informUrl = computed(() => {
  if (locale.value === 'en') return '/inform'
  if (locale.value === 'ru') return '/ru/inform'
  if (locale.value === 'kk') return '/kk/inform'
  return '/inform'
})

const lab3Url = computed(() => {
  if (locale.value === 'en') return '/lab3'
  if (locale.value === 'ru') return '/ru/lab3'
  if (locale.value === 'kk') return '/kk/lab3'
  return '/lab3'
})

const lab4Url = computed(() => {
  if (locale.value === 'en') return '/lab4'
  if (locale.value === 'ru') return '/ru/lab4'
  if (locale.value === 'kk') return '/kk/lab4'
  return '/lab4'
})

const lab5Url = computed(() => {
  if (locale.value === 'en') return '/lab5'
  if (locale.value === 'ru') return '/ru/lab5'
  if (locale.value === 'kk') return '/kk/lab5'
  return '/lab5'
})

const lab6Url = computed(() => {
  if (locale.value === 'en') return '/lab6'
  if (locale.value === 'ru') return '/ru/lab6'
  if (locale.value === 'kk') return '/kk/lab6'
  return '/lab6'
})

// KEEP ONLY TRANSLATIONS - no language persistence code
$i18n.mergeLocaleMessage('en', {
  northKazakhstanWaterPortal: 'North Kazakhstan Water Portal',
  monitoringHydrological: 'Monitoring hydrological parameters and water quality across reservoirs in the Petropavlovsk region',
  viewInteractiveMap: 'View Interactive Map',
  pathogenInformation: 'Pathogen Information',
  waterQualityParameters: 'Water Quality Parameters',
  waterLevel: 'Water Level',
  monitorCurrentWater: 'Monitor current water levels and historical trends in regional reservoirs',
  waterTransparency: 'Water Transparency',
  analyzeClarity: 'Analyze clarity and turbidity measurements across different water bodies',
  temperature: 'Temperature',
  trackWaterTemperature: 'Track water temperature variations and thermal patterns',
  electricalConductivity: 'Electrical Conductivity',
  measureSalinity: 'Measure salinity and mineral content through conductivity readings',
  pathogenRisk: 'Pathogen Risk',
  assessContamination: 'Assess contamination levels and potential health risks',
  interactiveMap: 'Interactive Map',
  exploreAllMonitoring: 'Explore all monitoring locations and real-time data visualization',
  monitoringSites: 'Monitoring Sites',
  dataCollection: 'Data Collection',
  parameters: 'Parameters',
  systemUptime: 'System Uptime'
})

$i18n.mergeLocaleMessage('ru', {
  northKazakhstanWaterPortal: 'Водный портал Северного Казахстана',
  monitoringHydrological: 'Мониторинг гидрологических параметров и качества воды в водоемах Петропавловского региона',
  viewInteractiveMap: 'Посмотреть интерактивную карту',
  pathogenInformation: 'Информация о патогенах',
  waterQualityParameters: 'Параметры качества воды',
  waterLevel: 'Уровень воды',
  monitorCurrentWater: 'Мониторинг текущих уровней воды и исторических тенденций в региональных водоемах',
  waterTransparency: 'Прозрачность воды',
  analyzeClarity: 'Анализ измерений прозрачности и мутности в различных водных объектах',
  temperature: 'Температура',
  trackWaterTemperature: 'Отслеживание изменений температуры воды и тепловых режимов',
  electricalConductivity: 'Электропроводность',
  measureSalinity: 'Измерение солености и минерального содержания через показания проводимости',
  pathogenRisk: 'Риск патогенов',
  assessContamination: 'Оценка уровней загрязнения и потенциальных рисков для здоровья',
  interactiveMap: 'Интерактивная карта',
  exploreAllMonitoring: 'Исследуйте все точки мониторинга и визуализацию данных в реальном времени',
  monitoringSites: 'Мониторинговые точки',
  dataCollection: 'Сбор данных',
  parameters: 'Параметры',
  systemUptime: 'Время работы системы'
})

$i18n.mergeLocaleMessage('kk', {
  northKazakhstanWaterPortal: 'Солтүстік Қазақстан су порталы',
  monitoringHydrological: 'Петропавл аймағындағы су қоймаларының гидрологиялық параметрлері мен су сапасын мониторинг',
  viewInteractiveMap: 'Интерактивті картаны қарау',
  pathogenInformation: 'Патогендер туралы ақпарат',
  waterQualityParameters: 'Су сапасы параметрлері',
  waterLevel: 'Су деңгейі',
  monitorCurrentWater: 'Аймақтық су қоймаларындағы ағымдағы су деңгейлері мен тарихи тенденцияларды бақылау',
  waterTransparency: 'Су өткізгіштігі',
  analyzeClarity: 'Әртүрлі су объектілеріндегі мөлдірлік пен ластық өлшемдерін талдау',
  temperature: 'Температура',
  trackWaterTemperature: 'Су температурасының өзгерулерін және жылу режимдерін бақылау',
  electricalConductivity: 'Электр өткізгіштік',
  measureSalinity: 'Өткізгіштік көрсеткіштері арқылы тұздылық пен минералдық құрамды өлшеу',
  pathogenRisk: 'Патогендер қауіпі',
  assessContamination: 'Ластану деңгейлерін және денсаулыққа әлеуетті тәуекелдерді бағалау',
  interactiveMap: 'Интерактивті карта',
  exploreAllMonitoring: 'Барлық мониторинг нүктелерін зерттеңіз және нақты уақыт режимінде деректерді визуализациялаңыз',
  monitoringSites: 'Мониторинг нүктелері',
  dataCollection: 'Деректер жинау',
  parameters: 'Параметрлер',
  systemUptime: 'Жүйенің жұмыс уақыты'
})
</script>