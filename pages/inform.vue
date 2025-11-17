<template>
  <div style="height:100vh; width:100vw;">
    <LMap v-if="isMounted" :zoom="12" :center="petropavl" style="height:100%; width:100%;">
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <!-- City marker -->
      <LMarker v-if="defaultIcon" :lat-lng="petropavl" :Icon="defaultIcon">
        <LTooltip permanent direction="top">{{ $t('petropavlSKO') }}</LTooltip>
        <LPopup>{{ $t('petropavlNorthernKazakhstan') }}</LPopup>
      </LMarker>

      <!-- Lakes -->
      <LMarker
        v-for="(lake, i) in lakes"
        :key="i"
        v-if="defaultIcon"
        :lat-lng="[lake.lat, lake.lng]"
        :Icon="defaultIcon"
      >
        <LTooltip permanent direction="top">{{ lake.name }}</LTooltip>
        <LPopup>
          <strong>{{ lake.name }}</strong><br />
          {{ $t('coordinates') }}: {{ lake.lat }}, {{ lake.lng }}<br />
          {{ $t('pathogensRisk') }}: {{ lake.pathogens }} 
        </LPopup>
      </LMarker>
    </LMap>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'

import { LMap, LTileLayer, LMarker, LTooltip, LPopup } from '@vue-leaflet/vue-leaflet'
import { Icon } from 'leaflet'
import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png'

// Define translations for this page only
const { $i18n } = useNuxtApp()

$i18n.mergeLocaleMessage('en', {
  petropavlSKO: 'Petropavl (SKO)',
  petropavlNorthernKazakhstan: 'Petropavl, Northern Kazakhstan',
  coordinates: 'Coordinates',
  pathogensRisk: 'Pathogens risk'
})

$i18n.mergeLocaleMessage('ru', {
  petropavlSKO: 'Петропавловск (СКО)',
  petropavlNorthernKazakhstan: 'Петропавловск, Северный Казахстан',
  coordinates: 'Координаты',
  pathogensRisk: 'Риск патогенов'
})

$i18n.mergeLocaleMessage('kk', {
  petropavlSKO: 'Петропавл (СҚО)',
  petropavlNorthernKazakhstan: 'Петропавл, Солтүстік Қазахстан',
  coordinates: 'Координаттар',
  pathogensRisk: 'Патогендер қауіпі'
})

const isMounted = ref(false)

const petropavl = ref<[number, number]>([54.88, 69.16])

interface Lake { name: string; lat: number; lng: number; pathogens: string}
const lakes = ref<Lake[]>([
  { name: 'Pestroe Lake', lat: 54.836699, lng: 69.111328, pathogens: 'Low' },
  { name: 'Beloe Lake', lat: 54.927154, lng: 69.254322, pathogens: 'Medium' },
  { name: 'Gorkoe Lake', lat: 54.947573, lng: 68.951122, pathogens: 'Low' },
  { name: 'Poganka Lake', lat: 54.921205, lng: 69.053476, pathogens: 'High' },
  { name: 'Dickoe Lake', lat: 54.840156, lng: 69.131957, pathogens: 'Medium' },
  { name: 'Kishtibish 1', lat: 54.970375, lng: 69.180688, pathogens: 'Low' },
  { name: 'Kishtibish 2', lat: 54.960860, lng: 69.162569, pathogens: 'Low' },
  { name: 'Kishtibish 3', lat: 54.954006, lng: 69.179125, pathogens: 'Medium' },
  { name: 'Minkeser Lake', lat: 54.527220, lng: 67.930560, pathogens: 'Low' }
])

const defaultIcon = ref<Icon | null>(null)

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

// ...existing code...

// Add language persistence to every page (no duplicate merge calls)
const i18n = useI18n();
const { locale, setLocale, locales } = i18n as any;

onMounted(() => {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('i18n_redirected='))
    ?.split('=')[1];

  if (!cookieValue || cookieValue === locale.value) return;

  // validate cookie against available locales (handles string/code shapes)
  const raw = (locales as any)?.value ?? locales ?? [];
  const available = Array.isArray(raw)
    ? raw.map((l: any) => (typeof l === 'string' ? l : l?.code)).filter(Boolean)
    : [];

  if (available.length === 0 || available.includes(cookieValue)) {
    setLocale(cookieValue);
  }
});
// ...existing code...
</script>