<template>
  <div class="min-h-screen bg-slate-300 dark:bg-[#0E1117] flex">
    <!-- Sidebar Toggle Button (when sidebar is closed) -->
    <button
      v-if="!sidebarOpen"
      @click="openSidebar"
      class="absolute top-20 right-4 opacity-50 z-[1000] p-2 bg-white dark:bg-[#1A1F27] rounded-lg shadow-lg border border-[#E2E8F0] dark:border-[#313B47] hover:bg-[#F5F8FF] dark:hover:bg-[#212832]"
      aria-label="Open sidebar"
    >
      <svg class="w-5 h-5 text-primary dark:text-[#F1F5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Map Container -->
    <div 
      :class="[
        'z-0 relative  ease-in-out',
        sidebarOpen ? 'flex-1' : 'w-full'
      ]"
      :style="!sidebarOpen ? { width: '100%' } : {}"
    >
      <LMap 
        v-if="isMounted" 
        ref="map"
        :zoom="currentZoom" 
        :center="currentCenter" 
        :use-global-leaflet="false"
        style="height:100%; width:100%;"
        @ready="onMapReady"
        @update:center="onMapMove"
        @update:zoom="onMapZoom"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <!-- City Center Marker -->
        <!-- <LMarker 
          v-if="defaultIcon" 
          :lat-lng="currentCenter" 
          :Icon="defaultIcon"
        >
          <LTooltip permanent direction="top">{{ currentCityName }}</LTooltip>
          <LPopup>
            <strong>{{ currentCityName }}</strong><br />
            {{ $t('monitoringLakesCount', { count: filteredLakes.length }) }}<br />
            {{ $t('reviewedPointsCount', { count: filteredCoordinates.length }) }}
          </LPopup>
        </LMarker> -->

        <!-- Lakes -->
        <LMarker
          v-for="(lake, i) in filteredLakes"
          :key="`lake-${i}`"
          :lat-lng="[lake.lat, lake.lng]"
          :Icon="defaultIcon"
        >
          <LTooltip permanent direction="top">{{ getTranslatedLakeName(lake.name, currentLanguage) }}</LTooltip>
          <LPopup>
            <strong>{{ getTranslatedLakeName(lake.name, currentLanguage) }}</strong><br />
            {{ $t('coordinates') }}: {{ lake.lat.toFixed(4) }}, {{ lake.lng.toFixed(4) }}<br />
            <span v-if="getParameterValue(lake)">
              {{ getParameterLabel() }}: {{ getParameterValue(lake) }} {{ getParameterUnit() }}
            </span>
          </LPopup>
        </LMarker>

        <!-- Reviewed Coordinates from Database -->
        <LMarker
          v-for="coord in filteredCoordinates"
          :key="coord._id"
          :lat-lng="[coord.lat, coord.lng]"
          :Icon="reviewedIcon"
        >
          <LTooltip permanent direction="top">{{ coord.name }}</LTooltip>
          <LPopup>
            <div class="coord-popup">
              <strong>{{ coord.name }}</strong><br />
              {{ $t('coordinates') }}: {{ coord.lat.toFixed(6) }}, {{ coord.lng.toFixed(6) }}<br />
              <div v-if="coord.transparency">{{ $t('waterTransparency') }}: {{ coord.transparency }} {{ $t('meters') }}<br /></div>
              <div v-if="coord.temperature">{{ $t('temperature') }}: {{ coord.temperature }}°C<br /></div>
              <div v-if="coord.conductivity">{{ $t('electricalConductivity') }}: {{ coord.conductivity }} µS/cm<br /></div>
              <div v-if="coord.waterlevel">{{ $t('waterLevel') }}: {{ coord.waterlevel }} {{ $t('meters') }}<br /></div>
              <div v-if="coord.pathogens">{{ $t('pathogenRisk') }}: {{ coord.pathogens }}<br /></div>
              <div v-if="coord.description">{{ $t('additionalNotes') }}: {{ coord.description }}<br /></div>
              <div>{{ $t('status') }}: {{ $t(coord.status) }}</div>
              <div class="text-xs text-gray-500 mt-2">{{ formatDate(coord.createdAt) }}</div>
            </div>
          </LPopup>
        </LMarker>
      </LMap>
    </div>

    <!-- Sidebar -->
    <div 
      v-show="sidebarOpen"
      :class="[
        'bg-white dark:bg-[#1A1F27] border-l border-[#E2E8F0] dark:border-[#313B47] p-6 overflow-y-auto z-[999] ease-in-out',
        sidebarOpen ? 'w-80 opacity-100' : 'w-0 opacity-0'
      ]"
    >
      <!-- Close Button -->
      <button
        @click="closeSidebar"
        class="mb-4 p-2 rounded-lg hover:bg-[#F5F8FF] dark:hover:bg-[#212832] ml-auto"
        aria-label="Close sidebar"
      >
        <svg class="w-5 h-5 text-primary dark:text-[#F1F5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- Refresh Button -->
      <div class="mb-4 flex justify-end">
        <button
          @click="fetchCoordinates"
          :disabled="loading"
          class="px-3 py-2 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          <span>{{ loading ? $t('loading') : $t('refresh') }}</span>
        </button>
      </div>

      <!-- City Selection -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-primary dark:text-[#F1F5FF] mb-3">
          {{ $t('selectCity') }}
        </h3>
        <select 
          v-model="selectedCity" 
          class="w-full p-3 border border-[#E2E8F0] dark:border-[#313B47] rounded-lg bg-white dark:bg-[#212832] text-primary dark:text-[#F1F5FF] focus:border-[#1E6DFF] dark:focus:border-[#6CA8FF] focus:outline-none"
          @change="onCityChange"
        >
          <option value="petropavl">{{ $t('petropavl') }}</option>
          <option value="astana">{{ $t('astana') }}</option>
          <option value="almaty">{{ $t('almaty') }}</option>
        </select>
      </div>

      <!-- Data Source Selection -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-primary dark:text-[#F1F5FF] mb-3">
          {{ $t('dataSource') }}
        </h3>
        <div class="space-y-2">
          <label class="flex items-center">
            <input
              type="checkbox"
              v-model="showLakes"
              class="rounded border-[#E2E8F0] dark:border-[#313B47] text-[#1E6DFF] focus:ring-[#1E6DFF]"
            >
            <span class="ml-2 text-primary dark:text-[#F1F5FF]">{{ $t('showLakes') }}</span>
          </label>
          <label class="flex items-center">
            <input
              type="checkbox"
              v-model="showCoordinates"
              class="rounded border-[#E2E8F0] dark:border-[#313B47] text-[#1E6DFF] focus:ring-[#1E6DFF]"
            >
            <span class="ml-2 text-primary dark:text-[#F1F5FF]">{{ $t('showReviewedPoints') }}</span>
          </label>
        </div>
      </div>

      <!-- Parameter Selection -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-primary dark:text-[#F1F5FF] mb-3">
          {{ $t('selectParameter') }}
        </h3>
        <select 
          v-model="selectedParameter" 
          class="w-full p-3 border border-[#E2E8F0] dark:border-[#313B47] rounded-lg bg-white dark:bg-[#212832] text-primary dark:text-[#F1F5FF] focus:border-[#1E6DFF] dark:focus:border-[#6CA8FF] focus:outline-none"
        >
          <option value="all">{{ $t('allParameters') }}</option>
          <option value="transparency">{{ $t('waterTransparency') }}</option>
          <option value="temperature">{{ $t('temperature') }}</option>
          <option value="conductivity">{{ $t('electricalConductivity') }}</option>
          <option value="waterlevel">{{ $t('waterLevel') }}</option>
          <option value="pathogens">{{ $t('pathogenRisk') }}</option>
        </select>
      </div>

      <!-- Statistics -->
      <div class="mb-6 p-4 bg-[#F7F9FC] dark:bg-[#212832] rounded-lg">
        <h3 class="text-lg font-semibold text-primary dark:text-[#F1F5FF] mb-3">
          {{ $t('statistics') }}
        </h3>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-secondary dark:text-[#A9B4C6]">{{ $t('totalLakes') }}:</span>
            <span class="font-medium text-primary dark:text-[#F1F5FF]">{{ filteredLakes.length }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-secondary dark:text-[#A9B4C6]">{{ $t('reviewedPoints') }}:</span>
            <span class="font-medium text-primary dark:text-[#F1F5FF]">{{ filteredCoordinates.length }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-secondary dark:text-[#A9B4C6]">{{ $t('lastUpdated') }}:</span>
            <span class="font-medium text-primary dark:text-[#F1F5FF]">{{ lastUpdated }}</span>
          </div>
        </div>
      </div>

      <!-- Lakes List -->
      <div v-if="showLakes" class="mb-6">
        <h3 class="text-lg font-semibold text-primary dark:text-[#F1F5FF] mb-3">
          {{ $t('lakesList') }} ({{ filteredLakes.length }})
        </h3>
        <div class="space-y-2 max-h-60 overflow-y-auto">
          <div
            v-for="(lake, index) in filteredLakes"
            :key="`lake-list-${index}`"
            @click="zoomToLake(lake)"
            class="p-3 border border-[#E2E8F0] dark:border-[#313B47] rounded-lg cursor-pointer hover:border-[#1E6DFF] dark:hover:border-[#6CA8FF] hover:bg-[#F5F8FF] dark:hover:bg-[#212832] transition-all duration-200"
          >
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-primary dark:text-[#F1F5FF]">{{ getTranslatedLakeName(lake.name, currentLanguage) }}</h4>
                <p class="text-sm text-secondary dark:text-[#A9B4C6]">
                  {{ getParameterValue(lake) }} {{ getParameterUnit() }}
                </p>
              </div>
              <div class="text-2xl">
                {{ getParameterIcon() }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reviewed Coordinates List -->
      <div v-if="showCoordinates">
        <h3 class="text-lg font-semibold text-primary dark:text-[#F1F5FF] mb-3">
          {{ $t('reviewedPointsList') }} ({{ filteredCoordinates.length }})
        </h3>
        <div class="space-y-2 max-h-60 overflow-y-auto">
          <div
            v-for="coord in filteredCoordinates"
            :key="`coord-${coord._id}`"
            @click="zoomToCoordinate(coord)"
            class="p-3 border border-[#2ECC71] dark:border-[#38E39A] rounded-lg cursor-pointer hover:border-[#1E6DFF] dark:hover:border-[#6CA8FF] hover:bg-[#F5F8FF] dark:hover:bg-[#212832] transition-all duration-200 bg-[#F0F9F0] dark:bg-[#1A2A1A]"
          >
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-primary dark:text-[#F1F5FF]">{{ coord.name }}</h4>
                <p class="text-sm text-secondary dark:text-[#A9B4C6]">
                  {{ coord.lat.toFixed(4) }}, {{ coord.lng.toFixed(4) }}
                </p>
                <div class="text-xs text-green-600 dark:text-green-400 mt-1">
                  {{ formatDate(coord.createdAt) }}
                </div>
              </div>
              <div class="text-2xl">
                📍
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- sidebar end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LTooltip, LPopup } from '@vue-leaflet/vue-leaflet'
import { Icon } from 'leaflet'
import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png'
import { getLakesByCity } from '~/composables/lakes-data'
import { getTranslatedLakeName } from '~/composables/lakes-data';

// Get current language
const { locale } = useI18n();
const currentLanguage = locale.value;

// Get runtime config for API
const config = useRuntimeConfig()
const API_BASE = config.public.apiBaseUrl
const API_KEY = config.public.defaultApiKey

const { $i18n } = useNuxtApp()

// Extended translations
$i18n.mergeLocaleMessage('en', {
  selectCity: 'Select City',
  selectParameter: 'Select Parameter',
  lakesList: 'Lakes List',
  petropavl: 'Petropavl',
  astana: 'Astana',
  almaty: 'Almaty',
  coordinates: 'Coordinates',
  waterTransparency: 'Water Transparency',
  temperature: 'Temperature',
  electricalConductivity: 'Electrical Conductivity',
  waterLevel: 'Water Level',
  pathogenRisk: 'Pathogen Risk',
  metersSecchiDepth: 'm (Secchi)',
  degreesCelsius: '°C',
  microsiemensPerCm: 'µS/cm',
  meters: 'm',
  riskLevel: 'Risk Level',
  monitoringLakesCount: 'Monitoring {count} lakes',
  reviewedPointsCount: 'Reviewed points: {count}',
  dataSource: 'Data Sources',
  showLakes: 'Show Lakes',
  showReviewedPoints: 'Show Reviewed Points',
  allParameters: 'All Parameters',
  statistics: 'Statistics',
  totalLakes: 'Total Lakes',
  reviewedPoints: 'Reviewed Points',
  lastUpdated: 'Last Updated',
  reviewedPointsList: 'Reviewed Points',
  refresh: 'Refresh',
  loading: 'Loading...',
  status: 'Status',
  additionalNotes: 'Additional Notes',
  pending: 'pending',
  reviewed: 'reviewed',
  resolved: 'resolved'
})

$i18n.mergeLocaleMessage('ru', {
  selectCity: 'Выберите город',
  selectParameter: 'Выберите параметр',
  lakesList: 'Список озер',
  petropavl: 'Петропавл',
  astana: 'Астана',
  almaty: 'Алматы',
  coordinates: 'Координаты',
  waterTransparency: 'Прозрачность воды',
  temperature: 'Температура',
  electricalConductivity: 'Электропроводность',
  waterLevel: 'Уровень воды',
  pathogenRisk: 'Риск патогенов',
  metersSecchiDepth: 'м (Секки)',
  degreesCelsius: '°C',
  microsiemensPerCm: 'мкСм/см',
  meters: 'м',
  riskLevel: 'Уровень риска',
  monitoringLakesCount: 'Мониторинг {count} озер',
  reviewedPointsCount: 'Проверенные точки: {count}',
  dataSource: 'Источники данных',
  showLakes: 'Показать озера',
  showReviewedPoints: 'Показать проверенные точки',
  allParameters: 'Все параметры',
  statistics: 'Статистика',
  totalLakes: 'Всего озер',
  reviewedPoints: 'Проверенные точки',
  lastUpdated: 'Последнее обновление',
  reviewedPointsList: 'Проверенные точки',
  refresh: 'Обновить',
  loading: 'Загрузка...',
  status: 'Статус',
  additionalNotes: 'Дополнительные заметки',
  pending: 'в ожидании',
  reviewed: 'рассмотрен',
  resolved: 'решено'
})

$i18n.mergeLocaleMessage('kk', {
  selectCity: 'Қала таңдаңыз',
  selectParameter: 'Параметр таңдаңыз',
  lakesList: 'Көлдер тізімі',
  petropavl: 'Петропавл',
  astana: 'Астана',
  almaty: 'Алматы',
  coordinates: 'Координаттар',
  waterTransparency: 'Су өткізгіштігі',
  temperature: 'Температура',
  electricalConductivity: 'Электр өткізгіштік',
  waterLevel: 'Су деңгейі',
  pathogenRisk: 'Патогендер қауіпі',
  metersSecchiDepth: 'м (Секки)',
  degreesCelsius: '°C',
  microsiemensPerCm: 'мкСм/см',
  meters: 'м',
  riskLevel: 'Қауіп деңгейі',
  monitoringLakesCount: '{count} көлді бақылау',
  reviewedPointsCount: 'Қаралған нүктелер: {count}',
  dataSource: 'Дерек көздері',
  showLakes: 'Көлдерді көрсету',
  showReviewedPoints: 'Қаралған нүктелерді көрсету',
  allParameters: 'Барлық параметрлер',
  statistics: 'Статистика',
  totalLakes: 'Барлық көлдер',
  reviewedPoints: 'Қаралған нүктелер',
  lastUpdated: 'Соңғы жаңартылған',
  reviewedPointsList: 'Қаралған нүктелер',
  refresh: 'Жаңарту',
  loading: 'Жүктелуде...',
  status: 'Статус',
  additionalNotes: 'Қосымша ескертпелер',
  pending: 'күтілуде',
  reviewed: 'қаралды',
  resolved: 'шешілді'
})

// Types
interface Coordinate {
  _id: string;
  name: string;
  lat: number;
  lng: number;
  transparency: number | null;
  temperature: number | null;
  conductivity: number | null;
  waterlevel: number | null;
  pathogens: string;
  description: string;
  status: string;
  createdAt: string;
}

// Reactive data
const isMounted = ref(false)
const selectedCity = ref('petropavl')
const selectedParameter = ref('all')
const map = ref()
const mapReady = ref(false)
const sidebarOpen = ref(true)
const showLakes = ref(true)
const showCoordinates = ref(true)
const loading = ref(false)
const coordinates = ref<Coordinate[]>([])
const lastUpdated = ref('Never')

// Icons
const defaultIcon = ref<Icon | null>(null)
const reviewedIcon = ref<Icon | null>(null)

// Fix: Use proper typing for Leaflet map
interface LeafletMap {
  setView: (center: [number, number], zoom: number) => void
  invalidateSize: () => void
  getBounds: () => any
}

const cityConfigs = {
  petropavl: { 
    center: [54.88, 69.16] as [number, number], 
    zoom: 12,
    name: 'Petropavl'
  },
  astana: { 
    center: [51.1694, 71.4491] as [number, number], 
    zoom: 12,
    name: 'Astana'
  },
  almaty: { 
    center: [43.2220, 76.8512] as [number, number], 
    zoom: 12,
    name: 'Almaty'
  }
}

const currentConfig = computed(() => cityConfigs[selectedCity.value as keyof typeof cityConfigs])
const currentCenter = computed(() => currentConfig.value.center)
const currentZoom = computed(() => currentConfig.value.zoom)
const currentCityName = computed(() => currentConfig.value.name)

// Filter lakes based on selected parameter
const currentLakes = computed(() => {
  const lakes = getLakesByCity(selectedCity.value);
  if (selectedParameter.value === 'all') {
    return lakes;
  }
  return lakes.filter(lake => 
    lake[selectedParameter.value as keyof typeof lake] !== undefined
  );
})

// Filter coordinates to show only reviewed ones
const filteredCoordinates = computed(() => {
  if (!showCoordinates.value) return [];
  
  let filtered = coordinates.value.filter(coord => coord.status === 'reviewed');
  
  // Additional filtering by parameter if not "all"
  if (selectedParameter.value !== 'all') {
    filtered = filtered.filter(coord => {
      const param = selectedParameter.value as keyof Coordinate;
      return coord[param] !== null && coord[param] !== undefined && coord[param] !== '';
    });
  }
  
  return filtered;
})

// Filter lakes based on visibility setting
const filteredLakes = computed(() => {
  return showLakes.value ? currentLakes.value : [];
})

const parameters = {
  transparency: { unit: 'metersSecchiDepth', icon: '🔍', label: 'waterTransparency' },
  temperature: { unit: 'degreesCelsius', icon: '🌡️', label: 'temperature' },
  conductivity: { unit: 'microsiemensPerCm', icon: '⚡', label: 'electricalConductivity' },
  waterlevel: { unit: 'meters', icon: '💧', label: 'waterLevel' },
  pathogens: { unit: 'riskLevel', icon: '🦠', label: 'pathogenRisk' }
}

const getParameterValue = (lake: any) => {
  if (selectedParameter.value === 'all') {
    return Object.keys(parameters)
      .map(param => {
        const value = lake[param];
        return value ? `${$i18n.t(parameters[param as keyof typeof parameters]?.label || '')}: ${value} ${$i18n.t(parameters[param as keyof typeof parameters]?.unit || '')}` : null;
      })
      .filter(Boolean)
      .join(', ');
  }
  return lake[selectedParameter.value];
}

const getParameterUnit = () => {
  if (selectedParameter.value === 'all') return '';
  return $i18n.t(parameters[selectedParameter.value as keyof typeof parameters]?.unit || '');
}

const getParameterIcon = () => {
  if (selectedParameter.value === 'all') return '📍';
  return parameters[selectedParameter.value as keyof typeof parameters]?.icon || '📍';
}

const getParameterLabel = () => {
  if (selectedParameter.value === 'all') return $i18n.t('allParameters');
  return $i18n.t(parameters[selectedParameter.value as keyof typeof parameters]?.label || '');
}

// Fetch coordinates from backend
const fetchCoordinates = async () => {
  loading.value = true;
  try {
    const response = await fetch(`${API_BASE}/api/coordinates`, {
      headers: {
        'X-API-Key': API_KEY
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      coordinates.value = data;
      lastUpdated.value = new Date().toLocaleTimeString();
    } else {
      console.error('Failed to load coordinates');
    }
  } catch (error) {
    console.error('Network error loading coordinates:', error);
  } finally {
    loading.value = false;
  }
}

const zoomToLake = (lake: any) => {
  if (map.value?.leafletObject) {
    const leafletMap = map.value.leafletObject as LeafletMap
    leafletMap.setView([lake.lat, lake.lng], 13)
    
    nextTick(() => {
      leafletMap.invalidateSize()
    })
  }
}

const zoomToCoordinate = (coord: Coordinate) => {
  if (map.value?.leafletObject) {
    const leafletMap = map.value.leafletObject as LeafletMap
    leafletMap.setView([coord.lat, coord.lng], 15)
    
    nextTick(() => {
      leafletMap.invalidateSize()
    })
  }
}

const onCityChange = () => {
  if (map.value?.leafletObject && mapReady.value) {
    const leafletMap = map.value.leafletObject as LeafletMap
    leafletMap.setView(currentCenter.value, currentZoom.value)
    
    nextTick(() => {
      leafletMap.invalidateSize()
    })
  }
}

const onMapReady = () => {
  mapReady.value = true
  nextTick(() => {
    if (map.value?.leafletObject) {
      const leafletMap = map.value.leafletObject as LeafletMap
      leafletMap.invalidateSize()
    }
  })
}

const onMapMove = () => {
  // Optional: Handle map move events if needed
}

const onMapZoom = () => {
  // Optional: Handle map zoom events if needed
}

const openSidebar = () => {
  sidebarOpen.value = true
  nextTick(() => {
    if (map.value?.leafletObject) {
      const leafletMap = map.value.leafletObject as LeafletMap
      setTimeout(() => {
        leafletMap.invalidateSize()
      }, 300)
    }
  })
}

const closeSidebar = () => {
  sidebarOpen.value = false
  nextTick(() => {
    if (map.value?.leafletObject) {
      const leafletMap = map.value.leafletObject as LeafletMap
      setTimeout(() => {
        leafletMap.invalidateSize()
      }, 300)
    }
  })
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString();
}

onMounted(() => {
  defaultIcon.value = new Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  })

  // Create a different icon for reviewed coordinates (you can customize this)
  reviewedIcon.value = new Icon({
    iconUrl: markerIconPng, // You can use a different icon here
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
    className: 'reviewed-marker' // Add custom class for styling
  })

  isMounted.value = true
  
  // Fetch coordinates on mount
  fetchCoordinates();
  
  // Fix: Initial map size validation
  nextTick(() => {
    if (map.value?.leafletObject) {
      const leafletMap = map.value.leafletObject as LeafletMap
      setTimeout(() => {
        leafletMap.invalidateSize()
      }, 100)
    }
  })
})
</script>

<style scoped>
.coord-popup {
  min-width: 250px;
}

/* Custom styling for reviewed markers */
.reviewed-marker {
  filter: hue-rotate(120deg); /* Make markers green */
}
</style>