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
            :to="newsUrl" 
            class="px-10 py-4 bg-white text-[#1E6DFF] rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold relative z-30"
          >
            {{ $t('latestNews') }}
          </NuxtLink>
          <NuxtLink 
            :to="coordinatesUrl" 
            class="px-10 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all duration-200 font-semibold relative z-30"
          >
            {{ $t('reportCoordinates') }}
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

    <!-- News Highlights Section -->
    <section class="py-20 bg-white dark:bg-[#1A1F27]">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-primary dark:text-[#F1F5FF] mb-4">
            {{ $t('latestNews') }}
          </h2>
          <p class="text-xl text-secondary dark:text-[#A9B4C6] max-w-2xl mx-auto">
            {{ $t('stayInformed') }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <!-- News Card 1 -->
          <div class="bg-slate-50 dark:bg-[#212832] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#1E6DFF]">
            <div class="w-full h-48 bg-gradient-to-br from-[#1E6DFF] to-[#4DA3FF] rounded-xl mb-4 flex items-center justify-center">
              <span class="text-6xl text-white">📰</span>
            </div>
            <h3 class="text-xl font-bold text-primary dark:text-[#F1F5FF] mb-3">
              {{ $t('waterQualityUpdate') }}
            </h3>
            <p class="text-secondary dark:text-[#A9B4C6] mb-4">
              {{ $t('waterQualityUpdateDesc') }}
            </p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-[#1E6DFF] dark:text-[#6CA8FF] font-semibold">{{ $t('justPosted') }}</span>
              <NuxtLink :to="newsUrl" class="text-[#1E6DFF] dark:text-[#6CA8FF] hover:underline font-semibold">
                {{ $t('readMore') }}
              </NuxtLink>
            </div>
          </div>

          <!-- News Card 2 -->
          <div class="bg-slate-50 dark:bg-[#212832] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#2ECC71]">
            <div class="w-full h-48 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] rounded-xl mb-4 flex items-center justify-center">
              <span class="text-6xl text-white">🌊</span>
            </div>
            <h3 class="text-xl font-bold text-primary dark:text-[#F1F5FF] mb-3">
              {{ $t('newMonitoring') }}
            </h3>
            <p class="text-secondary dark:text-[#A9B4C6] mb-4">
              {{ $t('newMonitoringDesc') }}
            </p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-[#2ECC71] dark:text-[#38E39A] font-semibold">{{ $t('yesterday') }}</span>
              <NuxtLink :to="newsUrl" class="text-[#2ECC71] dark:text-[#38E39A] hover:underline font-semibold">
                {{ $t('readMore') }}
              </NuxtLink>
            </div>
          </div>

          <!-- News Card 3 -->
          <div class="bg-slate-50 dark:bg-[#212832] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#FF9500]">
            <div class="w-full h-48 bg-gradient-to-br from-[#FF9500] to-[#E67E22] rounded-xl mb-4 flex items-center justify-center">
              <span class="text-6xl text-white">🏆</span>
            </div>
            <h3 class="text-xl font-bold text-primary dark:text-[#F1F5FF] mb-3">
              {{ $t('awardRecognition') }}
            </h3>
            <p class="text-secondary dark:text-[#A9B4C6] mb-4">
              {{ $t('awardRecognitionDesc') }}
            </p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-[#FF9500] dark:text-[#FFAA33] font-semibold">{{ $t('3daysAgo') }}</span>
              <NuxtLink :to="newsUrl" class="text-[#FF9500] dark:text-[#FFAA33] hover:underline font-semibold">
                {{ $t('readMore') }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="text-center">
          <NuxtLink 
            :to="newsUrl" 
            class="inline-flex items-center gap-3 px-8 py-4 bg-[#1E6DFF] text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold text-lg"
          >
            <span>{{ $t('viewAllNews') }}</span>
            <span class="text-xl">→</span>
          </NuxtLink>
        </div>
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

          <!-- Profile Section -->
          <NuxtLink :to="profileUrl" class="block group">
            <div class="flex flex-col md:flex-row-reverse items-center gap-8 bg-slate-50 dark:bg-[#212832] rounded-2xl p-8 md:p-10 shadow-md hover:shadow-2xl border-2 border-transparent group-hover:border-[#2ECC71] dark:group-hover:border-[#38E39A] transition-all duration-300">
              <div class="w-24 h-24 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] dark:from-[#38E39A] dark:to-[#2ECC71] rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                <span class="text-5xl">👤</span>
              </div>
              <div class="text-center md:text-right">
                <h3 class="text-2xl md:text-3xl font-bold text-primary dark:text-[#F1F5FF] mb-3">
                  {{ $t('userProfile') }}
                </h3>
                <p class="text-secondary dark:text-[#A9B4C6] text-lg leading-relaxed">
                  {{ $t('manageYourAccount') }}
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
            :to="newsUrl" 
            class="inline-block px-12 py-4 bg-white text-[#1E6DFF] rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 font-semibold text-lg"
          >
            {{ $t('viewLatestNews') }}
          </NuxtLink>
          <NuxtLink 
            :to="mapUrl" 
            class="inline-block px-12 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all duration-200 font-semibold text-lg"
          >
            {{ $t('exploreMap') }}
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

const newsUrl = computed(() => {
  if (locale.value === 'en') return '/news'
  if (locale.value === 'ru') return '/ru/news'
  if (locale.value === 'kk') return '/kk/news'
  return '/news'
})

const profileUrl = computed(() => {
  if (locale.value === 'en') return '/profile'
  if (locale.value === 'ru') return '/ru/profile'
  if (locale.value === 'kk') return '/kk/profile'
  return '/profile'
})

// English translations
$i18n.mergeLocaleMessage('en', {
  northKazakhstanWaterPortal: 'North Kazakhstan Water Portal',
  monitoringHydrological: 'Advanced monitoring of hydrological parameters and water quality across reservoirs in the Petropavlovsk region',
  viewInteractiveMap: 'View Interactive Map',
  latestNews: 'Latest News',
  reportCoordinates: 'Report Coordinates',
  waterReports: 'Water Reports',
  userProfile: 'User Profile',
  ourMission: 'Our Mission',
  missionDescription: 'We provide real-time water quality monitoring and comprehensive data analysis to ensure safe, sustainable water management for communities across North Kazakhstan. Our system empowers decision-makers with accurate, timely information.',
  comprehensiveMonitoring: 'Comprehensive Monitoring System',
  monitoringSubtitle: 'Track essential water quality indicators across multiple sites in real-time',
  coordinatesReporting: 'Coordinates Reporting',
  reportWaterBodyCoordinates: 'Report water body locations and characteristics through our interactive mapping system',
  interactiveMap: 'Interactive Map',
  exploreAllMonitoring: 'Explore all monitoring locations with real-time data visualization and historical trends',
  manageWaterConditionReports: 'Manage and view comprehensive reports about water conditions and quality assessments',
  manageYourAccount: 'Manage your account settings, preferences, and personal information',
  stayInformed: 'Stay updated with the latest developments in water resource management',
  waterQualityUpdate: 'Water Quality Update',
  waterQualityUpdateDesc: 'Latest analysis shows improved water quality indicators across major reservoirs in the region',
  newMonitoring: 'New Monitoring Stations',
  newMonitoringDesc: 'Three new automated monitoring stations deployed in strategic locations',
  awardRecognition: 'Award Recognition',
  awardRecognitionDesc: 'Our portal receives national recognition for innovative water management solutions',
  justPosted: 'Just Posted',
  yesterday: 'Yesterday',
  '3daysAgo': '3 days ago',
  readMore: 'Read More',
  viewAllNews: 'View All News Articles',
  byTheNumbers: 'By the Numbers',
  monitoringSites: 'Monitoring Sites',
  dataCollection: 'Data Collection',
  parameters: 'Parameters Tracked',
  systemUptime: 'System Uptime',
  startExploring: 'Start Exploring Water Quality Data',
  ctaDescription: 'Access real-time monitoring data, historical trends, and comprehensive analysis tools',
  viewLatestNews: 'View Latest News',
  exploreMap: 'Explore Map'
})

// Russian translations
$i18n.mergeLocaleMessage('ru', {
  northKazakhstanWaterPortal: 'Водный портал Северного Казахстана',
  monitoringHydrological: 'Расширенный мониторинг гидрологических параметров и качества воды в водоемах Петропавловского региона',
  viewInteractiveMap: 'Посмотреть интерактивную карту',
  latestNews: 'Последние новости',
  reportCoordinates: 'Сообщить координаты',
  waterReports: 'Водные отчеты',
  userProfile: 'Профиль пользователя',
  ourMission: 'Наша миссия',
  missionDescription: 'Мы обеспечиваем мониторинг качества воды в реальном времени и комплексный анализ данных для безопасного и устойчивого управления водными ресурсами сообществ Северного Казахстана. Наша система предоставляет лицам, принимающим решения, точную и своевременную информацию.',
  comprehensiveMonitoring: 'Комплексная система мониторинга',
  monitoringSubtitle: 'Отслеживайте важнейшие показатели качества воды на нескольких объектах в режиме реального времени',
  coordinatesReporting: 'Отчетность по координатам',
  reportWaterBodyCoordinates: 'Сообщайте о местоположении и характеристиках водных объектов через нашу интерактивную систему картографирования',
  interactiveMap: 'Интерактивная карта',
  exploreAllMonitoring: 'Исследуйте все точки мониторинга с визуализацией данных в реальном времени и историческими трендами',
  manageWaterConditionReports: 'Управляйте и просматривайте комплексные отчеты о состоянии воды и оценках качества',
  manageYourAccount: 'Управляйте настройками учетной записи, предпочтениями и личной информацией',
  stayInformed: 'Будьте в курсе последних событий в управлении водными ресурсами',
  waterQualityUpdate: 'Обновление качества воды',
  waterQualityUpdateDesc: 'Последний анализ показывает улучшение показателей качества воды в основных водоемах региона',
  newMonitoring: 'Новые станции мониторинга',
  newMonitoringDesc: 'Три новые автоматизированные станции мониторинга развернуты в стратегических местах',
  awardRecognition: 'Награда и признание',
  awardRecognitionDesc: 'Наш портал получил национальное признание за инновационные решения в управлении водными ресурсами',
  justPosted: 'Только что',
  yesterday: 'Вчера',
  '3daysAgo': '3 дня назад',
  readMore: 'Читать далее',
  viewAllNews: 'Смотреть все новости',
  byTheNumbers: 'В цифрах',
  monitoringSites: 'Точки мониторинга',
  dataCollection: 'Сбор данных',
  parameters: 'Отслеживаемые параметры',
  systemUptime: 'Время работы системы',
  startExploring: 'Начните изучение данных о качестве воды',
  ctaDescription: 'Получите доступ к данным мониторинга в реальном времени, историческим трендам и комплексным инструментам анализа',
  viewLatestNews: 'Смотреть последние новости',
  exploreMap: 'Исследовать карту'
})

// Kazakh translations
$i18n.mergeLocaleMessage('kk', {
  northKazakhstanWaterPortal: 'Солтүстік Қазақстан су порталы',
  monitoringHydrological: 'Петропавл аймағындағы су қоймаларының гидрологиялық параметрлері мен су сапасын кеңейтілген мониторинг',
  viewInteractiveMap: 'Интерактивті картаны қарау',
  latestNews: 'Соңғы жаңалықтар',
  reportCoordinates: 'Координаттарды хабарлау',
  waterReports: 'Су есептері',
  userProfile: 'Пайдаланушы профилі',
  ourMission: 'Біздің миссиямыз',
  missionDescription: 'Біз Солтүстік Қазақстандағы қауымдастықтар үшін қауіпсіз, тұрақты су басқаруын қамтамасыз ету үшін нақты уақыттағы су сапасын бақылау және кешенді деректерді талдауды ұсынамыз. Біздің жүйе шешім қабылдаушыларға дәл, уақтылы ақпаратпен қамтамасыз етеді.',
  comprehensiveMonitoring: 'Кешенді мониторинг жүйесі',
  monitoringSubtitle: 'Бірнеше нүктелерде су сапасының маңызды көрсеткіштерін нақты уақытта қадағалаңыз',
  coordinatesReporting: 'Координаттарды хабарлау',
  reportWaterBodyCoordinates: 'Біздің интерактивті карталау жүйесі арқылы су объектілерінің орналасуы мен сипаттамаларын хабарлаңыз',
  interactiveMap: 'Интерактивті карта',
  exploreAllMonitoring: 'Нақты уақыт режиміндегі деректерді визуализациялау және тарихи тенденциялармен барлық мониторинг нүктелерін зерттеңіз',
  manageWaterConditionReports: 'Су жағдайы мен сапасын бағалау туралы кешенді есептерді басқару және қарау',
  manageYourAccount: 'Тіркелгі параметрлерін, теңшелімдерін және жеке ақпаратты басқарыңыз',
  stayInformed: 'Су ресурстарын басқарудың соңғы оқиғаларынан хабардар болыңыз',
  waterQualityUpdate: 'Су сапасын жаңарту',
  waterQualityUpdateDesc: 'Соңғы талдау аймақтағы негізгі су қоймаларында су сапасы көрсеткіштерінің жақсарғанын көрсетеді',
  newMonitoring: 'Жаңа мониторинг станциялары',
  newMonitoringDesc: 'Стратегиялық орындарда үш жаңа автоматтандырылған мониторинг станциясы орнатылды',
  awardRecognition: 'Марапат және мойындау',
  awardRecognitionDesc: 'Біздің портал су ресурстарын басқарудағы инновациялық шешімдері үшін ұлттық мойындау алды',
  justPosted: 'Жаңа ғана',
  yesterday: 'Кеше',
  '3daysAgo': '3 күн бұрын',
  readMore: 'Толығырақ оқу',
  viewAllNews: 'Барлық жаңалықтарды қарау',
  byTheNumbers: 'Сандармен',
  monitoringSites: 'Мониторинг нүктелері',
  dataCollection: 'Деректер жинау',
  parameters: 'Қадағаланатын параметрлер',
  systemUptime: 'Жүйенің жұмыс уақыты',
  startExploring: 'Су сапасы деректерін зерттеуді бастаңыз',
  ctaDescription: 'Нақты уақыттағы мониторинг деректеріне, тарихи тенденцияларға және кешенді талдау құралдарына қол жеткізіңіз',
  viewLatestNews: 'Соңғы жаңалықтарды қарау',
  exploreMap: 'Картаны зерттеу'
})
</script>