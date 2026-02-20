<template>
  <div class="py-8">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
          Area Drawing Tool
        </h1>
        <p class="text-lg text-[#5A6A85] dark:text-[#A9B4C6]">
          Draw polygons with holes on map and export coordinates
        </p>
      </div>

      <!-- Map and Controls -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Map -->
        <div class="lg:col-span-2 bg-white dark:bg-[#212832] rounded-2xl p-4 shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
          <div class="flex justify-between items-center mb-3">
            <h2 class="text-xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF]">
              Draw Area
            </h2>
            <div class="flex gap-2">
              <button
                @click="setMode('polygon')"
                :class="[
                  'px-3 py-1.5 text-sm rounded-lg transition-colors',
                  mode === 'polygon' 
                    ? 'bg-[#1E6DFF] text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                ]"
              >
                Polygon
              </button>
              <button
                @click="setMode('hole')"
                :class="[
                  'px-3 py-1.5 text-sm rounded-lg transition-colors',
                  mode === 'hole' 
                    ? 'bg-[#1E6DFF] text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                ]"
                :disabled="!currentPolygon.points.length"
              >
                Add Hole
              </button>
              <button
                @click="clearPolygon"
                class="px-3 py-1.5 text-sm bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                :disabled="!currentPolygon.points.length && !holes.length"
              >
                Clear
              </button>
              <button
                @click="undoLastPoint"
                class="px-3 py-1.5 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                :disabled="!currentPoints.length"
              >
                Undo
              </button>
            </div>
          </div>
          
          <div class="h-[500px] rounded-lg overflow-hidden">
            <ClientOnly>
              <LMap 
                v-if="isMounted" 
                :zoom="12" 
                :center="[54.88, 69.16]"
                style="height:100%; width:100%;"
                @click="handleMapClick"
              >
                <LTileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />

                <!-- Main polygon with holes -->
                <LPolygon
                  v-if="currentPolygon.points.length >= 3"
                  :lat-lngs="[currentPolygon.points, ...holes.map(h => h.points)]"
                  :color="currentPolygon.color"
                  :fillColor="currentPolygon.color"
                  :fillOpacity="0.3"
                  :weight="2"
                />

                <!-- Individual holes being drawn -->
                <template v-if="mode === 'hole' && currentHole.points.length">
                  <LPolygon
                    :lat-lngs="currentHole.points"
                    color="#FF4E4E"
                    fillColor="#FF4E4E"
                    :fillOpacity="0.2"
                    :weight="2"
                  />
                  <LPolyline
                    v-if="currentHole.points.length >= 2"
                    :lat-lngs="currentHole.points"
                    color="#FF4E4E"
                    :weight="2"
                    dash-array="5, 5"
                  />
                </template>

                <!-- Points for main polygon -->
                <template v-if="mode === 'polygon'">
                  <LCircleMarker
                    v-for="(point, index) in currentPolygon.points"
                    :key="'main-' + index"
                    :lat-lng="point"
                    :radius="6"
                    color="#1E6DFF"
                    fillColor="#FFFFFF"
                    :fillOpacity="1"
                    :weight="2"
                  >
                    <LTooltip :content="String(index + 1)" permanent />
                  </LCircleMarker>
                </template>

                <!-- Points for holes -->
                <template v-if="mode === 'hole'">
                  <LCircleMarker
                    v-for="(point, index) in currentHole.points"
                    :key="'hole-' + index"
                    :lat-lng="point"
                    :radius="4"
                    color="#FF4E4E"
                    fillColor="#FF4E4E"
                    :fillOpacity="0.8"
                    :weight="1"
                  >
                    <LTooltip :content="'H' + (index + 1)" permanent />
                  </LCircleMarker>
                </template>

                <!-- Last point indicator -->
                <LCircleMarker
                  v-if="currentPoints.length > 0 && !isCurrentPolygonClosed"
                  :lat-lng="currentPoints[currentPoints.length - 1]"
                  :radius="4"
                  :color="mode === 'polygon' ? '#1E6DFF' : '#FF4E4E'"
                  :fillColor="mode === 'polygon' ? '#1E6DFF' : '#FF4E4E'"
                  :fillOpacity="0.5"
                  :weight="1"
                />
              </LMap>
              <template #fallback>
                <div class="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <p class="text-gray-500">Loading map...</p>
                </div>
              </template>
            </ClientOnly>
          </div>
          
          <p class="text-sm text-[#5A6A85] dark:text-[#A9B4C6] mt-2">
            {{ mode === 'polygon' ? 'Click to add points to main polygon' : 'Click to add points to hole (must be inside main polygon)' }}
          </p>
        </div>

        <!-- Controls and Export -->
        <div class="bg-white dark:bg-[#212832] rounded-2xl p-5 shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
          <h2 class="text-xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">
            Export Area with Holes
          </h2>

          <!-- Stats -->
          <div class="mb-4 p-3 bg-gray-50 dark:bg-[#2A313C] rounded-lg space-y-2">
            <div class="text-sm text-[#5A6A85] dark:text-[#A9B4C6]">
              Main Polygon: <span class="font-bold text-[#1A1A1A] dark:text-[#F1F5FF]">{{ currentPolygon.points.length }} points</span>
              <span class="ml-2 text-xs" :class="isMainPolygonClosed ? 'text-green-500' : 'text-yellow-500'">
                ({{ isMainPolygonClosed ? 'Closed' : 'Open' }})
              </span>
            </div>
            <div class="text-sm text-[#5A6A85] dark:text-[#A9B4C6]">
              Holes: <span class="font-bold text-[#1A1A1A] dark:text-[#F1F5FF]">{{ holes.length }}</span>
            </div>
            <div v-if="mode === 'hole'" class="text-sm text-[#5A6A85] dark:text-[#A9B4C6]">
              Current Hole: <span class="font-bold text-[#1A1A1A] dark:text-[#F1F5FF]">{{ currentHole.points.length }} points</span>
              <span class="ml-2 text-xs" :class="isHoleClosed ? 'text-green-500' : 'text-yellow-500'">
                ({{ isHoleClosed ? 'Closed' : 'Open' }})
              </span>
            </div>
          </div>

          <!-- Area Name -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
              Area Name
            </label>
            <input
              v-model="areaName"
              type="text"
              placeholder="e.g., floodZone1"
              class="w-full px-4 py-2.5 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF]"
            />
          </div>

          <!-- Color picker -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
              Area Color
            </label>
            <div class="flex items-center gap-3">
              <input
                v-model="areaColor"
                type="color"
                class="w-12 h-10 rounded border border-[#E2E8F0] dark:border-[#313B47] cursor-pointer"
              />
              <input
                v-model="areaColor"
                type="text"
                class="flex-1 px-4 py-2.5 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF]"
                placeholder="#1E6DFF"
              />
            </div>
          </div>

          <!-- Complete Hole Button -->
          <button
            v-if="mode === 'hole' && currentHole.points.length >= 3 && isHoleClosed"
            @click="completeHole"
            class="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors mb-4"
          >
            Complete Hole
          </button>

          <!-- Export Button -->
          <button
            @click="exportArea"
            :disabled="!isMainPolygonClosed"
            class="w-full px-4 py-3 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg font-medium transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Export Area Code
          </button>

          <!-- Generated Code -->
          <div v-if="generatedCode" class="mt-4">
            <label class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
              Copy this to map.vue:
            </label>
            <textarea
              :value="generatedCode"
              rows="8"
              readonly
              class="w-full px-4 py-3 bg-gray-50 dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-xs font-mono text-[#1A1A1A] dark:text-[#F1F5FF] resize-none"
              @click="selectText"
            ></textarea>
            <button
              @click="copyToClipboard"
              class="mt-2 px-3 py-1.5 text-sm bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Copy to Clipboard
            </button>
          </div>

          <!-- Saved Areas -->
          <div v-if="savedAreas.length" class="mt-6 pt-4 border-t border-[#E2E8F0] dark:border-[#313B47]">
            <h3 class="text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
              Saved Areas ({{ savedAreas.length }})
            </h3>
            <div class="space-y-2 max-h-40 overflow-y-auto">
              <div
                v-for="(area, index) in savedAreas"
                :key="index"
                class="flex items-center justify-between p-2 bg-gray-50 dark:bg-[#2A313C] rounded-lg text-xs"
              >
                <span class="text-[#1A1A1A] dark:text-[#F1F5FF]">{{ area.name }}</span>
                <div class="flex gap-1">
                  <button
                    @click="loadArea(area)"
                    class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Load
                  </button>
                  <button
                    @click="removeArea(index)"
                    class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { LMap, LTileLayer, LPolygon, LPolyline, LCircleMarker, LTooltip } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

