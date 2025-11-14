<template>
    <div style="height:100vh;width:100vw;">
        <LMap :zoom="12" :center="petropavl" :use-global-leaflet="false" style="height:100%;width:100%;">
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors">
                
                <!-- city marker -->
                <LMarker :lat-lng="petropavl" :draggable="false">
                    <LTooltip permanent direction="top">Petropavl (SKO)</LTooltip>
                    <LPopup>Petropavl, Northern Kazakhstan</LPopup>
                </LMarker>

                <!-- lakes -->
                <LMarker v-for="(lake, i) in lakes" :key="i" :lat-lng="[lake.lat, lake.lng]" :draggable="false">
                    <LTooltip permanent direction="top">{{ lake.name }}</LTooltip>
                    <LPopup>
                        <strong>{{ lake.name }}</strong><br />
                        Coordinates: {{ lake.lat }}, {{ lake.lng }}
                    </LPopup>
                </LMarker>

            </LTileLayer>
        </LMap>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LMap, LTileLayer, LMarker, LTooltip, LPopup } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

type LatLngTuple = [number, number]

interface Lake {
    name: string
    lat: number
    lng: number
}

const petropavl = ref<LatLngTuple>([54.88, 69.16])

const lakes = ref<Lake[]>([
    { name: 'Pestroe', lat: 54.836699, lng: 69.111328 },
    { name: 'Beloe', lat: 54.927154, lng: 69.254322 },
    { name: 'Gorkoe', lat: 54.947573, lng: 69.951122 },
    { name: 'Poganka', lat: 54.921205, lng: 69.053476 },
    { name: 'Dickoe', lat: 54.840156, lng: 69.131957 },
])
</script>
