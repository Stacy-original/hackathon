<template>
  <div style="height:100vh; width:100vw;">
    <LMap v-if="isMounted" :zoom="12" :center="petropavl" style="height:100%; width:100%;">
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <!-- City marker -->
      <LMarker v-if="defaultIcon" :lat-lng="petropavl" :Icon="defaultIcon">
        <LTooltip permanent direction="top">{{ t('petropavlSKO') }}</LTooltip>
        <LPopup>{{ t('petropavlNorthernKazakhstan') }}</LPopup>
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
          {{ t('coordinates') }}: {{ lake.lat }}, {{ lake.lng }}<br />
          {{ t('electricalConductivityUnit') }}: {{ lake.conductivity }} {{ t('microsiemensPerCm') }}
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

const { t } = useTranslations();

const isMounted = ref(false)

const petropavl = ref<[number, number]>([54.88, 69.16])

interface Lake { name: string; lat: number; lng: number; conductivity: number}
const lakes = ref<Lake[]>([
  { name: 'Pestroe Lake', lat: 54.836699, lng: 69.111328, conductivity: 420 },
  { name: 'Beloe Lake', lat: 54.927154, lng: 69.254322, conductivity: 380 },
  { name: 'Gorkoe Lake', lat: 54.947573, lng: 68.951122, conductivity: 610 },
  { name: 'Poganka Lake', lat: 54.921205, lng: 69.053476, conductivity: 700 },
  { name: 'Dickoe Lake', lat: 54.840156, lng: 69.131957, conductivity: 460 },
  { name: 'Kishtibish 1', lat: 54.970375, lng: 69.180688, conductivity: 330 },
  { name: 'Kishtibish 2', lat: 54.960860, lng: 69.162569, conductivity: 350 },
  { name: 'Kishtibish 3', lat: 54.954006, lng: 69.179125, conductivity: 370 },
  { name: 'Minkeser Lake', lat: 54.527220, lng: 67.930560, conductivity: 1400 }
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
</script>