// Types
interface LeafletMouseEvent {
  latlng: {
    lat: number;
    lng: number;
  }
}

interface Point {
  lat: number;
  lng: number;
}

type PolygonPoints = [number, number][]

interface Polygon {
  name: string;
  color: string;
  points: PolygonPoints;
}

interface Area extends Polygon {
  holes: PolygonPoints[];
}

// Mode type
type Mode = 'polygon' | 'hole'

// Refs
const isMounted = ref(false)
const mode = ref<Mode>('polygon')
const areaName = ref('floodZone')
const areaColor = ref('#1E6DFF')
const generatedCode = ref('')
const savedAreas = ref<Area[]>([])

// Current polygon being drawn
const currentPolygon = ref<Polygon>({
  name: '',
  color: '#1E6DFF',
  points: []
})

// Current hole being drawn
const currentHole = ref<Polygon>({
  name: '',
  color: '#FF4E4E',
  points: []
})

// Saved holes
const holes = ref<PolygonPoints[]>([])

// Computed properties
const currentPoints = computed((): PolygonPoints => {
  return mode.value === 'polygon' ? currentPolygon.value.points : currentHole.value.points
})

const isMainPolygonClosed = computed((): boolean => {
  const points = currentPolygon.value.points
  if (points.length < 3) return false
  
  const first = points[0]
  const last = points[points.length - 1]
  
  const latDiff = (first[0] as number) - (last[0] as number)
  const lngDiff = (first[1] as number) - (last[1] as number)
  const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff)
  
  return distance < 0.001
})

