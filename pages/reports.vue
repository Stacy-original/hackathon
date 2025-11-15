<template>
  <div class="py-8">
    <div class="container mx-auto px-4 max-w-4xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">
          {{ t('waterConditionReports') }}
        </h1>
        <p class="text-xl text-[#5A6A85] dark:text-[#A9B4C6] max-w-2xl mx-auto">
          {{ t('helpUsMonitor') }}
        </p>
      </div>

      <!-- Report Form -->
      <div class="bg-white dark:bg-[#212832] rounded-2xl p-8 shadow-sm border border-[#E2E8F0] dark:border-[#313B47] mb-12">
        <h2 class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-6">
          {{ t('submitNewReport') }}
        </h2>

        <form @submit.prevent="submitReport" class="space-y-6">
          <!-- Report Type -->
          <div>
            <label class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-3">
              {{ t('reportType') }} *
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                type="button"
                v-for="type in reportTypes"
                :key="type.value"
                @click="formData.type = type.value"
                :class="[
                  'py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200 ease-in-out',
                  formData.type === type.value
                    ? 'bg-[#1E6DFF] text-white border-[#1E6DFF] dark:bg-[#6CA8FF] dark:border-[#6CA8FF]'
                    : 'bg-white dark:bg-[#1A1F27] text-[#5A6A85] dark:text-[#A9B4C6] border-[#E2E8F0] dark:border-[#313B47] hover:border-[#1E6DFF] dark:hover:border-[#6CA8FF]'
                ]"
              >
                {{ t(type.value) }}
              </button>
            </div>
          </div>

          <!-- Location -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="location" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
                {{ t('locationName') }} *
              </label>
              <input
                id="location"
                v-model="formData.location"
                type="text"
                required
                class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200"
                :placeholder="t('locationName')"
              >
            </div>

            <div>
              <label for="coordinates" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
                {{ t('coordinatesOptional') }}
              </label>
              <input
                id="coordinates"
                v-model="formData.coordinates"
                type="text"
                class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200"
                :placeholder="t('coordinatesOptional')"
              >
            </div>
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
              {{ t('description') }} *
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              required
              rows="4"
              class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200 resize-none"
              :placeholder="t('description')"
            ></textarea>
          </div>

          <!-- Severity -->
          <div>
            <label class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-3">
              {{ t('severityLevel') }}
            </label>
            <div class="grid grid-cols-4 gap-3">
              <button
                type="button"
                v-for="severity in severityLevels"
                :key="severity.value"
                @click="formData.severity = severity.value"
                :class="[
                  'py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200',
                  formData.severity === severity.value
                    ? severity.bgColor + ' ' + severity.textColor + ' border-current'
                    : 'bg-white dark:bg-[#1A1F27] text-[#5A6A85] dark:text-[#A9B4C6] border-[#E2E8F0] dark:border-[#313B47] hover:border-current'
                ]"
              >
                {{ t(severity.value) }}
              </button>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="email" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
                {{ t('emailOptional') }}
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200"
                :placeholder="t('emailOptional')"
              >
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
                {{ t('phoneOptional') }}
              </label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200"
                :placeholder="t('phoneOptional')"
              >
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end pt-4">
            <button
              type="submit"
              :disabled="isSubmitting"
              :class="[
                'px-8 py-3 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg font-medium transition-all duration-200 hover:scale-105',
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              ]"
            >
              {{ isSubmitting ? t('submitting') : t('submitReport') }}
            </button>
          </div>
        </form>
      </div>

      <!-- Success/Error Messages -->
      <div v-if="message" :class="[
        'fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300',
        message.type === 'success' ? 'bg-[#2ECC71] text-white' : 'bg-[#FF4E4E] text-white'
      ]">
        {{ message.text }}
      </div>

      <!-- Recent Reports -->
      <div class="bg-white dark:bg-[#212832] rounded-2xl p-8 shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF]">
            {{ t('recentCommunityReports') }}
          </h2>
          <button 
            @click="fetchReports"
            class="px-4 py-2 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg text-sm font-medium transition-colors"
          >
            {{ t('refresh') }}
          </button>
        </div>
        
        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6DFF]"></div>
          <p class="text-[#5A6A85] dark:text-[#A9B4C6] mt-2">{{ t('loadingReports') }}</p>
        </div>

        <div v-else-if="recentReports.length === 0" class="text-center py-8">
          <p class="text-[#5A6A85] dark:text-[#A9B4C6]">{{ t('noReportsYet') }}</p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="report in recentReports"
            :key="report.id"
            class="p-4 border border-[#E2E8F0] dark:border-[#313B47] rounded-lg hover:shadow-md transition-all duration-200 bg-white dark:bg-[#212832]"
          >
            <div class="flex justify-between items-start mb-2">
              <div class="flex items-center gap-3 flex-wrap">
                <span 
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-medium',
                    getSeverityColor(report.severity)
                  ]"
                >
                  {{ t(report.severity) }}
                </span>
                <span class="text-sm text-[#1E6DFF] dark:text-[#6CA8FF] font-medium capitalize">
                  {{ t(report.type) }}
                </span>
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  getStatusColor(report.status)
                ]">
                  {{ t(report.status) }}
                </span>
              </div>
              <span class="text-xs text-[#5A6A85] dark:text-[#A9B4C6] whitespace-nowrap">
                {{ formatDate(report.createdAt) }}
              </span>
            </div>
            <h3 class="font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-1">
              {{ report.location }}
            </h3>
            <p class="text-[#5A6A85] dark:text-[#A9B4C6] text-sm mb-2">
              {{ report.description }}
            </p>
            <div v-if="report.coordinates" class="text-xs text-[#5A6A85] dark:text-[#A9B4C6]">
              {{ t('coordinates') }}: {{ report.coordinates }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useTranslations();

// ✅ UPDATE THIS URL WITH YOUR RENDER URL
const API_BASE = 'https://skogeohydro-backend.onrender.com';

// Define types for our data
interface Report {
  id: string;
  type: string;
  location: string;
  coordinates: string;
  description: string;
  severity: string;
  status: string;
  createdAt: string;
}

interface FormData {
  type: string;
  location: string;
  coordinates: string;
  description: string;
  severity: string;
  email: string;
  phone: string;
}

interface Message {
  text: string;
  type: 'success' | 'error';
}

// Reactive data
const formData = ref<FormData>({
  type: 'pollution',
  location: '',
  coordinates: '',
  description: '',
  severity: 'medium',
  email: '',
  phone: ''
});

const recentReports = ref<Report[]>([]);
const loading = ref<boolean>(false);
const isSubmitting = ref<boolean>(false);
const message = ref<Message | null>(null);

// Report types
const reportTypes = [
  { value: 'pollution', label: 'Pollution' },
  { value: 'algae', label: 'Algae Bloom' },
  { value: 'odor', label: 'Unusual Odor' },
  { value: 'color', label: 'Color Change' },
  { value: 'flooding', label: 'Flooding' },
  { value: 'wildlife', label: 'Wildlife Impact' },
  { value: 'other', label: 'Other' }
];

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
];

