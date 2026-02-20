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
        <!-- Base Layers -->
        <LTileLayer
          v-if="selectedLayer === 'osm'"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
          layer-type="base"
        />
        <LTileLayer
          v-if="selectedLayer === 'satellite'"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &amp; Earthstar Geographics"
          layer-type="base"
        />
        <LTileLayer
          v-if="selectedLayer === 'topo'"
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          attribution="Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)"
          layer-type="base"
        />

        <!-- Lakes -->
        <LMarker
          v-for="(lake, i) in filteredLakes"
          :key="`lake-${i}`"
          :lat-lng="[lake.lat, lake.lng]"
          :Icon="defaultIcon"
        >
          <LTooltip permanent direction="top">{{ getTranslatedLakeName(lake.name, currentLanguage) }}</LTooltip>
          <LPopup>
            <div class="lake-popup min-w-64">
              <strong>{{ getTranslatedLakeName(lake.name, currentLanguage) }}</strong><br />
              {{ $t('coordinates') }}: {{ lake.lat.toFixed(4) }}, {{ lake.lng.toFixed(4) }}<br />
              
              <!-- Parameter Values -->
              <div class="mt-2 text-sm">
                <div v-if="selectedParameter === 'all'">
                  <div v-if="lake.transparency">{{ $t('waterTransparency') }}: {{ lake.transparency }} {{ $t('meters') }}<br /></div>
                  <div v-if="lake.conductivity">{{ $t('electricalConductivity') }}: {{ lake.conductivity }} µS/cm<br /></div>
                  <div v-if="lake.waterlevel">{{ $t('waterLevel') }}: {{ lake.waterlevel }} {{ $t('meters') }}<br /></div>
                  <div v-if="lake.pathogens">{{ $t('pathogenRisk') }}: {{ lake.pathogens }}<br /></div>
                </div>
                <div v-else-if="getParameterValue(lake)">
                  {{ getParameterLabel() }}: {{ getParameterValue(lake) }} {{ getParameterUnit() }}
                </div>
              </div>
              
              <!-- Temperature Data Section - Only show when temperature or all parameters selected -->
              <div v-if="showTemperatureData" class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                <div class="flex justify-between items-center mb-2">
                  <strong>{{ $t('temperatureData') }}</strong>
                  <button
                    @click="toggleTemperatureGraph(lake)"
                    class="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    {{ expandedLakeId === lake.id ? $t('hideGraph') : $t('showGraph') }}
                  </button>
                </div>
                
                <!-- Current Temperature -->
                <div v-if="getCurrentTemperature(lake.id)" class="text-sm">
                  {{ $t('currentTemperature') }}: 
                  <span class="font-semibold">
                    {{ getCurrentTemperature(lake.id) }}°C
                  </span>
                  <span class="text-xs text-gray-500 ml-2">
                    ({{ formatTime(getCurrentTime(lake.id)) }})
                  </span>
                </div>
                <div v-else class="text-sm text-gray-500">
                  {{ $t('loadingTemperature') }}...
                </div>

                <!-- Temperature Graph -->
                <div v-if="expandedLakeId === lake.id && hasTemperatureData(lake.id)" class="mt-3">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-medium">{{ $t('temperatureForecast') }}</span>
                    <span class="text-xs text-gray-500">{{ $t('next7Days') }}</span>
                  </div>
                  
                  <!-- Graph Container -->
                  <div class="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                    <div class="relative h-32">
                      <!-- Y-axis labels -->
                      <div class="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-gray-500">
                        <span>{{ getMaxTemp(lake.id) }}°C</span>
                        <span>{{ Math.round((getMinTemp(lake.id) + getMaxTemp(lake.id)) / 2) }}°C</span>
                        <span>{{ getMinTemp(lake.id) }}°C</span>
                      </div>
                      
                      <!-- Graph area with line chart -->
                      <div class="ml-8 h-full relative">
                        <!-- Grid lines -->
                        <div class="absolute inset-0 grid grid-cols-7 gap-1">
                          <div v-for="i in 7" :key="i" class="border-r border-gray-200 dark:border-gray-600 last:border-r-0"></div>
                        </div>
                        
                        <!-- Temperature line -->
                        <svg class="absolute inset-0 w-full h-full">
                          <defs>
                            <linearGradient id="temperatureGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stop-color="#3b82f6" />
                              <stop offset="100%" stop-color="#1e40af" />
                            </linearGradient>
                          </defs>
                          <path 
                            v-if="getTemperaturePath(lake.id)"
                            :d="getTemperaturePath(lake.id)" 
                            fill="none" 
                            stroke="url(#temperatureGradient)" 
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          
                          <!-- Data points -->
                          <circle 
                            v-for="(point, index) in getGraphPoints(lake.id)"
                            :key="index"
                            :cx="point.x" 
                            :cy="point.y" 
                            r="3" 
                            fill="#3b82f6" 
                            stroke="#1e40af"
                            stroke-width="1.5"
                            class="cursor-pointer"
                          />
                        </svg>

                        <!-- Day labels -->
                        <div class="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-500">
                          <span v-for="(_, index) in 7" 
                                :key="index" class="flex-1 text-center">
                            {{ formatDayLabel(index) }}
                          </span>
                        </div>

                        <!-- Temperature values -->
                        <div class="absolute -top-6 left-0 right-0 flex justify-between text-xs text-gray-500">
                          <span v-for="(day, index) in getDailyData(lake.id).slice(0, 7)" 
                                :key="index" class="flex-1 text-center">
                            {{ Math.round(day.temperature_max) }}°
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Additional weather info -->
                  <div v-if="getCurrentTime(lake.id)" class="mt-2 text-xs text-gray-500">
                    {{ $t('lastUpdated') }}: {{ formatTime(getCurrentTime(lake.id)) }}
                  </div>
                </div>
                <div v-else-if="expandedLakeId === lake.id" class="text-sm text-gray-500 mt-2">
                  {{ $t('noTemperatureData') }}
                </div>
              </div>
            </div>
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

        <!-- Flood Areas Polygons -->
        <template v-if="showFloodAreas">
          <LPolygon
            v-for="(area, index) in floodAreas"
            :key="'flood-' + index"
            :lat-lngs="area.holes ? [area.points, ...area.holes] : [area.points]"
            :color="area.color"
            :fillColor="area.color"
            :fillOpacity="0.2"
            :weight="2"
          >
            <LPopup>
              <strong>{{ area.name }}</strong><br />
              Flood Area<br />
              Points: {{ area.points.length }}<br />
              <span v-if="area.holes?.length">Holes: {{ area.holes.length }}</span>
            </LPopup>
          </LPolygon>
        </template>
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

      <!-- Map Layer Selection -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-primary dark:text-[#F1F5FF] mb-3">
          {{ $t('mapLayer') }}
        </h3>
        <select 
          v-model="selectedLayer" 
          class="w-full p-3 border border-[#E2E8F0] dark:border-[#313B47] rounded-lg bg-white dark:bg-[#212832] text-primary dark:text-[#F1F5FF] focus:border-[#1E6DFF] dark:focus:border-[#6CA8FF] focus:outline-none"
        >
          <option value="osm">{{ $t('openStreetMap') }}</option>
          <option value="satellite">{{ $t('satellite') }}</option>
          <option value="topo">{{ $t('topographic') }}</option>
        </select>
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

      <!-- Flood Areas Toggle -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-primary dark:text-[#F1F5FF] mb-3">
          Flood Areas
        </h3>
        <label class="flex items-center cursor-pointer">
          <input
            type="checkbox"
            v-model="showFloodAreas"
            class="rounded border-[#E2E8F0] dark:border-[#313B47] text-[#1E6DFF] focus:ring-[#1E6DFF]"
          >
          <span class="ml-2 text-primary dark:text-[#F1F5FF]">Show Flood Areas</span>
        </label>
        <p v-if="floodAreas.length === 0" class="text-xs text-gray-500 mt-1">
          No areas defined. Use area-drawer tool to create them.
        </p>
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
                <!-- Current temperature display in list -->
                <div v-if="showTemperatureData && getCurrentTemperature(lake.id)" class="text-xs text-blue-500 dark:text-blue-400 mt-1">
                  {{ $t('currentTemp') }}: {{ getCurrentTemperature(lake.id) }}°C
                </div>
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
import { LMap, LTileLayer, LMarker, LTooltip, LPopup, LPolygon } from '@vue-leaflet/vue-leaflet'
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
  resolved: 'resolved',
  temperatureData: 'Temperature Data',
  currentTemperature: 'Current Temperature',
  temperatureForecast: 'Temperature Forecast',
  showGraph: 'Show Graph',
  hideGraph: 'Hide Graph',
  loadingTemperature: 'Loading temperature',
  next7Days: 'Next 7 days',
  currentTemp: 'Current',
  noTemperatureData: 'No temperature data available',
  mapLayer: 'Map Layer',
  openStreetMap: 'OpenStreetMap',
  satellite: 'Satellite',
  topographic: 'Topographic'
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
  resolved: 'решено',
  temperatureData: 'Данные о температуре',
  currentTemperature: 'Текущая температура',
  temperatureForecast: 'Прогноз температуры',
  showGraph: 'Показать график',
  hideGraph: 'Скрыть график',
  loadingTemperature: 'Загрузка температуры',
  next7Days: 'Следующие 7 дней',
  currentTemp: 'Текущая',
  noTemperatureData: 'Данные о температуре недоступны',
  mapLayer: 'Слой карты',
  openStreetMap: 'OpenStreetMap',
  satellite: 'Спутник',
  topographic: 'Топографический'
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
  resolved: 'шешілді',
  temperatureData: 'Температура деректері',
  currentTemperature: 'Ағымдағы температура',
  temperatureForecast: 'Температура болжамы',
  showGraph: 'Графикті көрсету',
  hideGraph: 'Графикті жасыру',
  loadingTemperature: 'Температура жүктелуде',
  next7Days: 'Келесі 7 күн',
  currentTemp: 'Ағымдағы',
  noTemperatureData: 'Температура деректері қолжетімді емес',
  mapLayer: 'Карта қабаты',
  openStreetMap: 'OpenStreetMap',
  satellite: 'Спутник',
  topographic: 'Топографиялық'
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

interface FloodArea {
  name: string;
  color: string;
  points: number[][];
  holes?: number[][][];
}

interface CurrentTemperature {
  temperature: number;
  time: string;
}

interface DailyTemperature {
  time: string;
  temperature_max: number;
  temperature_min: number;
}

interface TemperatureData {
  current: CurrentTemperature;
  daily: DailyTemperature[];
}

interface GraphPoint {
  x: number;
  y: number;
  temperature: number;
}

interface WeatherApiResponse {
  current: {
    temperature_2m: number;
    time: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

// Reactive data
const isMounted = ref(false)
const selectedCity = ref('petropavl')
const selectedParameter = ref('all')
const selectedLayer = ref('osm')
const map = ref()
const mapReady = ref(false)
const sidebarOpen = ref(true)
const showLakes = ref(true)
const showCoordinates = ref(true)
const showFloodAreas = ref(true)
const loading = ref(false)
const coordinates = ref<Coordinate[]>([])
const lastUpdated = ref('Never')
const expandedLakeId = ref<string | null>(null)
const lakeTemperatureData = ref<Record<string, TemperatureData>>({})

// Test flood area with hole
// Add to map.vue - floodZone
const floodAreas = ref([
  {
    name: 'floodZone',
    color: '#1E6DFF',
    points: [
      [
        54.799399,
        69.109026
      ],
      [
        54.803159,
        69.115037
      ],
      [
        54.8086,
        69.118128
      ],
      [
        54.811073,
        69.118729
      ],
      [
        54.812953,
        69.117183
      ],
      [
        54.814882,
        69.112289
      ],
      [
        54.816613,
        69.111086
      ],
      [
        54.817997,
        69.114092
      ],
      [
        54.820223,
        69.113834
      ],
      [
        54.822547,
        69.107308
      ],
      [
        54.827788,
        69.089361
      ],
      [
        54.831743,
        69.085668
      ],
      [
        54.834215,
        69.08043
      ],
      [
        54.838713,
        69.084552
      ],
      [
        54.846868,
        69.094256
      ],
      [
        54.848103,
        69.055699
      ],
      [
        54.843062,
        69.055356
      ],
      [
        54.840245,
        69.049688
      ],
      [
        54.835302,
        69.053295
      ],
      [
        54.835945,
        69.041015
      ],
      [
        54.828233,
        69.048143
      ],
      [
        54.824129,
        69.032618
      ],
      [
        54.818294,
        69.036053
      ],
      [
        54.809688,
        69.03571
      ],
      [
        54.796232,
        69.035538
      ],
      [
        54.785147,
        69.080363
      ],
      [
        54.79257,
        69.088091
      ],
      [
        54.791383,
        69.094617
      ],
      [
        54.799399,
        69.109026
      ]
    ],
    holes: [
      [
        [
          54.826849,
          69.085745
        ],
        [
          54.822151,
          69.096221
        ],
        [
          54.818442,
          69.10103
        ],
        [
          54.816712,
          69.107299
        ],
        [
          54.815475,
          69.106869
        ],
        [
          54.815772,
          69.099227
        ],
        [
          54.810875,
          69.07982
        ],
        [
          54.812755,
          69.077072
        ],
        [
          54.816662,
          69.07544
        ],
        [
          54.826849,
          69.085745
        ]
      ]
    ]
  }
])

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

// Show temperature data only when temperature or all parameters are selected
const showTemperatureData = computed(() => {
  return selectedParameter.value === 'temperature' || selectedParameter.value === 'all';
})

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

// Safe data access methods
const hasTemperatureData = (lakeId: string): boolean => {
  const data = lakeTemperatureData.value[lakeId];
  return !!(data?.daily && Array.isArray(data.daily) && data.daily.length > 0);
}

const getDailyData = (lakeId: string): DailyTemperature[] => {
  const data = lakeTemperatureData.value[lakeId];
  return data?.daily && Array.isArray(data.daily) ? data.daily : [];
}

const getCurrentTemperature = (lakeId: string): number | null => {
  const data = lakeTemperatureData.value[lakeId];
  return data?.current?.temperature ?? null;
}

const getCurrentTime = (lakeId: string): string => {
  const data = lakeTemperatureData.value[lakeId];
  return data?.current?.time ?? '';
}

const getMinTemp = (lakeId: string): number => {
  const dailyData = getDailyData(lakeId);
  if (dailyData.length === 0) return 0;
  return Math.min(...dailyData.map(day => day.temperature_min));
}

const getMaxTemp = (lakeId: string): number => {
  const dailyData = getDailyData(lakeId);
  if (dailyData.length === 0) return 30;
  return Math.max(...dailyData.map(day => day.temperature_max));
}

const getGraphPoints = (lakeId: string): GraphPoint[] => {
  const dailyData = getDailyData(lakeId).slice(0, 7);
  if (dailyData.length === 0) return [];
  
  const points: GraphPoint[] = [];
  const graphWidth = 200;
  const graphHeight = 128;
  const minTemp = getMinTemp(lakeId);
  const maxTemp = getMaxTemp(lakeId);
  const tempRange = Math.max(maxTemp - minTemp, 1);

  for (let i = 0; i < dailyData.length; i++) {
    const day = dailyData[i];
    const x = (i / Math.max(dailyData.length - 1, 1)) * graphWidth;
    const y = graphHeight - ((day.temperature_max - minTemp) / tempRange) * graphHeight;
    points.push({ x, y, temperature: day.temperature_max });
  }
  
  return points;
}

const getTemperaturePath = (lakeId: string): string => {
  const points = getGraphPoints(lakeId);
  if (points.length === 0) return '';
  
  let path = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i].x} ${points[i].y}`;
  }
  
  return path;
}

const parameters = {
  transparency: { unit: 'metersSecchiDepth', icon: '🔍', label: 'waterTransparency' },
  temperature: { unit: 'degreesCelsius', icon: '🌡️', label: 'temperature' },
  conductivity: { unit: 'microsiemensPerCm', icon: '⚡', label: 'electricalConductivity' },
  waterlevel: { unit: 'meters', icon: '💧', label: 'waterLevel' },
  pathogens: { unit: 'riskLevel', icon: '🦠', label: 'pathogenRisk' }
}

const getParameterValue = (lake: any) => {
  if (selectedParameter.value === 'all') {
    const values = [];
    if (lake.transparency) values.push(`${$i18n.t('waterTransparency')}: ${lake.transparency} ${$i18n.t('meters')}`);
    if (lake.conductivity) values.push(`${$i18n.t('electricalConductivity')}: ${lake.conductivity} µS/cm`);
    if (lake.waterlevel) values.push(`${$i18n.t('waterLevel')}: ${lake.waterlevel} ${$i18n.t('meters')}`);
    if (lake.pathogens) values.push(`${$i18n.t('pathogenRisk')}: ${lake.pathogens}`);
    return values.join('\n');
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
  if (selectedParameter.value === 'all') return '';
  return $i18n.t(parameters[selectedParameter.value as keyof typeof parameters]?.label || '');
}

// Fetch temperature data for a specific lake (simulated water temperature)
const fetchTemperatureData = async (lake: any): Promise<void> => {
  try {
    const { lat, lng } = lake;
    
    let response: WeatherApiResponse;
    try {
      response = await $fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
      ) as WeatherApiResponse;
    } catch (firstError) {
      console.log('Primary API failed, trying backup:', firstError);
      
      response = await $fetch(
        `https://94.130.142.35/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`,
        {
          headers: {
            'Host': 'api.open-meteo.com',
          },
        }
      ) as WeatherApiResponse;
    }

    if (response.current && response.daily) {
      const waterTempOffset = (Math.random() - 0.5) * 3;
      
      const currentTemp = Math.round((response.current.temperature_2m + waterTempOffset) * 10) / 10;
      const dailyData: DailyTemperature[] = response.daily.time.map((time: string, index: number) => ({
        time,
        temperature_max: Math.round((response.daily.temperature_2m_max[index] + waterTempOffset) * 10) / 10,
        temperature_min: Math.round((response.daily.temperature_2m_min[index] + waterTempOffset) * 10) / 10
      }));

      lakeTemperatureData.value[lake.id] = {
        current: {
          temperature: currentTemp,
          time: response.current.time
        },
        daily: dailyData
      };
    }

  } catch (error: any) {
    console.error(`Error fetching temperature data for lake ${lake.name}:`, error);
    
    // Set fallback data with simulated water temperatures
    const baseTemp = 15 + Math.random() * 10;
    const fallbackDaily: DailyTemperature[] = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dailyVariation = (Math.random() - 0.5) * 4;
      return {
        time: date.toISOString().split('T')[0],
        temperature_max: Math.round((baseTemp + dailyVariation + 2) * 10) / 10,
        temperature_min: Math.round((baseTemp + dailyVariation - 2) * 10) / 10
      };
    });

    lakeTemperatureData.value[lake.id] = {
      current: {
        temperature: Math.round(baseTemp * 10) / 10,
        time: new Date().toISOString()
      },
      daily: fallbackDaily
    };
  }
}