const isHoleClosed = computed((): boolean => {
  const points = currentHole.value.points
  if (points.length < 3) return false
  
  const first = points[0]
  const last = points[points.length - 1]
  
  const latDiff = (first[0] as number) - (last[0] as number)
  const lngDiff = (first[1] as number) - (last[1] as number)
  const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff)
  
  return distance < 0.001
})

const isCurrentPolygonClosed = computed((): boolean => {
  return mode.value === 'polygon' ? isMainPolygonClosed.value : isHoleClosed.value
})

// Check if a point is inside the main polygon
const isPointInPolygon = (point: [number, number]): boolean => {
  const points = currentPolygon.value.points
  if (points.length < 3) return false
  
  let inside = false
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i][0], yi = points[i][1]
    const xj = points[j][0], yj = points[j][1]
    
    const intersect = ((yi > point[1]) !== (yj > point[1])) &&
      (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi)
    if (intersect) inside = !inside
  }
  
  return inside
}

// Methods
const setMode = (newMode: Mode): void => {
  if (newMode === 'hole' && currentPolygon.value.points.length < 3) {
    alert('Draw main polygon first')
    return
  }
  mode.value = newMode
}

const handleMapClick = (event: LeafletMouseEvent): void => {
  const { lat, lng } = event.latlng
  const newPoint: [number, number] = [lat, lng]
  
  if (mode.value === 'polygon') {
    // Check if clicking near first point to close polygon
    if (currentPolygon.value.points.length >= 3) {
      const firstPoint = currentPolygon.value.points[0]
      const latDiff = (firstPoint[0] as number) - lat
      const lngDiff = (firstPoint[1] as number) - lng
      const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff)
      
      if (distance < 0.001) {
        const lastPoint = currentPolygon.value.points[currentPolygon.value.points.length - 1]
        if (lastPoint[0] !== firstPoint[0] || lastPoint[1] !== firstPoint[1]) {
          currentPolygon.value.points = [
            ...currentPolygon.value.points,
            [firstPoint[0] as number, firstPoint[1] as number]
          ]
        }
        return
      }
    }
    
    // Add new point
    currentPolygon.value.points = [...currentPolygon.value.points, newPoint]
  } 
  else if (mode.value === 'hole') {
    // Check if point is inside main polygon
    if (!isPointInPolygon(newPoint)) {
      alert('Hole points must be inside the main polygon')
      return
    }
    
    // Check if clicking near first point to close hole
    if (currentHole.value.points.length >= 3) {
      const firstPoint = currentHole.value.points[0]
      const latDiff = (firstPoint[0] as number) - lat
      const lngDiff = (firstPoint[1] as number) - lng
      const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff)
      
      if (distance < 0.001) {
        const lastPoint = currentHole.value.points[currentHole.value.points.length - 1]
        if (lastPoint[0] !== firstPoint[0] || lastPoint[1] !== firstPoint[1]) {
          currentHole.value.points = [
            ...currentHole.value.points,
            [firstPoint[0] as number, firstPoint[1] as number]
          ]
        }
        return
      }
    }
    
    // Add new point
    currentHole.value.points = [...currentHole.value.points, newPoint]
  }
}

