<template>
  <div class="min-h-screen bg-white dark:bg-[#0E1117] transition-colors duration-300 py-8">
    <div class="container mx-auto px-4 max-w-4xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-primary dark:text-[#F1F5FF] mb-4">
          Water Condition Reports
        </h1>
        <p class="text-xl text-secondary dark:text-[#A9B4C6] max-w-2xl mx-auto">
          Help us monitor water quality by reporting unusual conditions, pollution, or changes in your local water bodies
        </p>
      </div>

      <!-- Report Form -->
      <div class="bg-[#FFFFFF] dark:bg-[#212832] rounded-2xl p-8 shadow-md border border-[#E2E8F0] dark:border-[#313B47] mb-12 transition-[transform,shadow,opacity,border] duration-300 ease-in-out">
        <h2 class="text-2xl font-bold text-primary dark:text-[#F1F5FF] mb-6">
          Submit a New Report
        </h2>

        <form @submit.prevent="submitReport" class="space-y-6">
          <!-- Report Type -->
          <div>
            <label class="block text-sm font-medium text-primary dark:text-[#F1F5FF] mb-3">
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
                    : 'bg-[#F5F8FF] dark:bg-[#1A1F27] text-secondary dark:text-[#A9B4C6] border-[#E2E8F0] dark:border-[#313B47] hover:border-[#1E6DFF] dark:hover:border-[#6CA8FF]'
                ]"
              >
                {{ type.label }}
              </button>
            </div>
          </div>

          <!-- Location -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="location" class="block text-sm font-medium text-primary dark:text-[#F1F5FF] mb-2">
                Location Name *
              </label>
              <input
                id="location"
                v-model="formData.location"
                type="text"
                required
                class="w-full px-4 py-3 bg-[#F5F8FF] dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-primary dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-[transform,shadow,opacity,border] duration-200 ease-in-out"
                placeholder="e.g., Lake Pobeda, Ishim River"
              >
            </div>

            <div>
              <label for="coordinates" class="block text-sm font-medium text-primary dark:text-[#F1F5FF] mb-2">
                Coordinates (Optional)
              </label>
              <input
                id="coordinates"
                v-model="formData.coordinates"
                type="text"
                class="w-full px-4 py-3 bg-[#F5F8FF] dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-primary dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-[transform,shadow,opacity,border] duration-200 ease-in-out"
                placeholder="e.g., 54.872, 69.143"
              >
            </div>
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-primary dark:text-[#F1F5FF] mb-2">
              Description *
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              required
              rows="4"
              class="w-full px-4 py-3 bg-[#F5F8FF] dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-primary dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-[transform,shadow,opacity,border] duration-200 ease-in-out resize-none"
              placeholder="Please describe what you observed in detail..."
            ></textarea>
          </div>

          <!-- Severity -->
          <div>
            <label class="block text-sm font-medium text-primary dark:text-[#F1F5FF] mb-3">
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
                    : 'bg-[#F5F8FF] dark:bg-[#1A1F27] text-secondary dark:text-[#A9B4C6] border-[#E2E8F0] dark:border-[#313B47] hover:border-current'
                ]"
              >
                {{ severity.label }}
              </button>
            </div>
          </div>

          <!-- Photo Upload -->
          <div>
            <label class="block text-sm font-medium text-primary dark:text-[#F1F5FF] mb-2">
              Upload Photos (Optional)
            </label>
            <div class="flex items-center justify-center w-full">
              <label class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#E2E8F0] dark:border-[#313B47] rounded-lg cursor-pointer hover:border-[#1E6DFF] dark:hover:border-[#6CA8FF] transition-[transform,shadow,opacity,border] duration-200 ease-in-out">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-[#5A6A85] dark:text-[#A9B4C6]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p class="mb-2 text-sm text-[#5A6A85] dark:text-[#A9B4C6]"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                  <p class="text-xs text-[#5A6A85] dark:text-[#A9B4C6]">PNG, JPG, GIF (MAX. 5MB)</p>
                </div>
                <input type="file" class="hidden" multiple accept="image/*" @change="handleFileUpload">
              </label>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="email" class="block text-sm font-medium text-primary dark:text-[#F1F5FF] mb-2">
                Email (Optional)
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="w-full px-4 py-3 bg-[#F5F8FF] dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-primary dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-[transform,shadow,opacity,border] duration-200 ease-in-out"
                placeholder="your@email.com"
              >
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-primary dark:text-[#F1F5FF] mb-2">
                Phone (Optional)
              </label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                class="w-full px-4 py-3 bg-[#F5F8FF] dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-primary dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-[transform,shadow,opacity,border] duration-200 ease-in-out"
                placeholder="+7 (XXX) XXX-XXXX"
              >
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end pt-4">
            <button
              type="submit"
              :disabled="isSubmitting"
              :class="[
                'px-8 py-3 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg font-medium transition-[transform,shadow,opacity,border] duration-200 ease-in-out flex items-center gap-2',
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              ]"
            >
              <span v-if="isSubmitting" class="animate-spin">⟳</span>
              {{ isSubmitting ? 'Submitting...' : 'Submit Report' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Recent Reports -->
      <div class="bg-[#FFFFFF] dark:bg-[#212832] rounded-2xl p-8 shadow-md border border-[#E2E8F0] dark:border-[#313B47] transition-[transform,shadow,opacity,border] duration-300 ease-in-out">
        <h2 class="text-2xl font-bold text-primary dark:text-[#F1F5FF] mb-6">
          Recent Community Reports
        </h2>

        <div class="space-y-4">
          <div
            v-for="report in recentReports"
            :key="report.id"
            class="p-4 border border-[#E2E8F0] dark:border-[#313B47] rounded-lg hover:shadow-md transition-[transform,shadow,opacity,border] duration-200 ease-in-out"
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
              <span class="text-xs text-secondary dark:text-[#A9B4C6]">
                {{ report.date }}
              </span>
            </div>
            <h3 class="font-semibold text-primary dark:text-[#F1F5FF] mb-1">
              {{ report.location }}
            </h3>
            <p class="text-secondary dark:text-[#A9B4C6] text-sm">
              {{ report.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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

const isSubmitting = ref(false)

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

// Methods
const submitReport = async () => {
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Add to recent reports (in a real app, this would go to a backend)
  recentReports.value.unshift({
    id: Date.now(),
    type: formData.value.type.charAt(0).toUpperCase() + formData.value.type.slice(1),
    location: formData.value.location,
    description: formData.value.description,
    severity: formData.value.severity,
    date: 'Just now'
  })
  
  // Reset form
  formData.value = {
    type: 'pollution',
    location: '',
    coordinates: '',
    description: '',
    severity: 'medium',
    email: '',
    phone: ''
  }
  
  isSubmitting.value = false
  
  // Show success message (you could use a toast library)
  alert('Report submitted successfully! Thank you for your contribution.')
}

const handleFileUpload = (event) => {
  const files = event.target.files
  // Handle file upload logic here
  console.log('Files uploaded:', files)
}

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