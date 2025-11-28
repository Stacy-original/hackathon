<template>
  <div style="height:100vh; width:100vw;" class="z=0">
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
          {{ $t('waterTemperature') }}: {{ lake.temperature }} {{ $t('degreesCelsius') }}
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
  waterTemperature: 'Water temperature',
  degreesCelsius: '°C'
})

$i18n.mergeLocaleMessage('ru', {
  petropavlSKO: 'Петропавловск (СКО)',
  petropavlNorthernKazakhstan: 'Петропавловск, Северный Казахстан',
  coordinates: 'Координаты',
  waterTemperature: 'Температура воды',
  degreesCelsius: '°C'
})

$i18n.mergeLocaleMessage('kk', {
  petropavlSKO: 'Петропавл (СҚО)',
  petropavlNorthernKazakhstan: 'Петропавл, Солтүстік Қазахстан',
  coordinates: 'Координаттар',
  waterTemperature: 'Су температурасы',
  degreesCelsius: '°C'
})

const isMounted = ref(false)

const petropavl = ref<[number, number]>([54.88, 69.16])

interface Lake { name: string; lat: number; lng: number; temperature: number}


const lakes = ref(lakesData.map(lake => ({
  name: lake.name,
  lat: lake.lat,
  lng: lake.lng,
  temperature: lake.temperature
})))

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
</script>