const completeHole = (): void => {
  if (currentHole.value.points.length >= 3 && isHoleClosed.value) {
    holes.value.push([...currentHole.value.points])
    currentHole.value.points = []
    mode.value = 'polygon'
  }
}

const clearPolygon = (): void => {
  currentPolygon.value.points = []
  currentHole.value.points = []
  holes.value = []
  generatedCode.value = ''
  mode.value = 'polygon'
}

const undoLastPoint = (): void => {
  if (mode.value === 'polygon') {
    if (currentPolygon.value.points.length > 0) {
      currentPolygon.value.points = currentPolygon.value.points.slice(0, -1)
    }
  } else {
    if (currentHole.value.points.length > 0) {
      currentHole.value.points = currentHole.value.points.slice(0, -1)
    }
  }
}

const exportArea = (): void => {
  if (!isMainPolygonClosed.value || !areaName.value.trim()) return
  
  // Clean points to 6 decimal places
  const cleanMainPoints = currentPolygon.value.points.map(([lat, lng]): [number, number] => [
    Number(lat.toFixed(6)),
    Number(lng.toFixed(6))
  ])
  
  const cleanHoles = holes.value.map(hole => 
    hole.map(([lat, lng]): [number, number] => [
      Number(lat.toFixed(6)),
      Number(lng.toFixed(6))
    ])
  )
  
  // Generate code for map.vue
  const holesCode = cleanHoles.length > 0 
    ? `\n    holes: ${JSON.stringify(cleanHoles, null, 2).replace(/\n/g, '\n    ')}` 
    : ''
  
  const code = `// Add to map.vue - ${areaName.value}
const floodAreas = ref([
  {
    name: '${areaName.value}',
    color: '${areaColor.value}',
    points: ${JSON.stringify(cleanMainPoints, null, 2).replace(/\n/g, '\n    ')}${holesCode}
  }
])`
  
  generatedCode.value = code
  
  // Save to localStorage
  const newArea: Area = {
    name: areaName.value,
    color: areaColor.value,
    points: cleanMainPoints,
    holes: cleanHoles
  }
  
  savedAreas.value = [...savedAreas.value, newArea]
  
  if (import.meta.client) {
    localStorage.setItem('drawer-areas', JSON.stringify(savedAreas.value))
  }
}

const selectText = (event: Event): void => {
  const target = event.target as HTMLTextAreaElement
  target.select()
}

const copyToClipboard = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(generatedCode.value)
    alert('Copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const loadArea = (area: Area): void => {
  areaName.value = area.name
  areaColor.value = area.color
  currentPolygon.value.points = area.points
  holes.value = area.holes || []
  currentHole.value.points = []
  mode.value = 'polygon'
}

const removeArea = (index: number): void => {
  savedAreas.value = savedAreas.value.filter((_, i) => i !== index)
  
  if (import.meta.client) {
    localStorage.setItem('drawer-areas', JSON.stringify(savedAreas.value))
  }
}

// Load saved areas from localStorage on mount
onMounted(() => {
  isMounted.value = true
  
  if (import.meta.client) {
    try {
      const saved = localStorage.getItem('drawer-areas')
      if (saved) {
        savedAreas.value = JSON.parse(saved)
      }
    } catch (error) {
      console.error('Failed to load saved areas:', error)
    }
  }
})
</script>