// Show message
const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
  message.value = { text, type };
  setTimeout(() => {
    message.value = null;
  }, 5000);
};

// Submit report to backend
const submitReport = async () => {
  if (!formData.value.location || !formData.value.description) {
    showMessage('Please fill in all required fields', 'error');
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await fetch(`${API_BASE}/api/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    });

    if (response.ok) {
      showMessage('Report submitted successfully!');
      // Reset form
      formData.value = {
        type: 'pollution',
        location: '',
        coordinates: '',
        description: '',
        severity: 'medium',
        email: '',
        phone: ''
      };
      // Refresh reports list
      await fetchReports();
    } else {
      const error = await response.json();
      showMessage(error.error || 'Failed to submit report', 'error');
    }
  } catch (error) {
    showMessage('Network error. Please try again.', 'error');
  } finally {
    isSubmitting.value = false;
  }
};

// Fetch reports from backend
const fetchReports = async () => {
  loading.value = true;
  try {
    const response = await fetch(`${API_BASE}/api/reports`);
    if (response.ok) {
      const reports = await response.json();
      // Show only the 10 most recent reports
      recentReports.value = reports.slice(0, 10);
    } else {
      showMessage('Failed to load reports', 'error');
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

const getSeverityColor = (severity: string) => {
  const severityMap: Record<string, string> = {
    low: 'bg-[#2ECC71] dark:bg-[#38E39A] text-white',
    medium: 'bg-[#FFCB2F] dark:bg-[#FFDD57] text-[#1A1A1A]',
    high: 'bg-[#FF4E4E] dark:bg-[#FF6B6B] text-white',
    critical: 'bg-[#DC2626] dark:bg-[#EF4444] text-white'
  };
  return severityMap[severity] || severityMap.medium;
};

const getStatusColor = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: 'bg-[#FFCB2F] dark:bg-[#FFDD57] text-[#1A1A1A]',
    reviewed: 'bg-[#1E6DFF] dark:bg-[#6CA8FF] text-white',
    resolved: 'bg-[#2ECC71] dark:bg-[#38E39A] text-white'
  };
  return statusMap[status] || statusMap.pending;
};

// Fetch reports when component mounts
onMounted(() => {
  fetchReports();
});
</script>