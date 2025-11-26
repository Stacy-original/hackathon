<template>
  <div class="py-8">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">
          {{ $t('waterBodyCoordinates') }}
        </h1>
        <p class="text-xl text-[#5A6A85] dark:text-[#A9B4C6] max-w-2xl mx-auto">
          {{ $t('mapWaterBodies') }}
        </p>
      </div>

      <!-- Map and Form Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- Map -->
        <div class="bg-white dark:bg-[#212832] rounded-2xl p-6 shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
          <h2 class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">
            {{ $t('selectOnMap') }}
          </h2>
          <div class="h-96 rounded-lg overflow-hidden">
            <LMap 
              v-if="isMounted" 
              :zoom="12" 
              :center="defaultCenter" 
              style="height:100%; width:100%;"
              @click="handleMapClick"
            >
              <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              
              <!-- Selected Point Marker -->
              <LMarker
                v-if="selectedPoint && defaultIcon"
                :lat-lng="selectedPoint"
                :Icon="defaultIcon"
              >
                <LPopup>
                  {{ $t('selectedPoint') }}<br />
                  {{ selectedPoint.lat.toFixed(6) }}, {{ selectedPoint.lng.toFixed(6) }}
                </LPopup>
              </LMarker>

              <!-- All Lakes Markers -->
              <LMarker
                v-for="lake in allLakesList"
                :key="lake.name"
                v-if="defaultIcon"
                :lat-lng="[lake.lat, lake.lng]"
                :Icon="defaultIcon"
              >
                <LPopup>
                  <div class="lake-popup">
                    <strong>{{ getTranslatedLakeName(lake.name, currentLanguage) }}</strong><br />
                    <div v-if="lake.transparency">{{ $t('transparency') }}: {{ lake.transparency }} {{ $t('meters') }}<br /></div>
                    <div v-if="lake.temperature">{{ $t('temperature') }}: {{ lake.temperature }}°C<br /></div>
                    <div v-if="lake.conductivity">{{ $t('conductivity') }}: {{ lake.conductivity }} µS/cm<br /></div>
                    <div v-if="lake.waterlevel">{{ $t('waterLevel') }}: {{ lake.waterlevel }} {{ $t('meters') }}<br /></div>
                    <div v-if="lake.pathogens">{{ $t('pathogens') }}: {{ lake.pathogens }}</div>
                  </div>
                </LPopup>
              </LMarker>

              <!-- Existing Coordinates -->
              <LMarker
                v-for="coord in recentCoordinates"
                :key="coord.id"
                v-if="defaultIcon"
                :lat-lng="[coord.lat, coord.lng]"
                :Icon="defaultIcon"
              >
                <LPopup>
                  <div class="lake-popup">
                    <strong>{{ coord.name }}</strong><br />
                    <div v-if="coord.transparency">{{ $t('transparency') }}: {{ coord.transparency }} {{ $t('meters') }}<br /></div>
                    <div v-if="coord.temperature">{{ $t('temperature') }}: {{ coord.temperature }}°C<br /></div>
                    <div v-if="coord.conductivity">{{ $t('conductivity') }}: {{ coord.conductivity }} µS/cm<br /></div>
                    <div v-if="coord.waterlevel">{{ $t('waterLevel') }}: {{ coord.waterlevel }} {{ $t('meters') }}<br /></div>
                    <div v-if="coord.pathogens">{{ $t('pathogens') }}: {{ coord.pathogens }}<br /></div>
                    <div v-if="coord.description">{{ $t('additionalNotes') }}: {{ coord.description }}<br /></div>
                    <div>{{ $t('status') }}: {{ $t(coord.status) }}</div>
                  </div>
                </LPopup>
              </LMarker>
            </LMap>
          </div>
          <p class="text-sm text-[#5A6A85] dark:text-[#A9B4C6] mt-3">
            {{ $t('clickMapInstructions') }}
          </p>
        </div>

        <!-- Form -->
        <div class="bg-white dark:bg-[#212832] rounded-2xl p-6 shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
          <h2 class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-6">
            {{ $t('waterBodyDetails') }}
          </h2>

          <form @submit.prevent="submitCoordinates" class="space-y-6">
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
                {{ $t('waterBodyName') }} *
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200"
                :placeholder="$t('waterBodyNamePlaceholder')"
              >
            </div>

            <!-- Coordinates (auto-filled from map) -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="lat" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
                  {{ $t('latitude') }} *
                </label>
                <input
                  id="lat"
                  v-model="formData.lat"
                  type="number"
                  step="any"
                  required
                  readonly
                  class="w-full px-4 py-3 bg-gray-100 dark:bg-[#2A313C] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] cursor-not-allowed"
                >
              </div>
              <div>
                <label for="lng" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
                  {{ $t('longitude') }} *
                </label>
                <input
                  id="lng"
                  v-model="formData.lng"
                  type="number"
                  step="any"
                  required
                  readonly
                  class="w-full px-4 py-3 bg-gray-100 dark:bg-[#2A313C] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] cursor-not-allowed"
                >
              </div>
            </div>

            <!-- Water Characteristics -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- First row: Transparency & Temperature -->
              <div class="space-y-2">
                <label for="transparency" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">
                  {{ $t('transparency') }} (m)
                </label>
                <input
                  id="transparency"
                  v-model="formData.transparency"
                  type="number"
                  step="0.1"
                  class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200"
                  :placeholder="$t('transparencyPlaceholder')"
                >
              </div>
              <div class="space-y-2">
                <label for="temperature" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">
                  {{ $t('temperature') }} (°C)
                </label>
                <input
                  id="temperature"
                  v-model="formData.temperature"
                  type="number"
                  step="0.1"
                  class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200"
                  :placeholder="$t('temperaturePlaceholder')"
                >
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Second row: Conductivity & Water Level -->
              <div class="space-y-2">
                <label for="conductivity" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">
                  {{ $t('conductivity') }} (µS/cm)
                </label>
                <input
                  id="conductivity"
                  v-model="formData.conductivity"
                  type="number"
                  step="1"
                  class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200"
                  :placeholder="$t('conductivityPlaceholder')"
                >
              </div>
              <div class="space-y-2">
                <label for="waterlevel" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">
                  {{ $t('waterLevel') }} (m)
                </label>
                <input
                  id="waterlevel"
                  v-model="formData.waterlevel"
                  type="number"
                  step="0.1"
                  class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200"
                  :placeholder="$t('waterLevelPlaceholder')"
                >
              </div>
            </div>

            <!-- Pathogens -->
            <div>
              <label for="pathogens" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
                {{ $t('pathogensLevel') }}
              </label>
              <select
                id="pathogens"
                v-model="formData.pathogens"
                class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200"
              >
                <option value="Low">{{ $t('low') }}</option>
                <option value="Medium">{{ $t('medium') }}</option>
                <option value="High">{{ $t('high') }}</option>
                <option value="Unknown">{{ $t('unknown') }}</option>
              </select>
            </div>

            <!-- Description -->
            <div>
              <label for="description" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
                {{ $t('additionalNotes') }}
              </label>
              <textarea
                id="description"
                v-model="formData.description"
                rows="3"
                class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200 resize-none"
                :placeholder="$t('additionalNotesPlaceholder')"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end pt-4">
              <button
                type="submit"
                :disabled="isSubmitting || !selectedPoint"
                :class="[
                  'px-8 py-3 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg font-medium transition-all duration-200 hover:scale-105',
                  (isSubmitting || !selectedPoint) ? 'opacity-50 cursor-not-allowed' : ''
                ]"
              >
                {{ isSubmitting ? $t('submitting') : $t('submitCoordinates') }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Success/Error Messages -->
      <div v-if="message" :class="[
        'fixed top-24 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300',
        message.type === 'success' ? 'bg-[#2ECC71] text-white' : 'bg-[#FF4E4E] text-white'
      ]">
        {{ message.text }}
      </div>

      <!-- Recent Coordinates -->
      <div class="bg-white dark:bg-[#212832] rounded-2xl p-6 shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF]">
            {{ $t('recentCoordinates') }}
          </h2>
          <button 
            @click="fetchCoordinates"
            class="px-4 py-2 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg text-sm font-medium transition-colors"
          >
            {{ $t('refresh') }}
          </button>
        </div>
        
        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6DFF]"></div>
          <p class="text-[#5A6A85] dark:text-[#A9B4C6] mt-2">{{ $t('loadingCoordinates') }}</p>
        </div>

        <div v-else-if="recentCoordinates.length === 0" class="text-center py-8">
          <p class="text-[#5A6A85] dark:text-[#A9B4C6]">{{ $t('noCoordinatesYet') }}</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="coord in recentCoordinates"
            :key="coord.id"
            class="p-4 border border-[#E2E8F0] dark:border-[#313B47] rounded-lg hover:shadow-md transition-all duration-200 bg-white dark:bg-[#212832]"
          >
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-semibold text-[#1A1A1A] dark:text-[#F1F5FF]">
                {{ coord.name }}
              </h3>
              <span :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                getStatusColor(coord.status)
              ]">
                {{ $t(coord.status) }}
              </span>
            </div>
            
            <div class="text-sm text-[#5A6A85] dark:text-[#A9B4C6] mb-3">
              {{ coord.lat.toFixed(6) }}, {{ coord.lng.toFixed(6) }}
            </div>

            <div class="space-y-2 text-sm">
              <div v-if="coord.waterlevel" class="flex justify-between">
                <span>{{ $t('waterLevel') }}:</span>
                <span class="font-medium">{{ coord.waterlevel }} {{ $t('meters') }}</span>
              </div>
              <div v-if="coord.temperature" class="flex justify-between">
                <span>{{ $t('temperature') }}:</span>
                <span class="font-medium">{{ coord.temperature }}°C</span>
              </div>
              <div v-if="coord.transparency" class="flex justify-between">
                <span>{{ $t('transparency') }}:</span>
                <span class="font-medium">{{ coord.transparency }} {{ $t('meters') }}</span>
              </div>
              <div v-if="coord.conductivity" class="flex justify-between">
                <span>{{ $t('conductivity') }}:</span>
                <span class="font-medium">{{ coord.conductivity }} µS/cm</span>
              </div>
              <div class="flex justify-between">
                <span>{{ $t('pathogens') }}:</span>
                <span class="font-medium">{{ coord.pathogens }}</span>
              </div>
            </div>

            <div v-if="coord.description" class="mt-3 text-xs text-[#5A6A85] dark:text-[#A9B4C6] border-t border-[#E2E8F0] dark:border-[#313B47] pt-2">
              {{ coord.description }}
            </div>

            <div class="text-xs text-[#5A6A85] dark:text-[#A9B4C6] mt-3">
              {{ formatDate(coord.createdAt) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from '@vue-leaflet/vue-leaflet'
import { Icon } from 'leaflet'
import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png'
import { ref } from 'vue'
import { allLakes, type Lake, } from '~/composables/lakes-data'
import { getTranslatedLakeName } from '~/composables/lakes-data';

// Get current language
const { locale } = useI18n();
const currentLanguage = locale.value;

const { isAuthenticated, checkAuthStatus } = useGoogleAuth()

onMounted(async () => {
  await checkAuthStatus()
  if (!isAuthenticated.value) {
    await navigateTo('/login')
  }
})


// Define translations for this page only
const { $i18n } = useNuxtApp()

$i18n.mergeLocaleMessage('en', {

  waterBodyCoordinates: 'Water Body Coordinates',
  mapWaterBodies: 'Map water bodies and record their characteristics',
  selectOnMap: 'Select on Map',
  selectedPoint: 'Selected Point',
  clickMapInstructions: 'Click anywhere on the map to select coordinates',
  waterBodyDetails: 'Water Body Details',
  waterBodyName: 'Water Body Name',
  waterBodyNamePlaceholder: 'e.g., Pestroe Lake',
  latitude: 'Latitude',
  longitude: 'Longitude',
  transparency: 'Transparency',
  transparencyPlaceholder: 'e.g., 1.2',
  temperature: 'Temperature',
  temperaturePlaceholder: 'e.g., 17.4',
  conductivity: 'Conductivity',
  conductivityPlaceholder: 'e.g., 420',
  waterLevel: 'Water Level',
  waterLevelPlaceholder: 'e.g., 1.8',
  pathogensLevel: 'Pathogens Level',
  pathogens: 'Pathogens',
  additionalNotes: 'Additional Notes',
  additionalNotesPlaceholder: 'Any additional observations...',
  submitCoordinates: 'Submit Coordinates',
  submitting: 'Submitting...',
  recentCoordinates: 'Recent Coordinates',
  refresh: 'Refresh',
  loadingCoordinates: 'Loading coordinates...',
  noCoordinatesYet: 'No coordinates submitted yet',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  unknown: 'Unknown',
  meters: 'meters',
  pending: 'pending',
  reviewed: 'reviewed',
  resolved: 'resolved',
  status: 'Status'
})

$i18n.mergeLocaleMessage('ru', {
  waterBodyCoordinates: 'Координаты водных объектов',
  mapWaterBodies: 'Наносите водные объекты на карту и записывайте их характеристики',
  selectOnMap: 'Выберите на карте',
  selectedPoint: 'Выбранная точка',
  clickMapInstructions: 'Нажмите в любом месте карты, чтобы выбрать координаты',
  waterBodyDetails: 'Детали водного объекта',
  waterBodyName: 'Название водного объекта',
  waterBodyNamePlaceholder: 'напр., Озеро Пестрое',
  latitude: 'Широта',
  longitude: 'Долгота',
  transparency: 'Прозрачность',
  transparencyPlaceholder: 'напр., 1.2',
  temperature: 'Температура',
  temperaturePlaceholder: 'напр., 17.4',
  conductivity: 'Электропроводность',
  conductivityPlaceholder: 'напр., 420',
  waterLevel: 'Уровень воды',
  waterLevelPlaceholder: 'напр., 1.8',
  pathogensLevel: 'Уровень патогенов',
  pathogens: 'Патогены',
  additionalNotes: 'Дополнительные заметки',
  additionalNotesPlaceholder: 'Любые дополнительные наблюдения...',
  submitCoordinates: 'Отправить координаты',
  submitting: 'Отправка...',
  recentCoordinates: 'Недавние координаты',
  refresh: 'Обновить',
  loadingCoordinates: 'Загрузка координат...',
  noCoordinatesYet: 'Координаты еще не отправлены',
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
  unknown: 'Неизвестно',
  meters: 'метров',
  pending: 'в ожидании',
  reviewed: 'рассмотрен',
  resolved: 'решено',
  status: 'Статус'
})

$i18n.mergeLocaleMessage('kk', {
  waterBodyCoordinates: 'Су объектілерінің координаттары',
  mapWaterBodies: 'Су объектілерін картаға түсіріп, олардың сипаттамаларын жазыңыз',
  selectOnMap: 'Картадан таңдаңыз',
  selectedPoint: 'Таңдалған нүкте',
  clickMapInstructions: 'Координаттарды таңдау үшін картаның кез келген жерін басыңыз',
  waterBodyDetails: 'Су объектісінің мәліметтері',
  waterBodyName: 'Су объектісінің атауы',
  waterBodyNamePlaceholder: 'мысалы, Пестрое көлі',
  latitude: 'Ендік',
  longitude: 'Бойлық',
  transparency: 'Мөлдірлік',
  transparencyPlaceholder: 'мысалы, 1.2',
  temperature: 'Температура',
  temperaturePlaceholder: 'мысалы, 17.4',
  conductivity: 'Электр өткізгіштік',
  conductivityPlaceholder: 'мысалы, 420',
  waterLevel: 'Су деңгейі',
  waterLevelPlaceholder: 'мысалы, 1.8',
  pathogensLevel: 'Патогендер деңгейі',
  pathogens: 'Патогендер',
  additionalNotes: 'Қосымша ескертпелер',
  additionalNotesPlaceholder: 'Қосымша бақылаулар...',
  submitCoordinates: 'Координаттарды жіберу',
  submitting: 'Жіберілуде...',
  recentCoordinates: 'Соңғы координаттар',
  refresh: 'Жаңарту',
  loadingCoordinates: 'Координаттар жүктелуде...',
  noCoordinatesYet: 'Координаттар әлі жіберілмеген',
  low: 'Төмен',
  medium: 'Орташа',
  high: 'Жоғары',
  unknown: 'Белгісіз',
  meters: 'метр',
  pending: 'күтілуде',
  reviewed: 'қаралды',
  resolved: 'шешілді',
  status: 'Статус'
})

// ✅ UPDATE THIS URL WITH YOUR RENDER URL
const API_BASE = 'https://skogeohydro-backend.onrender.com';

// Define types
interface Coordinate {
  id: string;
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

interface FormData {
  name: string;
  lat: string;
  lng: string;
  transparency: string;
  temperature: string;
  conductivity: string;
  waterlevel: string;
  pathogens: string;
  description: string;
}

interface Message {
  text: string;
  type: 'success' | 'error';
}

// Reactive data
const formData = ref<FormData>({
  name: '',
  lat: '',
  lng: '',
  transparency: '',
  temperature: '',
  conductivity: '',
  waterlevel: '',
  pathogens: 'Unknown',
  description: ''
});

const recentCoordinates = ref<Coordinate[]>([]);
const allLakesList = ref<Lake[]>(allLakes);
const loading = ref<boolean>(false);
const isSubmitting = ref<boolean>(false);
const message = ref<Message | null>(null);
const selectedPoint = ref<{ lat: number; lng: number } | null>(null);
const isMounted = ref(false);
const defaultIcon = ref<Icon | null>(null);

const defaultCenter = ref<[number, number]>([54.88, 69.16]); // Petropavl coordinates

const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
  message.value = { text, type };
  setTimeout(() => {
    message.value = null;
  }, 5000);
};

const handleMapClick = (event: any) => {
  const { lat, lng } = event.latlng;
  selectedPoint.value = { lat, lng };
  formData.value.lat = lat.toFixed(6);
  formData.value.lng = lng.toFixed(6);
};

// Submit coordinates to backend
const submitCoordinates = async () => {
  if (!formData.value.name || !selectedPoint.value) {
    showMessage('Please select a point on the map and provide a name', 'error');
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await fetch(`${API_BASE}/api/coordinates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    });

    if (response.ok) {
      showMessage('Coordinates submitted successfully!');
      // Reset form but keep selected point
      formData.value = {
        name: '',
        lat: selectedPoint.value.lat.toFixed(6),
        lng: selectedPoint.value.lng.toFixed(6),
        transparency: '',
        temperature: '',
        conductivity: '',
        waterlevel: '',
        pathogens: 'Unknown',
        description: ''
      };
      // Refresh coordinates list
      await fetchCoordinates();
    } else {
      const error = await response.json();
      showMessage(error.error || 'Failed to submit coordinates', 'error');
    }
  } catch (error) {
    showMessage('Network error. Please try again.', 'error');
  } finally {
    isSubmitting.value = false;
  }
};

// Fetch coordinates from backend
const fetchCoordinates = async () => {
  loading.value = true;
  try {
    const response = await fetch(`${API_BASE}/api/coordinates`);
    if (response.ok) {
      const coordinates = await response.json();
      // Show only the 6 most recent coordinates
      recentCoordinates.value = coordinates.slice(0, 6);
    } else {
      showMessage('Failed to load coordinates', 'error');
    }
  } catch (error) {
    showMessage('Network error. Please try again.', 'error');
  } finally {
    loading.value = false;
  }
};

// Format date for display
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
};

const getStatusColor = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: 'bg-[#FFCB2F] dark:bg-[#FFDD57] text-[#1A1A1A]',
    reviewed: 'bg-[#1E6DFF] dark:bg-[#6CA8FF] text-white',
    resolved: 'bg-[#2ECC71] dark:bg-[#38E39A] text-white'
  };
  return statusMap[status] || statusMap.pending;
};

// Initialize map and fetch coordinates
onMounted(() => {
  defaultIcon.value = new Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

  isMounted.value = true;
  fetchCoordinates();
});
</script>

<style scoped>
.lake-popup {
  min-width: 200px;
}

/* Ensure consistent height for form labels and inputs on mobile */
.space-y-2 > label {
  min-height: 1.5rem; /* Ensure consistent label height */
  display: flex;
  align-items: center;
}

.space-y-2 > input {
  min-height: 3rem; /* Ensure consistent input height */
}
</style>
