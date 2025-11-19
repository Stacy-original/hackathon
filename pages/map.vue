<template>
  <div class="min-h-screen bg-slate-300 dark:bg-[#0E1117] flex">
    <!-- Sidebar -->
    <div class="w-80 bg-white dark:bg-[#1A1F27] border-r border-[#E2E8F0] dark:border-[#313B47] p-6 overflow-y-auto">
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
                <h4 class="font-medium text-primary dark:text-[#F1F5FF]">{{ lake.name }}</h4>
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

    <!-- Map -->
    <div class="flex-1 relative">
      <LMap 
        v-if="isMounted" 
        ref="map"
        :zoom="currentZoom" 
        :center="currentCenter" 
        style="height:100%; width:100%;"
        @ready="onMapReady"
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
          <LTooltip permanent direction="top">{{ lake.name }}</LTooltip>
          <LPopup>
            <strong>{{ lake.name }}</strong><br />
            {{ $t('coordinates') }}: {{ lake.lat.toFixed(4) }}, {{ lake.lng.toFixed(4) }}<br />
            <span v-if="getParameterValue(lake)">
              {{ getParameterLabel() }}: {{ getParameterValue(lake) }} {{ getParameterUnit() }}
            </span>
          </LPopup>
        </LMarker>
      </LMap>
    </div>
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

const { $i18n } = useNuxtApp()

// Translations
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

// Reactive state
const isMounted = ref(false)
const selectedCity = ref('petropavl')
const selectedParameter = ref('transparency')
const map = ref()
const mapReady = ref(false)

// City configurations - all with zoom 12 for consistency
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

// Computed properties
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

// Parameter configuration
const parameters = {
  transparency: { unit: 'metersSecchiDepth', icon: '🔍', label: 'waterTransparency' },
  temperature: { unit: 'degreesCelsius', icon: '🌡️', label: 'temperature' },
  conductivity: { unit: 'microsiemensPerCm', icon: '⚡', label: 'electricalConductivity' },
  waterlevel: { unit: 'meters', icon: '💧', label: 'waterLevel' },
  pathogens: { unit: 'riskLevel', icon: '🦠', label: 'pathogenRisk' }
}

// Methods
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
    const leafletMap = map.value.leafletObject
    leafletMap.setView([lake.lat, lake.lng], 13)
  }
}

const onCityChange = () => {
  if (map.value?.leafletObject && mapReady.value) {
    const leafletMap = map.value.leafletObject
    leafletMap.setView(currentCenter.value, currentZoom.value)
  }
}

const onMapReady = () => {
  mapReady.value = true
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
})
</script>