// Toggle temperature graph
const toggleTemperatureGraph = async (lake: any) => {
  if (expandedLakeId.value === lake.id) {
    expandedLakeId.value = null;
  } else {
    expandedLakeId.value = lake.id;
    
    if (!lakeTemperatureData.value[lake.id]) {
      await fetchTemperatureData(lake);
    }
  }
}

// Format day label
const formatDayLabel = (index: number): string => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().getDay();
  return days[(today + index) % 7] || 'Sun';
}

// Format time
const formatTime = (timeString: string): string => {
  if (!timeString) return '';
  try {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
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
  try {
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
  } catch {
    return 'Unknown date';
  }
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

  reviewedIcon.value = new Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
    className: 'reviewed-marker'
  })

  isMounted.value = true
  
  fetchCoordinates();
  
  currentLakes.value.forEach(lake => {
    fetchTemperatureData(lake);
  });
  
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

.lake-popup {
  min-width: 280px;
}

.reviewed-marker {
  filter: hue-rotate(120deg);
}

.graph-container {
  background: linear-gradient(to bottom, #f8fafc, #e2e8f0);
}

.dark .graph-container {
  background: linear-gradient(to bottom, #1e293b, #0f172a);
}

.whitespace-pre-line {
  white-space: pre-line;
}
</style>