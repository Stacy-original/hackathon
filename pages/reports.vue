<template>
  <div class="py-8">
    <div class="container mx-auto px-4 max-w-4xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">
          {{ $t('waterConditionReports') }}
        </h1>
        <p class="text-xl text-[#5A6A85] dark:text-[#A9B4C6] max-w-2xl mx-auto">
          {{ $t('helpUsMonitor') }}
        </p>
      </div>

      <!-- Report Form -->
      <div class="bg-white dark:bg-[#212832] rounded-2xl p-8 shadow-sm border border-[#E2E8F0] dark:border-[#313B47] mb-12">
        <h2 class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-6">
          {{ $t('submitNewReport') }}
        </h2>

        <form @submit.prevent="submitReport" class="space-y-6">
          <!-- Report Type -->
          <div>
            <label class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-3">
              {{ $t('reportType') }} *
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
                {{ $t(type.value) }}
              </button>
            </div>
          </div>

          <!-- Location -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="location" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
                {{ $t('locationName') }} *
              </label>
              <input
                id="location"
                v-model="formData.location"
                type="text"
                required
                class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200"
                :placeholder="$t('locationName')"
              >
            </div>

            <div>
              <label for="coordinates" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
                {{ $t('coordinatesOptional') }}
              </label>
              <input
                id="coordinates"
                v-model="formData.coordinates"
                type="text"
                class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200"
                :placeholder="$t('coordinatesOptional')"
              >
            </div>
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
              {{ $t('description') }} *
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              required
              rows="4"
              class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200 resize-none"
              :placeholder="$t('description')"
            ></textarea>
          </div>

          <!-- Severity -->
          <div>
            <label class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-3">
              {{ $t('severityLevel') }}
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                {{ $t(severity.value) }}
              </button>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="email" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
                {{ $t('emailOptional') }}
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200"
                :placeholder="$t('emailOptional')"
              >
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
                {{ $t('phoneOptional') }}
              </label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200"
                :placeholder="$t('phoneOptional')"
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
              {{ isSubmitting ? $t('submitting') : $t('submitReport') }}
            </button>
          </div>
        </form>
      </div>

      <!-- Success/Error Messages -->
      <div v-if="message" :class="[
        'fixed top-24 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300',
        message.type === 'success' ? 'bg-[#2ECC71] text-white' : 'bg-[#FF4E4E] text-white'
      ]">
        {{ message.text }}
      </div>

      <!-- Recent Reports -->
      <div class="bg-white dark:bg-[#212832] rounded-2xl p-8 shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF]">
            {{ $t('recentCommunityReports') }}
          </h2>
          <button 
            @click="fetchReports"
            class="px-4 py-2 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg text-sm font-medium transition-colors"
          >
            {{ $t('refresh') }}
          </button>
        </div>
        
        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6DFF]"></div>
          <p class="text-[#5A6A85] dark:text-[#A9B4C6] mt-2">{{ $t('loadingReports') }}</p>
        </div>

        <div v-else-if="recentReports.length === 0" class="text-center py-8">
          <p class="text-[#5A6A85] dark:text-[#A9B4C6]">{{ $t('noReportsYet') }}</p>
        </div>

        <div v-else class="space-y-6">
          <div
            v-for="report in recentReports"
            :key="report._id"
            class="p-6 border border-[#E2E8F0] dark:border-[#313B47] rounded-lg hover:shadow-md transition-all duration-200 bg-white dark:bg-[#212832]"
          >
            <!-- Report Header -->
            <div class="flex justify-between items-start mb-3">
              <div class="flex items-center gap-3 flex-wrap">
                <span 
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-medium',
                    getSeverityColor(report.severity)
                  ]"
                >
                  {{ $t(report.severity) }}
                </span>
                <span class="text-sm text-[#1E6DFF] dark:text-[#6CA8FF] font-medium capitalize">
                  {{ $t(report.type) }}
                </span>
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  getStatusColor(report.status)
                ]">
                  {{ $t(report.status) }}
                </span>
              </div>
              <span class="text-xs text-[#5A6A85] dark:text-[#A9B4C6] whitespace-nowrap">
                {{ formatDate(report.createdAt) }}
              </span>
            </div>
            
            <!-- Report Content -->
            <h3 class="font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-2 text-lg">
              {{ report.location }}
            </h3>
            <p class="text-[#5A6A85] dark:text-[#A9B4C6] text-sm mb-3">
              {{ report.description }}
            </p>
            
            <div v-if="report.coordinates" class="text-xs text-[#5A6A85] dark:text-[#A9B4C6] mb-4">
              {{ $t('coordinates') }}: {{ report.coordinates }}
            </div>

            <!-- Author Information -->
            <div class="flex items-center justify-between mb-4">
              <div class="text-xs text-[#5A6A85] dark:text-[#A9B4C6]">
                <span v-if="report.userName">{{ $t('by') }}: {{ report.userName }}</span>
                <span v-else>{{ $t('anonymous') }}</span>
              </div>
            </div>

            <!-- Likes, Dislikes, and Comments Section -->
            <div class="flex items-center justify-between border-t border-[#E2E8F0] dark:border-[#313B47] pt-4">
              <!-- Reactions -->
              <div class="flex items-center gap-4">
                <!-- Like Button -->
                <button 
                  @click="toggleReaction(report._id, 'like')"
                  :class="[
                    'flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200',
                    report.userReaction === 'like' 
                      ? 'bg-[#1E6DFF] text-white' 
                      : 'bg-[#F7F9FC] dark:bg-[#1A1F27] text-[#5A6A85] dark:text-[#A9B4C6] hover:bg-[#E8F0FE] dark:hover:bg-[#252E3A]'
                  ]"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                  </svg>
                  <span class="text-sm font-medium">{{ report.likes || 0 }}</span>
                </button>

                <!-- Dislike Button -->
                <button 
                  @click="toggleReaction(report._id, 'dislike')"
                  :class="[
                    'flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200',
                    report.userReaction === 'dislike' 
                      ? 'bg-[#FF4E4E] text-white' 
                      : 'bg-[#F7F9FC] dark:bg-[#1A1F27] text-[#5A6A85] dark:text-[#A9B4C6] hover:bg-[#FEE8E8] dark:hover:bg-[#252E3A]'
                  ]"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"/>
                  </svg>
                  <span class="text-sm font-medium">{{ report.dislikes || 0 }}</span>
                </button>

                <!-- Comment Button -->
                <button 
                  @click="toggleComments(report._id)"
                  :class="[
                    'flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200',
                    expandedReportId === report._id
                      ? 'bg-[#2ECC71] text-white'
                      : 'bg-[#F7F9FC] dark:bg-[#1A1F27] text-[#5A6A85] dark:text-[#A9B4C6] hover:bg-[#E8F0FE] dark:hover:bg-[#252E3A]'
                  ]"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  <span class="text-sm font-medium">{{ report.commentCount || 0 }}</span>
                </button>
              </div>
            </div>

            <!-- Comments Section -->
            <div v-if="expandedReportId === report._id" class="mt-6 border-t border-[#E2E8F0] dark:border-[#313B47] pt-4">
              <!-- Add Comment Form -->
              <div class="mb-4">
                <textarea
                  v-model="newComments[report._id]"
                  :placeholder="$t('addComment')"
                  rows="2"
                  class="w-full px-3 py-2 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent text-sm resize-none"
                ></textarea>
                <div class="flex justify-end mt-2">
                  <button
                    @click="addComment(report._id)"
                    :disabled="!newComments[report._id]?.trim()"
                    :class="[
                      'px-4 py-2 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg text-sm font-medium transition-all duration-200',
                      !newComments[report._id]?.trim() ? 'opacity-50 cursor-not-allowed' : ''
                    ]"
                  >
                    {{ $t('postComment') }}
                  </button>
                </div>
              </div>

              <!-- Comments List -->
              <div v-if="reportComments[report._id]?.length" class="space-y-3">
                <div
                  v-for="comment in reportComments[report._id]"
                  :key="comment._id"
                  class="p-3 bg-[#F7F9FC] dark:bg-[#1A1F27] rounded-lg"
                >
                  <div class="flex justify-between items-start mb-1">
                    <span class="text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">
                      {{ comment.userName || 'Anonymous' }}
                    </span>
                    <span class="text-xs text-[#5A6A85] dark:text-[#A9B4C6]">
                      {{ formatDate(comment.createdAt) }}
                    </span>
                  </div>
                  <p class="text-sm text-[#5A6A85] dark:text-[#A9B4C6]">
                    {{ comment.content }}
                  </p>
                </div>
              </div>
              <div v-else class="text-center py-4 text-sm text-[#5A6A85] dark:text-[#A9B4C6]">
                {{ $t('noCommentsYet') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const config = useRuntimeConfig()
const API_BASE = config.public.apiBaseUrl
const API_KEY = config.public.defaultApiKey // Using user API key by default

// Auth check (you'll need to implement this based on your auth system)
const { isAuthenticated, checkAuthStatus, user } = useGoogleAuth()

onMounted(async () => {
  await checkAuthStatus()
  if (!isAuthenticated.value) {
    await navigateTo('/login')
  }
})

const { $i18n } = useNuxtApp()

$i18n.mergeLocaleMessage('en', {
  waterConditionReports: 'Water Condition Reports',
  helpUsMonitor: 'Help us monitor water quality by reporting unusual conditions, pollution, or changes in your local water bodies',
  submitNewReport: 'Submit a New Report',
  reportType: 'Report Type',
  locationName: 'Location Name',
  coordinatesOptional: 'Coordinates (Optional)',
  description: 'Description',
  severityLevel: 'Severity Level',
  emailOptional: 'Email (Optional)',
  phoneOptional: 'Phone (Optional)',
  submitReport: 'Submit Report',
  submitting: 'Submitting...',
  recentCommunityReports: 'Recent Community Reports',
  refresh: 'Refresh',
  loadingReports: 'Loading reports...',
  noReportsYet: 'No reports yet. Be the first to submit one!',
  pollution: 'Pollution',
  algaeBloom: 'Algae Bloom',
  unusualOdor: 'Unusual Odor',
  colorChange: 'Color Change',
  flooding: 'Flooding',
  wildlifeImpact: 'Wildlife Impact',
  other: 'Other',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
  pending: 'pending',
  reviewed: 'reviewed',
  resolved: 'resolved',
  coordinates: 'Coordinates',
  by: 'By',
  anonymous: 'Anonymous',
  addComment: 'Add a comment...',
  postComment: 'Post Comment',
  noCommentsYet: 'No comments yet. Be the first to comment!',
  like: 'Like',
  dislike: 'Dislike',
  comment: 'Comment'
})

$i18n.mergeLocaleMessage('ru', {
  waterConditionReports: 'Отчеты о состоянии воды',
  helpUsMonitor: 'Помогите нам контролировать качество воды, сообщая о необычных условиях, загрязнении или изменениях в местных водных объектах',
  submitNewReport: 'Отправить новый отчет',
  reportType: 'Тип отчета',
  locationName: 'Название места',
  coordinatesOptional: 'Координаты (необязательно)',
  description: 'Описание',
  severityLevel: 'Уровень серьезности',
  emailOptional: 'Email (необязательно)',
  phoneOptional: 'Телефон (необязательно)',
  submitReport: 'Отправить отчет',
  submitting: 'Отправка...',
  recentCommunityReports: 'Недавние отчеты сообщества',
  refresh: 'Обновить',
  loadingReports: 'Загрузка отчетов...',
  noReportsYet: 'Пока нет отчетов. Будьте первым!',
  pollution: 'Загрязнение',
  algaeBloom: 'Цветение водорослей',
  unusualOdor: 'Необычный запах',
  colorChange: 'Изменение цвета',
  flooding: 'Наводнение',
  wildlifeImpact: 'Влияние на дикую природу',
  other: 'Другое',
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
  critical: 'Критический',
  pending: 'в ожидании',
  reviewed: 'рассмотрен',
  resolved: 'решено',
  coordinates: 'Координаты',
  by: 'От',
  anonymous: 'Аноним',
  addComment: 'Добавить комментарий...',
  postComment: 'Опубликовать',
  noCommentsYet: 'Пока нет комментариев. Будьте первым!',
  like: 'Нравится',
  dislike: 'Не нравится',
  comment: 'Комментарий'
})

$i18n.mergeLocaleMessage('kk', {
  waterConditionReports: 'Су жағдайы туралы есептер',
  helpUsMonitor: 'Жергілікті су объектілеріндегі ерекше жағдайлар, ластану немесе өзгерістер туралы хабарлау арқылы су сапасын бақылауға көмектесіңіз',
  submitNewReport: 'Жаңа есепті жіберу',
  reportType: 'Есеп түрі',
  locationName: 'Орналасқан жер атауы',
  coordinatesOptional: 'Координаттар (міндетті емес)',
  description: 'Сипаттама',
  severityLevel: 'Маңыздылық деңгейі',
  emailOptional: 'Электрондық пошта (міндетті емес)',
  phoneOptional: 'Телефон (міндетті емес)',
  submitReport: 'Есепті жіберу',
  submitting: 'Жіберілуде...',
  recentCommunityReports: 'Қауымдастықтың соңғы есептері',
  refresh: 'Жаңарту',
  loadingReports: 'Есептер жүктелуде...',
  noReportsYet: 'Әлі есептер жоқ. Бірінші болыңыз!',
  pollution: 'Ластану',
  algaeBloom: 'Балдырлардың гүлденуі',
  unusualOdor: 'Ерекше иіс',
  colorChange: 'Түс өзгеруі',
  flooding: 'Сел',
  wildlifeImpact: 'Жануарлар әлеміне әсер',
  other: 'Басқа',
  low: 'Төмен',
  medium: 'Орташа',
  high: 'Жоғары',
  critical: 'Сыни',
  pending: 'күтілуде',
  reviewed: 'қаралды',
  resolved: 'шешілді',
  coordinates: 'Координаттар',
  by: 'Автор',
  anonymous: 'Аноним',
  addComment: 'Пікір қосу...',
  postComment: 'Пікір жіберу',
  noCommentsYet: 'Әлі пікірлер жоқ. Бірінші болыңыз!',
  like: 'Ұнайды',
  dislike: 'Ұнамайды',
  comment: 'Пікір'
})

// Define types for our data
interface Report {
  _id: string;
  type: string;
  location: string;
  coordinates: string;
  description: string;
  severity: string;
  status: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  commentCount: number;
  userName?: string;
  userReaction?: string;
}

interface FormData {
  type: string;
  location: string;
  coordinates: string;
  description: string;
  severity: string;
  email: string;
  phone: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
}

interface Message {
  text: string;
  type: 'success' | 'error';
}

interface Comment {
  _id: string;
  content: string;
  userName: string;
  createdAt: string;
}

// Reactive data
const formData = ref<FormData>({
  type: 'pollution',
  location: '',
  coordinates: '',
  description: '',
  severity: 'medium',
  email: '',
  phone: '',
  userId: '', // Will be set from auth
  userName: '', // Will be set from auth
  userEmail: '' // Will be set from auth
});

const recentReports = ref<Report[]>([]);
const loading = ref<boolean>(false);
const isSubmitting = ref<boolean>(false);
const message = ref<Message | null>(null);
const expandedReportId = ref<string | null>(null);
const reportComments = ref<Record<string, Comment[]>>({});
const newComments = ref<Record<string, string>>({});

// Report types - updated to match translation keys
const reportTypes = [
  { value: 'pollution', label: 'Pollution' },
  { value: 'algaeBloom', label: 'Algae Bloom' },
  { value: 'unusualOdor', label: 'Unusual Odor' },
  { value: 'colorChange', label: 'Color Change' },
  { value: 'flooding', label: 'Flooding' },
  { value: 'wildlifeImpact', label: 'Wildlife Impact' },
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
    // Set user data from auth if available
    if (user.value) {
      formData.value.userId = user.value.id;
      formData.value.userName = user.value.name;
      formData.value.userEmail = user.value.email;
    }

    const response = await fetch(`${API_BASE}/api/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
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
        phone: '',
        userId: user.value?.id,
        userName: user.value?.name,
        userEmail: user.value?.email
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
    const response = await fetch(`${API_BASE}/api/reports`, {
      headers: {
        'X-API-Key': API_KEY
      }
    });
    
    if (response.ok) {
      const reports = await response.json();
      
      // Fetch reactions for each report
      const reportsWithReactions = await Promise.all(
        reports.slice(0, 10).map(async (report: Report) => {
          const reactions = await fetchReactions('report', report._id);
          return {
            ...report,
            likes: reactions.likes,
            dislikes: reactions.dislikes,
            userReaction: reactions.userReaction
          };
        })
      );
      
      recentReports.value = reportsWithReactions;
    } else {
      showMessage('Failed to load reports', 'error');
    }
  } catch (error) {
    showMessage('Network error. Please try again.', 'error');
  } finally {
    loading.value = false;
  }
};

// Fetch reactions for a specific item
const fetchReactions = async (parentType: string, parentId: string) => {
  try {
    const userId = user.value?.id; // Get user ID from auth
    const response = await fetch(
      `${API_BASE}/api/reactions/${parentType}/${parentId}${userId ? `?userId=${userId}` : ''}`,
      {
        headers: {
          'X-API-Key': API_KEY
        }
      }
    );
    
    if (response.ok) {
      return await response.json();
    }
    return { likes: 0, dislikes: 0, userReaction: null };
  } catch (error) {
    return { likes: 0, dislikes: 0, userReaction: null };
  }
};

// Toggle like/dislike reaction
const toggleReaction = async (reportId: string, type: 'like' | 'dislike') => {
  if (!user.value) {
    showMessage('Please log in to react to reports', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/api/reactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify({
        parentType: 'report',
        parentId: reportId,
        type: type,
        userId: user.value.id,
        userName: user.value.name
      }),
    });

    if (response.ok) {
      // Refresh the report to get updated reaction counts
      await fetchReports();
    } else {
      const error = await response.json();
      showMessage(error.error || 'Failed to update reaction', 'error');
    }
  } catch (error) {
    showMessage('Network error. Please try again.', 'error');
  }
};

// Toggle comments section - FIXED
const toggleComments = async (reportId: string) => {
  if (expandedReportId.value === reportId) {
    // Hide comments
    expandedReportId.value = null;
  } else {
    // Show comments and fetch them
    expandedReportId.value = reportId;
    await fetchComments(reportId);
  }
};

// Fetch comments for a report
const fetchComments = async (reportId: string) => {
  try {
    const response = await fetch(`${API_BASE}/api/comments/report/${reportId}`, {
      headers: {
        'X-API-Key': API_KEY
      }
    });
    
    if (response.ok) {
      const comments = await response.json();
      reportComments.value[reportId] = comments;
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

// Add a new comment
const addComment = async (reportId: string) => {
  if (!user.value) {
    showMessage('Please log in to comment', 'error');
    return;
  }

  const content = newComments.value[reportId]?.trim();
  if (!content) return;

  try {
    const response = await fetch(`${API_BASE}/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify({
        parentType: 'report',
        parentId: reportId,
        content: content,
        userId: user.value.id,
        userName: user.value.name,
        userEmail: user.value.email
      }),
    });

    if (response.ok) {
      newComments.value[reportId] = '';
      await fetchComments(reportId);
      await fetchReports(); // Refresh to update comment count
      showMessage('Comment added successfully!');
    } else {
      const error = await response.json();
      showMessage(error.error || 'Failed to add comment', 'error');
    }
  } catch (error) {
    showMessage('Network error. Please try again.', 'error');
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