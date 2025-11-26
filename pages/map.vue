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
        <LMarker 
          v-if="defaultIcon" 
          :lat-lng="currentCenter" 
          :Icon="defaultIcon"
        >
          <LTooltip permanent direction="top">{{ currentCityName }}</LTooltip>
          <LPopup>
            <strong>{{ currentCityName }}</strong><br />
            {{ $t('monitoringLakesCount', { count: currentLakes.length }) }}
          </LPopup>
        </LMarker>

        <!-- Lakes -->
        <LMarker
          v-for="(lake, i) in currentLakes"
          :key="i"
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

      <!-- Parameter Selection -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-primary dark:text-[#F1F5FF] mb-3">
          {{ $t('selectParameter') }}
        </h3>
        <select 
          v-model="selectedParameter" 
          class="w-full p-3 border border-[#E2E8F0] dark:border-[#313B47] rounded-lg bg-white dark:bg-[#212832] text-primary dark:text-[#F1F5FF] focus:border-[#1E6DFF] dark:focus:border-[#6CA8FF] focus:outline-none"
        >
          <option value="transparency">{{ $t('waterTransparency') }}</option>
          <option value="temperature">{{ $t('temperature') }}</option>
          <option value="conductivity">{{ $t('electricalConductivity') }}</option>
          <option value="waterlevel">{{ $t('waterLevel') }}</option>
          <option value="pathogens">{{ $t('pathogenRisk') }}</option>
        </select>
      </div>

      <!-- Lakes List -->
      <div>
        <h3 class="text-lg font-semibold text-primary dark:text-[#F1F5FF] mb-3">
          {{ $t('lakesList') }} ({{ currentLakes.length }})
        </h3>
        <div class="space-y-2">
          <div
            v-for="(lake, index) in currentLakes"
            :key="index"
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
    </div>
    <!-- sidebar end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LTooltip, LPopup } from '@vue-leaflet/vue-leaflet'
import { Icon } from 'leaflet'
import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png'
import { getLakesByCity } from '~/composables/lakes-data'
import { getTranslatedLakeName } from '~/composables/lakes-data';

// In your page components, add meta:
definePageMeta({
  middleware: 'auth',
  requiresAuth: true,
  requiresRole: 2 // for admin pages
})
// Get current language
const { locale } = useI18n();
const currentLanguage = locale.value;

const { $i18n } = useNuxtApp()

// Translations (unchanged from your original code)
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
  monitoringLakesCount: 'Monitoring {count} lakes'
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
  monitoringLakesCount: 'Мониторинг {count} озер'
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
  monitoringLakesCount: '{count} көлді бақылау'
})

const isMounted = ref(false)
const selectedCity = ref('petropavl')
const selectedParameter = ref('transparency')
const map = ref()
const mapReady = ref(false)
const sidebarOpen = ref(true)

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
const currentLakes = computed(() => 
  getLakesByCity(selectedCity.value).filter(lake => 
    lake[selectedParameter.value as keyof typeof lake] !== undefined
  )
)

const defaultIcon = ref<Icon | null>(null)

const parameters = {
  transparency: { unit: 'metersSecchiDepth', icon: '🔍', label: 'waterTransparency' },
  temperature: { unit: 'degreesCelsius', icon: '🌡️', label: 'temperature' },
  conductivity: { unit: 'microsiemensPerCm', icon: '⚡', label: 'electricalConductivity' },
  waterlevel: { unit: 'meters', icon: '💧', label: 'waterLevel' },
  pathogens: { unit: 'riskLevel', icon: '🦠', label: 'pathogenRisk' }
}

const getParameterValue = (lake: any) => {
  return lake[selectedParameter.value]
}

const getParameterUnit = () => {
  return $i18n.t(parameters[selectedParameter.value as keyof typeof parameters]?.unit || '')
}

const getParameterIcon = () => {
  return parameters[selectedParameter.value as keyof typeof parameters]?.icon || '📍'
}

const getParameterLabel = () => {
  return $i18n.t(parameters[selectedParameter.value as keyof typeof parameters]?.label || '')
}

const zoomToLake = (lake: any) => {
  if (map.value?.leafletObject) {
    const leafletMap = map.value.leafletObject as LeafletMap
    leafletMap.setView([lake.lat, lake.lng], 13)
    
    // Fix: Invalidate size after zoom to ensure proper centering
    nextTick(() => {
      leafletMap.invalidateSize()
    })
  }
}

const onCityChange = () => {
  if (map.value?.leafletObject && mapReady.value) {
    const leafletMap = map.value.leafletObject as LeafletMap
    leafletMap.setView(currentCenter.value, currentZoom.value)
    
    // Fix: Invalidate size after city change
    nextTick(() => {
      leafletMap.invalidateSize()
    })
  }
}

const onMapReady = () => {
  mapReady.value = true
  // Fix: Ensure map is properly sized on initial load
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
  // Fix: Invalidate map size when sidebar opens
  nextTick(() => {
    if (map.value?.leafletObject) {
      const leafletMap = map.value.leafletObject as LeafletMap
      setTimeout(() => {
        leafletMap.invalidateSize()
      }, 300) // Match the transition duration
    }
  })
}

const closeSidebar = () => {
  sidebarOpen.value = false
  // Fix: Invalidate map size when sidebar closes
  nextTick(() => {
    if (map.value?.leafletObject) {
      const leafletMap = map.value.leafletObject as LeafletMap
      setTimeout(() => {
        leafletMap.invalidateSize()
      }, 300) // Match the transition duration
    }
  })
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

  isMounted.value = true
  
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