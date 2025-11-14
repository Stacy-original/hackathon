<template>
  <div class="py-8">
    <div class="container mx-auto px-4 max-w-4xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">
          Water Condition Reports
        </h1>
        <p class="text-xl text-[#5A6A85] dark:text-[#A9B4C6] max-w-2xl mx-auto">
          Help us monitor water quality by reporting unusual conditions, pollution, or changes in your local water bodies
        </p>
      </div>

      <!-- Report Form -->
      <div class="bg-white dark:bg-[#212832] rounded-2xl p-8 shadow-sm border border-[#E2E8F0] dark:border-[#313B47] mb-12">
        <h2 class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-6">
          Submit a New Report
        </h2>

        <!-- Netlify Form - Using traditional form submission -->
        <form 
          name="water-report" 
          method="POST"
          netlify
          netlify-honeypot="bot-field"
          action="/success"
          class="space-y-6"
        >
          <!-- Hidden Netlify Fields -->
          <input type="hidden" name="form-name" value="water-report" />
          <p class="hidden">
            <label>Don't fill this out if you're human: <input name="bot-field" /></label>
          </p>

          <!-- Report Type -->
          <div>
            <label class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-3">
              Report Type *
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                type="button"
                v-for="type in reportTypes"
                :key="type.value"
                @click="formData.type = type.value"
                :class="[
                  'py-3 px-4 rounded-lg border text-sm font-medium transition-[transform,shadow,opacity,border] duration-200 ease-in-out',
                  formData.type === type.value
                    ? 'bg-[#1E6DFF] text-white border-[#1E6DFF] dark:bg-[#6CA8FF] dark:border-[#6CA8FF]'
                    : 'bg-white dark:bg-[#1A1F27] text-[#5A6A85] dark:text-[#A9B4C6] border-[#E2E8F0] dark:border-[#313B47] hover:border-[#1E6DFF] dark:hover:border-[#6CA8FF]'
                ]"
              >
                {{ type.label }}
              </button>
            </div>
            <input type="hidden" name="report-type" :value="formData.type" />
          </div>

          <!-- Location -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="location" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
                Location Name *
              </label>
              <input
                id="location"
                v-model="formData.location"
                name="location"
                type="text"
                required
                class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-[transform,shadow,opacity,border] duration-200 ease-in-out"
                placeholder="e.g., Lake Pobeda, Ishim River"
              >
            </div>

            <div>
              <label for="coordinates" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
                Coordinates (Optional)
              </label>
              <input
                id="coordinates"
                v-model="formData.coordinates"
                name="coordinates"
                type="text"
                class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-[transform,shadow,opacity,border] duration-200 ease-in-out"
                placeholder="e.g., 54.872, 69.143"
              >
            </div>
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
              Description *
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              name="description"
              required
              rows="4"
              class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-[transform,shadow,opacity,border] duration-200 ease-in-out resize-none"
              placeholder="Please describe what you observed in detail..."
            ></textarea>
          </div>

          <!-- Severity -->
          <div>
            <label class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-3">
              Severity Level
            </label>
            <div class="grid grid-cols-4 gap-3">
              <button
                type="button"
                v-for="severity in severityLevels"
                :key="severity.value"
                @click="formData.severity = severity.value"
                :class="[
                  'py-3 px-4 rounded-lg border text-sm font-medium transition-[transform,shadow,opacity,border] duration-200 ease-in-out',
                  formData.severity === severity.value
                    ? severity.bgColor + ' ' + severity.textColor + ' border-current'
                    : 'bg-white dark:bg-[#1A1F27] text-[#5A6A85] dark:text-[#A9B4C6] border-[#E2E8F0] dark:border-[#313B47] hover:border-current'
                ]"
              >
                {{ severity.label }}
              </button>
            </div>
            <input type="hidden" name="severity" :value="formData.severity" />
          </div>

          <!-- Contact Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="email" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
                Email (Optional)
              </label>
              <input
                id="email"
                v-model="formData.email"
                name="email"
                type="email"
                class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-[transform,shadow,opacity,border] duration-200 ease-in-out"
                placeholder="your@email.com"
              >
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
                Phone (Optional)
              </label>
              <input
                id="phone"
                v-model="formData.phone"
                name="phone"
                type="tel"
                class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-[transform,shadow,opacity,border] duration-200 ease-in-out"
                placeholder="+7 (XXX) XXX-XXXX"
              >
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end pt-4">
            <button
              type="submit"
              :class="[
                'px-8 py-3 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg font-medium transition-[transform,shadow,opacity,border] duration-200 ease-in-out hover:scale-105'
              ]"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>

      <!-- Success Message (shown via query param) -->
      <div v-if="$route.query.success" class="fixed top-4 right-4 bg-[#2ECC71] text-white p-4 rounded-lg shadow-lg z-50 transition-all duration-300">
        ✅ Report submitted successfully!
      </div>

      <!-- Recent Reports -->
      <div class="bg-white dark:bg-[#212832] rounded-2xl p-8 shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
        <h2 class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-6">
          Recent Community Reports
        </h2>
        <div class="space-y-4">
          <div
            v-for="report in recentReports"
            :key="report.id"
            class="p-4 border border-[#E2E8F0] dark:border-[#313B47] rounded-lg hover:shadow-md transition-[transform,shadow,opacity,border] duration-200 ease-in-out bg-white dark:bg-[#212832]"
          >
            <div class="flex justify-between items-start mb-2">
              <div class="flex items-center gap-3">
                <span 
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-medium',
                    getSeverityColor(report.severity)
                  ]"
                >
                  {{ getSeverityLabel(report.severity) }}
                </span>
                <span class="text-sm text-[#1E6DFF] dark:text-[#6CA8FF] font-medium">
                  {{ report.type }}
                </span>
              </div>
              <span class="text-xs text-[#5A6A85] dark:text-[#A9B4C6]">
                {{ report.date }}
              </span>
            </div>
            <h3 class="font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-1">
              {{ report.location }}
            </h3>
            <p class="text-[#5A6A85] dark:text-[#A9B4C6] text-sm">
              {{ report.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import route for success message
const route = useRoute()

// Reactive form data
const formData = ref({
  type: 'pollution',
  location: '',
  coordinates: '',
  description: '',
  severity: 'medium',
  email: '',
  phone: ''
})

// Report types
const reportTypes = [
  { value: 'pollution', label: 'Pollution' },
  { value: 'algae', label: 'Algae Bloom' },
  { value: 'odor', label: 'Unusual Odor' },
  { value: 'color', label: 'Color Change' }
]

// Severity levels with colors
const severityLevels = [
  { 
    value: 'low', 
    label: 'Low', 
    bgColor: 'bg-[#2ECC71] dark:bg-[#38E39A]',
    textColor: 'text-white'
  },
  { 
    value: 'medium', 
    label: 'Medium', 
    bgColor: 'bg-[#FFCB2F] dark:bg-[#FFDD57]',
    textColor: 'text-[#1A1A1A]'
  },
  { 
    value: 'high', 
    label: 'High', 
    bgColor: 'bg-[#FF4E4E] dark:bg-[#FF6B6B]',
    textColor: 'text-white'
  },
  { 
    value: 'critical', 
    label: 'Critical', 
    bgColor: 'bg-[#DC2626] dark:bg-[#EF4444]',
    textColor: 'text-white'
  }
]

// Sample recent reports data
const recentReports = ref([
  {
    id: 1,
    type: 'Pollution',
    location: 'Ishim River - City Center',
    description: 'Noticed oil slick and floating debris near the bridge. Strong chemical smell present.',
    severity: 'high',
    date: '2 hours ago'
  },
  {
    id: 2,
    type: 'Algae Bloom',
    location: 'Lake Pobeda',
    description: 'Large green algae accumulation on the eastern shore. Water appears murky.',
    severity: 'medium',
    date: '1 day ago'
  },
  {
    id: 3,
    type: 'Color Change',
    location: 'Small pond near Park',
    description: 'Water has turned brownish-red color. No unusual odor detected.',
    severity: 'low',
    date: '3 days ago'
  }
])

const getSeverityColor = (severity) => {
  const severityMap = {
    low: 'bg-[#2ECC71] dark:bg-[#38E39A] text-white',
    medium: 'bg-[#FFCB2F] dark:bg-[#FFDD57] text-[#1A1A1A]',
    high: 'bg-[#FF4E4E] dark:bg-[#FF6B6B] text-white',
    critical: 'bg-[#DC2626] dark:bg-[#EF4444] text-white'
  }
  return severityMap[severity] || severityMap.medium
}

const getSeverityLabel = (severity) => {
  const labelMap = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical'
  }
  return labelMap[severity] || 'Medium'
}
</script>