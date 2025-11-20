<template>
  <div class="min-h-screen bg-slate-300 dark:bg-[#0E1117] z-0">
    <!-- Hero Section -->
    <section class="relative py-24 bg-gradient-to-br from-[#1E6DFF] to-[#4DA3FF] dark:from-[#1458CC] dark:to-[#1E6DFF]">
      <div class="container mx-auto px-6 text-center relative z-10">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          {{ $t('northKazakhstanWaterPortal') }}
        </h1>
        <p class="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
          {{ $t('monitoringHydrological') }}
        </p>
        <div class="flex justify-center gap-6 flex-wrap relative z-20">
          <NuxtLink 
            :to="mapUrl" 
            class="px-10 py-4 bg-white text-[#1E6DFF] rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold relative z-30"
          >
            {{ $t('viewInteractiveMap') }}
          </NuxtLink>
          <NuxtLink 
            :to="coordinatesUrl" 
            class="px-10 py-4 bg-white text-[#1E6DFF] rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold relative z-30"
          >
            {{ $t('reportCoordinates') }}
          </NuxtLink>
          <NuxtLink 
            :to="reportsUrl" 
            class="px-10 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all duration-200 font-semibold relative z-30"
          >
            {{ $t('waterReports') }}
          </NuxtLink>
        </div>
      </div>
      <!-- Decorative Wave -->
      <div class="absolute bottom-0 left-0 right-0 z-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full pointer-events-none">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" class="fill-slate-50 dark:fill-[#0E1117]"/>
        </svg>
      </div>
    </section>

    <!-- Mission Statement -->
    <section class="py-16 bg-slate-50 dark:bg-[#0E1117]">
      <div class="container mx-auto px-6">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-primary dark:text-[#F1F5FF] mb-6">
            {{ $t('ourMission') }}
          </h2>
          <p class="text-lg text-secondary dark:text-[#A9B4C6] leading-relaxed">
            {{ $t('missionDescription') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Monitoring Capabilities -->
    <section class="py-20 bg-white dark:bg-[#1A1F27] relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 left-0 w-full h-full opacity-5 dark:opacity-10">
        <div class="absolute top-20 left-10 w-72 h-72 bg-[#1E6DFF] rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-[#2ECC71] rounded-full blur-3xl"></div>
      </div>
      
      <div class="container mx-auto px-6 relative z-10">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-primary dark:text-[#F1F5FF] mb-4">
          {{ $t('comprehensiveMonitoring') }}
        </h2>
        <p class="text-center text-secondary dark:text-[#A9B4C6] mb-20 max-w-2xl mx-auto text-lg">
          {{ $t('monitoringSubtitle') }}
        </p>
        
        <div class="max-w-6xl mx-auto space-y-8">
          <!-- Interactive Map - Top -->
          <NuxtLink :to="mapUrl" class="block group">
            <div class="flex flex-col md:flex-row items-center gap-8 bg-slate-50 dark:bg-[#212832] rounded-2xl p-8 md:p-10 shadow-md hover:shadow-2xl border-2 border-transparent group-hover:border-[#1E6DFF] dark:group-hover:border-[#6CA8FF] transition-all duration-300">
              <div class="w-24 h-24 bg-gradient-to-br from-[#1E6DFF] to-[#1458CC] dark:from-[#6CA8FF] dark:to-[#4DA3FF] rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                <span class="text-5xl">🗺️</span>
              </div>
              <div class="text-center md:text-left">
                <h3 class="text-2xl md:text-3xl font-bold text-primary dark:text-[#F1F5FF] mb-3">
                  {{ $t('interactiveMap') }}
                </h3>
                <p class="text-secondary dark:text-[#A9B4C6] text-lg leading-relaxed">
                  {{ $t('exploreAllMonitoring') }}
                </p>
              </div>
            </div>
          </NuxtLink>

          <!-- Coordinates Reporting - Second -->
          <NuxtLink :to="coordinatesUrl" class="block group">
            <div class="flex flex-col md:flex-row-reverse items-center gap-8 bg-slate-50 dark:bg-[#212832] rounded-2xl p-8 md:p-10 shadow-md hover:shadow-2xl border-2 border-transparent group-hover:border-[#9B59B6] dark:group-hover:border-[#BB6BD9] transition-all duration-300">
              <div class="w-24 h-24 bg-gradient-to-br from-[#9B59B6] to-[#8E44AD] dark:from-[#BB6BD9] dark:to-[#9B59B6] rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                <span class="text-5xl">📍</span>
              </div>
              <div class="text-center md:text-right">
                <h3 class="text-2xl md:text-3xl font-bold text-primary dark:text-[#F1F5FF] mb-3">
                  {{ $t('coordinatesReporting') }}
                </h3>
                <p class="text-secondary dark:text-[#A9B4C6] text-lg leading-relaxed">
                  {{ $t('reportWaterBodyCoordinates') }}
                </p>
              </div>
            </div>
          </NuxtLink>

          <!-- Water Reports - Third -->
          <NuxtLink :to="reportsUrl" class="block group">
            <div class="flex flex-col md:flex-row items-center gap-8 bg-slate-50 dark:bg-[#212832] rounded-2xl p-8 md:p-10 shadow-md hover:shadow-2xl border-2 border-transparent group-hover:border-[#FF9500] dark:group-hover:border-[#FFAA33] transition-all duration-300">
              <div class="w-24 h-24 bg-gradient-to-br from-[#FF9500] to-[#E67E22] dark:from-[#FFAA33] dark:to-[#FF9500] rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                <span class="text-5xl">📊</span>
              </div>
              <div class="text-center md:text-left">
                <h3 class="text-2xl md:text-3xl font-bold text-primary dark:text-[#F1F5FF] mb-3">
                  {{ $t('waterReports') }}
                </h3>
                <p class="text-secondary dark:text-[#A9B4C6] text-lg leading-relaxed">
                  {{ $t('manageWaterConditionReports') }}
                </p>
              </div>
            </div>
          </NuxtLink>

          <!-- Pathogen Risk -->
          <NuxtLink :to="informUrl" class="block group">
            <div class="flex flex-col md:flex-row-reverse items-center gap-8 bg-slate-50 dark:bg-[#212832] rounded-2xl p-8 md:p-10 shadow-md hover:shadow-2xl border-2 border-transparent group-hover:border-[#FF9500] dark:group-hover:border-[#FFAA33] transition-all duration-300">
              <div class="w-24 h-24 bg-gradient-to-br from-[#FF9500] to-[#E67E22] dark:from-[#FFAA33] dark:to-[#FF9500] rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                <span class="text-5xl">🦠</span>
              </div>
              <div class="text-center md:text-right">
                <h3 class="text-2xl md:text-3xl font-bold text-primary dark:text-[#F1F5FF] mb-3">
                  {{ $t('pathogenRisk') }}
                </h3>
                <p class="text-secondary dark:text-[#A9B4C6] text-lg leading-relaxed">
                  {{ $t('assessContamination') }}
                </p>
              </div>
            </div>
          </NuxtLink>

          <!-- Water Level -->
          <NuxtLink :to="lab3Url" class="block group">
            <div class="flex flex-col md:flex-row items-center gap-8 bg-slate-50 dark:bg-[#212832] rounded-2xl p-8 md:p-10 shadow-md hover:shadow-2xl border-2 border-transparent group-hover:border-[#1E6DFF] dark:group-hover:border-[#6CA8FF] transition-all duration-300">
              <div class="w-24 h-24 bg-gradient-to-br from-[#4DA3FF] to-[#1E6DFF] dark:from-[#75B9FF] dark:to-[#4DA3FF] rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                <span class="text-5xl">💧</span>
              </div>
              <div class="text-center md:text-left">
                <h3 class="text-2xl md:text-3xl font-bold text-primary dark:text-[#F1F5FF] mb-3">
                  {{ $t('waterLevel') }}
                </h3>
                <p class="text-secondary dark:text-[#A9B4C6] text-lg leading-relaxed">
                  {{ $t('monitorCurrentWater') }}
                </p>
              </div>
            </div>
          </NuxtLink>

          <!-- Transparency -->
          <NuxtLink :to="lab4Url" class="block group">
            <div class="flex flex-col md:flex-row-reverse items-center gap-8 bg-slate-50 dark:bg-[#212832] rounded-2xl p-8 md:p-10 shadow-md hover:shadow-2xl border-2 border-transparent group-hover:border-[#2ECC71] dark:group-hover:border-[#38E39A] transition-all duration-300">
              <div class="w-24 h-24 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] dark:from-[#38E39A] dark:to-[#2ECC71] rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                <span class="text-5xl">🔍</span>
              </div>
              <div class="text-center md:text-right">
                <h3 class="text-2xl md:text-3xl font-bold text-primary dark:text-[#F1F5FF] mb-3">
                  {{ $t('waterTransparency') }}
                </h3>
                <p class="text-secondary dark:text-[#A9B4C6] text-lg leading-relaxed">
                  {{ $t('analyzeClarity') }}
                </p>
              </div>
            </div>
          </NuxtLink>

          <!-- Temperature -->
          <NuxtLink :to="lab5Url" class="block group">
            <div class="flex flex-col md:flex-row items-center gap-8 bg-slate-50 dark:bg-[#212832] rounded-2xl p-8 md:p-10 shadow-md hover:shadow-2xl border-2 border-transparent group-hover:border-[#FFCB2F] dark:group-hover:border-[#FFDD57] transition-all duration-300">
              <div class="w-24 h-24 bg-gradient-to-br from-[#FFCB2F] to-[#F39C12] dark:from-[#FFDD57] dark:to-[#FFCB2F] rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                <span class="text-5xl">🌡️</span>
              </div>
              <div class="text-center md:text-left">
                <h3 class="text-2xl md:text-3xl font-bold text-primary dark:text-[#F1F5FF] mb-3">
                  {{ $t('temperature') }}
                </h3>
                <p class="text-secondary dark:text-[#A9B4C6] text-lg leading-relaxed">
                  {{ $t('trackWaterTemperature') }}
                </p>
              </div>
            </div>
          </NuxtLink>

          <!-- Conductivity -->
          <NuxtLink :to="lab6Url" class="block group">
            <div class="flex flex-col md:flex-row-reverse items-center gap-8 bg-slate-50 dark:bg-[#212832] rounded-2xl p-8 md:p-10 shadow-md hover:shadow-2xl border-2 border-transparent group-hover:border-[#FF4E4E] dark:group-hover:border-[#FF6B6B] transition-all duration-300">
              <div class="w-24 h-24 bg-gradient-to-br from-[#FF4E4E] to-[#E74C3C] dark:from-[#FF6B6B] dark:to-[#FF4E4E] rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                <span class="text-5xl">⚡</span>
              </div>
              <div class="text-center md:text-right">
                <h3 class="text-2xl md:text-3xl font-bold text-primary dark:text-[#F1F5FF] mb-3">
                  {{ $t('electricalConductivity') }}
                </h3>
                <p class="text-secondary dark:text-[#A9B4C6] text-lg leading-relaxed">
                  {{ $t('measureSalinity') }}
                </p>
              </div>
            </div>
          </NuxtLink>

          
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-slate-50 dark:bg-[#0E1117]">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-primary dark:text-[#F1F5FF] mb-16">
          {{ $t('byTheNumbers') }}
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center p-6 bg-white dark:bg-[#1A1F27] rounded-xl shadow-md">
            <div class="text-5xl font-bold text-[#1E6DFF] dark:text-[#6CA8FF] mb-3">15+</div>
            <div class="text-secondary dark:text-[#A9B4C6] font-medium">{{ $t('monitoringSites') }}</div>
          </div>
          <div class="text-center p-6 bg-white dark:bg-[#1A1F27] rounded-xl shadow-md">
            <div class="text-5xl font-bold text-[#2ECC71] dark:text-[#38E39A] mb-3">24/7</div>
            <div class="text-secondary dark:text-[#A9B4C6] font-medium">{{ $t('dataCollection') }}</div>
          </div>
          <div class="text-center p-6 bg-white dark:bg-[#1A1F27] rounded-xl shadow-md">
            <div class="text-5xl font-bold text-[#FFCB2F] dark:text-[#FFDD57] mb-3">7</div>
            <div class="text-secondary dark:text-[#A9B4C6] font-medium">{{ $t('parameters') }}</div>
          </div>
          <div class="text-center p-6 bg-white dark:bg-[#1A1F27] rounded-xl shadow-md">
            <div class="text-5xl font-bold text-[#FF4E4E] dark:text-[#FF6B6B] mb-3">99%</div>
            <div class="text-secondary dark:text-[#A9B4C6] font-medium">{{ $t('systemUptime') }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-20 bg-white dark:bg-[#1A1F27]">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-primary dark:text-[#F1F5FF] mb-4">
          {{ $t('howItWorks') }}
        </h2>
        <p class="text-center text-secondary dark:text-[#A9B4C6] mb-16 max-w-2xl mx-auto">
          {{ $t('howItWorksSubtitle') }}
        </p>
        
        <div class="max-w-5xl mx-auto space-y-12">
          <!-- Step 1 -->
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="w-full md:w-1/3">
              <div class="w-20 h-20 bg-[#1E6DFF] dark:bg-[#6CA8FF] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto md:mx-0">
                1
              </div>
            </div>
            <div class="w-full md:w-2/3 text-center md:text-left">
              <h3 class="text-2xl font-semibold text-primary dark:text-[#F1F5FF] mb-3">
                {{ $t('step1Title') }}
              </h3>
              <p class="text-secondary dark:text-[#A9B4C6] leading-relaxed">
                {{ $t('step1Description') }}
              </p>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="flex flex-col md:flex-row-reverse items-center gap-8">
            <div class="w-full md:w-1/3">
              <div class="w-20 h-20 bg-[#2ECC71] dark:bg-[#38E39A] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto md:mx-0 md:ml-auto">
                2
              </div>
            </div>
            <div class="w-full md:w-2/3 text-center md:text-right">
              <h3 class="text-2xl font-semibold text-primary dark:text-[#F1F5FF] mb-3">
                {{ $t('step2Title') }}
              </h3>
              <p class="text-secondary dark:text-[#A9B4C6] leading-relaxed">
                {{ $t('step2Description') }}
              </p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="w-full md:w-1/3">
              <div class="w-20 h-20 bg-[#FFCB2F] dark:bg-[#FFDD57] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg mx-auto md:mx-0">
                3
              </div>
            </div>
            <div class="w-full md:w-2/3 text-center md:text-left">
              <h3 class="text-2xl font-semibold text-primary dark:text-[#F1F5FF] mb-3">
                {{ $t('step3Title') }}
              </h3>
              <p class="text-secondary dark:text-[#A9B4C6] leading-relaxed">
                {{ $t('step3Description') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-gradient-to-br from-[#1E6DFF] to-[#4DA3FF] dark:from-[#1458CC] dark:to-[#1E6DFF]">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          {{ $t('startExploring') }}
        </h2>
        <p class="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          {{ $t('ctaDescription') }}
        </p>
        <div class="flex justify-center gap-6 flex-wrap">
          <NuxtLink 
            :to="mapUrl" 
            class="inline-block px-12 py-4 bg-white text-[#1E6DFF] rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 font-semibold text-lg"
          >
            {{ $t('exploreNow') }}
          </NuxtLink>
          <NuxtLink 
            :to="coordinatesUrl" 
            class="inline-block px-12 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all duration-200 font-semibold text-lg"
          >
            {{ $t('reportCoordinates') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { $i18n } = useNuxtApp()
const { locale } = useI18n()

// Computed properties for localized URLs
const mapUrl = computed(() => {
  if (locale.value === 'en') return '/map'
  if (locale.value === 'ru') return '/ru/map'
  if (locale.value === 'kk') return '/kk/map'
  return '/map'
})

const coordinatesUrl = computed(() => {
  if (locale.value === 'en') return '/coords'
  if (locale.value === 'ru') return '/ru/coords'
  if (locale.value === 'kk') return '/kk/coords'
  return '/coords'
})

const reportsUrl = computed(() => {
  if (locale.value === 'en') return '/reports'
  if (locale.value === 'ru') return '/ru/reports'
  if (locale.value === 'kk') return '/kk/reports'
  return '/reports'
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

// English translations
$i18n.mergeLocaleMessage('en', {
  northKazakhstanWaterPortal: 'North Kazakhstan Water Portal',
  monitoringHydrological: 'Advanced monitoring of hydrological parameters and water quality across reservoirs in the Petropavlovsk region',
  viewInteractiveMap: 'View Interactive Map',
  reportCoordinates: 'Report Coordinates',
  waterReports: 'Water Reports',
  ourMission: 'Our Mission',
  missionDescription: 'We provide real-time water quality monitoring and comprehensive data analysis to ensure safe, sustainable water management for communities across North Kazakhstan. Our system empowers decision-makers with accurate, timely information.',
  comprehensiveMonitoring: 'Comprehensive Monitoring System',
  monitoringSubtitle: 'Track essential water quality indicators across multiple sites in real-time',
  waterLevel: 'Water Level',
  monitorCurrentWater: 'Monitor current water levels and historical trends in regional reservoirs with precision sensors',
  waterTransparency: 'Water Transparency',
  analyzeClarity: 'Analyze clarity and turbidity measurements to assess water quality across different water bodies',
  temperature: 'Temperature',
  trackWaterTemperature: 'Track water temperature variations and thermal patterns affecting aquatic ecosystems',
  electricalConductivity: 'Electrical Conductivity',
  measureSalinity: 'Measure salinity and mineral content through conductivity readings for water quality assessment',
  coordinatesReporting: 'Coordinates Reporting',
  reportWaterBodyCoordinates: 'Report water body locations and characteristics through our interactive mapping system',
  pathogenRisk: 'Pathogen Risk',
  assessContamination: 'Assess contamination levels and potential health risks from waterborne pathogens',
  interactiveMap: 'Interactive Map',
  exploreAllMonitoring: 'Explore all monitoring locations with real-time data visualization and historical trends',
  manageWaterConditionReports: 'Manage and view comprehensive reports about water conditions and quality assessments',
  byTheNumbers: 'By the Numbers',
  monitoringSites: 'Monitoring Sites',
  dataCollection: 'Data Collection',
  parameters: 'Parameters Tracked',
  systemUptime: 'System Uptime',
  howItWorks: 'How It Works',
  howItWorksSubtitle: 'Our advanced monitoring system operates continuously to deliver reliable water quality data',
  step1Title: 'Continuous Data Collection',
  step1Description: 'Automated sensors at 15+ locations collect water quality parameters every hour, 24/7, ensuring comprehensive coverage of the region.',
  step2Title: 'Real-Time Analysis',
  step2Description: 'Data is instantly processed and analyzed using advanced algorithms to detect trends, anomalies, and potential issues.',
  step3Title: 'Accessible Insights',
  step3Description: 'View all data through our interactive dashboard and map interface, with historical comparisons and predictive analytics.',
  startExploring: 'Start Exploring Water Quality Data',
  ctaDescription: 'Access real-time monitoring data, historical trends, and comprehensive analysis tools',
  exploreNow: 'Explore Now'
})

// Russian translations
$i18n.mergeLocaleMessage('ru', {
  northKazakhstanWaterPortal: 'Водный портал Северного Казахстана',
  monitoringHydrological: 'Расширенный мониторинг гидрологических параметров и качества воды в водоемах Петропавловского региона',
  viewInteractiveMap: 'Посмотреть интерактивную карту',
  reportCoordinates: 'Сообщить координаты',
  waterReports: 'Водные отчеты',
  ourMission: 'Наша миссия',
  missionDescription: 'Мы обеспечиваем мониторинг качества воды в реальном времени и комплексный анализ данных для безопасного и устойчивого управления водными ресурсами сообществ Северного Казахстана. Наша система предоставляет лицам, принимающим решения, точную и своевременную информацию.',
  comprehensiveMonitoring: 'Комплексная система мониторинга',
  monitoringSubtitle: 'Отслеживайте важнейшие показатели качества воды на нескольких объектах в режиме реального времени',
  waterLevel: 'Уровень воды',
  monitorCurrentWater: 'Мониторинг текущих уровней воды и исторических тенденций в региональных водоемах с помощью точных датчиков',
  waterTransparency: 'Прозрачность воды',
  analyzeClarity: 'Анализ измерений прозрачности и мутности для оценки качества воды в различных водных объектах',
  temperature: 'Температура',
  trackWaterTemperature: 'Отслеживание изменений температуры воды и тепловых режимов, влияющих на водные экосистемы',
  electricalConductivity: 'Электропроводность',
  measureSalinity: 'Измерение солености и минерального содержания через показания проводимости для оценки качества воды',
  coordinatesReporting: 'Отчетность по координатам',
  reportWaterBodyCoordinates: 'Сообщайте о местоположении и характеристиках водных объектов через нашу интерактивную систему картографирования',
  pathogenRisk: 'Риск патогенов',
  assessContamination: 'Оценка уровней загрязнения и потенциальных рисков для здоровья от водных патогенов',
  interactiveMap: 'Интерактивная карта',
  exploreAllMonitoring: 'Исследуйте все точки мониторинга с визуализацией данных в реальном времени и историческими трендами',
  manageWaterConditionReports: 'Управляйте и просматривайте комплексные отчеты о состоянии воды и оценках качества',
  byTheNumbers: 'В цифрах',
  monitoringSites: 'Точки мониторинга',
  dataCollection: 'Сбор данных',
  parameters: 'Отслеживаемые параметры',
  systemUptime: 'Время работы системы',
  howItWorks: 'Как это работает',
  howItWorksSubtitle: 'Наша передовая система мониторинга работает непрерывно для предоставления надежных данных о качестве воды',
  step1Title: 'Непрерывный сбор данных',
  step1Description: 'Автоматические датчики в более чем 15 местах собирают параметры качества воды каждый час, 24/7, обеспечивая полный охват региона.',
  step2Title: 'Анализ в реальном времени',
  step2Description: 'Данные мгновенно обрабатываются и анализируются с использованием передовых алгоритмов для выявления тенденций, аномалий и потенциальных проблем.',
  step3Title: 'Доступная информация',
  step3Description: 'Просматривайте все данные через нашу интерактивную панель и интерфейс карты с историческими сравнениями и прогнозной аналитикой.',
  startExploring: 'Начните изучение данных о качестве воды',
  ctaDescription: 'Получите доступ к данным мониторинга в реальном времени, историческим трендам и комплексным инструментам анализа',
  exploreNow: 'Исследовать сейчас'
})

// Kazakh translations
$i18n.mergeLocaleMessage('kk', {
  northKazakhstanWaterPortal: 'Солтүстік Қазақстан су порталы',
  monitoringHydrological: 'Петропавл аймағындағы су қоймаларының гидрологиялық параметрлері мен су сапасын кеңейтілген мониторинг',
  viewInteractiveMap: 'Интерактивті картаны қарау',
  reportCoordinates: 'Координаттарды хабарлау',
  waterReports: 'Су есептері',
  ourMission: 'Біздің миссиямыз',
  missionDescription: 'Біз Солтүстік Қазақстандағы қауымдастықтар үшін қауіпсіз, тұрақты су басқаруын қамтамасыз ету үшін нақты уақыттағы су сапасын бақылау және кешенді деректерді талдауды ұсынамыз. Біздің жүйе шешім қабылдаушыларға дәл, уақтылы ақпаратпен қамтамасыз етеді.',
  comprehensiveMonitoring: 'Кешенді мониторинг жүйесі',
  monitoringSubtitle: 'Бірнеше нүктелерде су сапасының маңызды көрсеткіштерін нақты уақытта қадағалаңыз',
  waterLevel: 'Су деңгейі',
  monitorCurrentWater: 'Аймақтық су қоймаларындағы ағымдағы су деңгейлері мен тарихи тенденцияларды дәл сенсорлармен бақылау',
  waterTransparency: 'Су өткізгіштігі',
  analyzeClarity: 'Әртүрлі су объектілеріндегі су сапасын бағалау үшін мөлдірлік пен ластық өлшемдерін талдау',
  temperature: 'Температура',
  trackWaterTemperature: 'Су экожүйелеріне әсер ететін су температурасының өзгерулері мен жылу режимдерін қадағалау',
  electricalConductivity: 'Электр өткізгіштік',
  measureSalinity: 'Су сапасын бағалау үшін өткізгіштік көрсеткіштері арқылы тұздылық пен минералдық құрамды өлшеу',
  coordinatesReporting: 'Координаттарды хабарлау',
  reportWaterBodyCoordinates: 'Біздің интерактивті карталау жүйесі арқылы су объектілерінің орналасуы мен сипаттамаларын хабарлаңыз',
  pathogenRisk: 'Патогендер қауіпі',
  assessContamination: 'Су арқылы берілетін патогендерден ластану деңгейлерін және денсаулыққа әлеуетті тәуекелдерді бағалау',
  interactiveMap: 'Интерактивті карта',
  exploreAllMonitoring: 'Нақты уақыт режиміндегі деректерді визуализациялау және тарихи тенденциялармен барлық мониторинг нүктелерін зерттеңіз',
  manageWaterConditionReports: 'Су жағдайы мен сапасын бағалау туралы кешенді есептерді басқару және қарау',
  byTheNumbers: 'Сандармен',
  monitoringSites: 'Мониторинг нүктелері',
  dataCollection: 'Деректер жинау',
  parameters: 'Қадағаланатын параметрлер',
  systemUptime: 'Жүйенің жұмыс уақыты',
  howItWorks: 'Бұл қалай жұмыс істейді',
  howItWorksSubtitle: 'Біздің озық мониторинг жүйесі су сапасының сенімді деректерін беру үшін үздіксіз жұмыс істейді',
  step1Title: 'Үздіксіз деректерді жинау',
  step1Description: '15+ орындағы автоматты сенсорлар су сапасы параметрлерін сағат сайын, 24/7 жинап, аймақтың толық қамтылуын қамтамасыз етеді.',
  step2Title: 'Нақты уақыттағы талдау',
  step2Description: 'Деректер тенденцияларды, ауытқуларды және әлеуетті мәселелерді анықтау үшін озық алгоритмдерді қолдана отырып, лезде өңделеді және талданады.',
  step3Title: 'Қолжетімді түсініктер',
  step3Description: 'Барлық деректерді тарихи салыстырулар мен болжамды аналитикамен біздің интерактивті панель және карта интерфейсі арқылы қараңыз.',
  startExploring: 'Су сапасы деректерін зерттеуді бастаңыз',
  ctaDescription: 'Нақты уақыттағы мониторинг деректеріне, тарихи тенденцияларға және кешенді талдау құралдарына қол жеткізіңіз',
  exploreNow: 'Қазір зерттеу'
})
</script>