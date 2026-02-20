<template>
  <div class="container mx-auto p-4 max-w-6xl">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF]">{{ $t('profile') }}</h1>
      <p class="text-[#5A6A85] dark:text-[#A9B4C6] mt-2">{{ $t('manageYourAccount') }}</p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-3 space-y-6">
        <!-- Points and Achievements Card -->
        <div class="bg-white dark:bg-[#0E1117] rounded-lg shadow-sm border border-[#E2E8F0] dark:border-[#313B47] p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-[#1A1A1A] dark:text-[#F1F5FF]">{{ $t('pointsAchievements') }}</h2>
            <div class="flex items-center gap-2 bg-[#1E6DFF] text-white px-4 py-2 rounded-lg">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span class="font-bold text-lg">{{ userProfile?.points || 0 }}</span>
              <span class="text-sm">{{ $t('points') }}</span>
            </div>
          </div>

          <!-- Achievements Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div 
              v-for="achievement in achievements" 
              :key="achievement.id"
              :class="[
                'p-4 rounded-lg border-2 text-center transition-all duration-200',
                achievement.unlocked 
                  ? 'bg-[#2ECC71]/10 border-[#2ECC71] dark:bg-[#38E39A]/10 dark:border-[#38E39A]' 
                  : 'bg-[#F7F9FC] border-[#E2E8F0] dark:bg-[#1A1F27] dark:border-[#313B47] opacity-50'
              ]"
            >
              <div class="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <svg class="w-8 h-8" :class="achievement.unlocked ? 'text-[#2ECC71] dark:text-[#38E39A]' : 'text-[#5A6A85] dark:text-[#A9B4C6]'" fill="currentColor" viewBox="0 0 20 20">
                  <path v-if="achievement.id === 'first_like'" d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"/>
                  <path v-else-if="achievement.id === 'first_post'" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
                  <path v-else-if="achievement.id === 'first_comment'" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM8 7h8m-8 4h8"/>
                  <path v-else d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <h3 class="font-semibold text-sm text-[#1A1A1A] dark:text-[#F1F5FF] mb-1">{{ achievement.title }}</h3>
              <p class="text-xs text-[#5A6A85] dark:text-[#A9B4C6]">{{ achievement.description }}</p>
            </div>
          </div>
        </div>

        <!-- User Contributions -->
        <div class="bg-white dark:bg-[#0E1117] rounded-lg shadow-sm border border-[#E2E8F0] dark:border-[#313B47] p-6">
          <h2 class="text-xl font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-6">{{ $t('yourContributions') }}</h2>
          
          <!-- Tabs -->
          <div class="flex border-b border-[#E2E8F0] dark:border-[#313B47] mb-6 overflow-x-auto">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'px-4 py-2 font-medium text-sm border-b-2 transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'border-[#1E6DFF] text-[#1E6DFF] dark:border-[#6CA8FF] dark:text-[#6CA8FF]'
                  : 'border-transparent text-[#5A6A85] dark:text-[#A9B4C6] hover:text-[#1A1A1A] dark:hover:text-[#F1F5FF]'
              ]"
            >
              {{ tab.label }} ({{ getTabCount(tab.id) }})
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6DFF]"></div>
            <p class="text-[#5A6A85] dark:text-[#A9B4C6] mt-2">{{ $t('loadingContributions') }}</p>
          </div>

          <!-- Content -->
          <div v-else>
            <!-- Reports -->
            <div v-if="activeTab === 'reports' && userReports.length" class="space-y-4">
              <div
                v-for="report in userReports"
                :key="report._id"
                class="p-4 border border-[#E2E8F0] dark:border-[#313B47] rounded-lg hover:shadow-md transition-all duration-200"
              >
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-semibold text-[#1A1A1A] dark:text-[#F1F5FF]">{{ report.location }}</h3>
                  <div class="flex items-center gap-2">
                    <span :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      getSeverityColor(report.severity)
                    ]">
                      {{ report.severity }}
                    </span>
                    <span :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      getStatusColor(report.status)
                    ]">
                      {{ report.status }}
                    </span>
                  </div>
                </div>
                <p class="text-sm text-[#5A6A85] dark:text-[#A9B4C6] mb-2">{{ report.description }}</p>
                <div class="flex items-center justify-between text-xs text-[#5A6A85] dark:text-[#A9B4C6]">
                  <span class="capitalize">{{ report.type }}</span>
                  <div class="flex items-center gap-4">
                    <span class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l-.05-.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v-.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                      </svg>
                      {{ report.likes || 0 }}
                    </span>
                    <span class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                      {{ report.commentCount || 0 }}
                    </span>
                    <span>{{ formatDate(report.createdAt) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Posts -->
            <!-- Posts -->
            <div v-else-if="activeTab === 'posts' && userPosts.length" class="space-y-4">
              <div
                v-for="post in userPosts"
                :key="post._id"
                class="p-4 border border-[#E2E8F0] dark:border-[#313B47] rounded-lg hover:shadow-md transition-all duration-200"
              >
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-semibold text-[#1A1A1A] dark:text-[#F1F5FF]">{{ post.title }}</h3>
                  <span :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    getStatusColor(post.status)
                  ]">
                    {{ post.status }}
                  </span>
                </div>
                <p class="text-sm text-[#5A6A85] dark:text-[#A9B4C6] mb-3 line-clamp-2">
                  {{ post.description || post.content }}
                </p>
                <div class="flex items-center justify-between text-xs text-[#5A6A85] dark:text-[#A9B4C6]">
                  <span class="capitalize">{{ post.type || post.category || 'general' }}</span>
                  <div class="flex items-center gap-4">
                    <span class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l-.05-.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v-.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                      </svg>
                      {{ post.likes || 0 }}
                    </span>
                    <span class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                      {{ post.commentCount || 0 }}
                    </span>
                    <span>{{ formatDate(post.createdAt) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Comments -->
            <!-- <div v-else-if="activeTab === 'comments' && userComments.length" class="space-y-4">
              <div
                v-for="comment in userComments"
                :key="comment._id"
                class="p-4 border border-[#E2E8F0] dark:border-[#313B47] rounded-lg hover:shadow-md transition-all duration-200"
              >
                <p class="text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">{{ comment.content }}</p>
                <div class="flex items-center justify-between text-xs text-[#5A6A85] dark:text-[#A9B4C6]">
                  <span>{{ $t('on') }}: {{ getParentType(comment.parentType) }}</span>
                  <div class="flex items-center gap-4">
                    <span class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l-.05-.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v-.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                      </svg>
                      {{ comment.likes || 0 }}
                    </span>
                    <span>{{ formatDate(comment.createdAt) }}</span>
                  </div>
                </div>
              </div>
            </div> -->

            <!-- Coordinates -->
            <div v-else-if="activeTab === 'coordinates' && userCoordinates.length" class="space-y-4">
              <div
                v-for="coord in userCoordinates"
                :key="coord._id"
                class="p-4 border border-[#E2E8F0] dark:border-[#313B47] rounded-lg hover:shadow-md transition-all duration-200"
              >
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-semibold text-[#1A1A1A] dark:text-[#F1F5FF]">{{ coord.name }}</h3>
                  <span :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    getStatusColor(coord.status)
                  ]">
                    {{ coord.status }}
                  </span>
                </div>
                <div class="text-sm text-[#5A6A85] dark:text-[#A9B4C6] mb-3">
                  {{ coord.lat.toFixed(6) }}, {{ coord.lng.toFixed(6) }}
                </div>
                <div class="grid grid-cols-2 gap-2 text-xs text-[#5A6A85] dark:text-[#A9B4C6] mb-3">
                  <div v-if="coord.transparency">{{ $t('transparency') }}: {{ coord.transparency }}m</div>
                  <div v-if="coord.temperature">{{ $t('temperature') }}: {{ coord.temperature }}°C</div>
                  <div v-if="coord.conductivity">{{ $t('conductivity') }}: {{ coord.conductivity }} µS/cm</div>
                  <div v-if="coord.waterlevel">{{ $t('waterLevel') }}: {{ coord.waterlevel }}m</div>
                </div>
                <div class="flex items-center justify-between text-xs text-[#5A6A85] dark:text-[#A9B4C6]">
                  <span>{{ $t('pathogens') }}: {{ coord.pathogens }}</span>
                  <div class="flex items-center gap-4">
                    <span class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l-.05-.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v-.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                      </svg>
                      {{ coord.likes || 0 }}
                    </span>
                    <span class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                      {{ coord.commentCount || 0 }}
                    </span>
                    <span>{{ formatDate(coord.createdAt) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-8">
              <div class="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-[#313B47] rounded-2xl flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <p class="text-[#5A6A85] dark:text-[#A9B4C6]">{{ $t('noItemsFound', { items: activeTab }) }}</p>
              <p class="text-sm text-[#5A6A85] dark:text-[#A9B4C6] mt-1">{{ $t('itemsWillAppear', { items: activeTab }) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Profile Card -->
        <div class="bg-white dark:bg-[#0E1117] rounded-lg shadow-sm border border-[#E2E8F0] dark:border-[#313B47] p-6">
          <div class="flex items-center gap-4 mb-4">
            <img 
              :src="user?.picture" 
              :alt="user?.name" 
              crossorigin="anonymous"
              class="w-16 h-16 rounded-full border-2 border-[#E2E8F0] dark:border-[#313B47]"
            />
            <div>
              <h3 class="text-lg font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">{{ user?.name }}</h3>
              <p class="text-sm text-[#5A6A85] dark:text-[#A9B4C6]">{{ user?.email }}</p>
            </div>
          </div>

          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-[#5A6A85] dark:text-[#A9B4C6]">{{ $t('userId') }}</span>
              <span class="font-mono text-[#1A1A1A] dark:text-[#F1F5FF] text-xs">{{ user?.id?.substring(0, 8) }}...</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#5A6A85] dark:text-[#A9B4C6]">{{ $t('role') }}</span>
              <span class="text-[#1A1A1A] dark:text-[#F1F5FF]">{{ getUserRole(userProfile?.role) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#5A6A85] dark:text-[#A9B4C6]">{{ $t('memberSince') }}</span>
              <span class="text-[#1A1A1A] dark:text-[#F1F5FF] text-xs">{{ formatJoinDate(userProfile?.createdAt) }}</span>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="bg-white dark:bg-[#0E1117] rounded-lg shadow-sm border border-[#E2E8F0] dark:border-[#313B47] p-6">
          <h3 class="text-lg font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">{{ $t('quickStats') }}</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-[#5A6A85] dark:text-[#A9B4C6]">{{ $t('totalReports') }}</span>
              <span class="text-[#1A1A1A] dark:text-[#F1F5FF] font-medium">{{ userReports.length }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[#5A6A85] dark:text-[#A9B4C6]">{{ $t('totalPosts') }}</span>
              <span class="text-[#1A1A1A] dark:text-[#F1F5FF] font-medium">{{ userPosts.length }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[#5A6A85] dark:text-[#A9B4C6]">{{ $t('totalComments') }}</span>
              <span class="text-[#1A1A1A] dark:text-[#F1F5FF] font-medium">{{ userComments.length }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[#5A6A85] dark:text-[#A9B4C6]">{{ $t('coordinates') }}</span>
              <span class="text-[#1A1A1A] dark:text-[#F1F5FF] font-medium">{{ userCoordinates.length }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[#5A6A85] dark:text-[#A9B4C6]">{{ $t('totalLikes') }}</span>
              <span class="text-[#1A1A1A] dark:text-[#F1F5FF] font-medium">{{ totalLikes }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="bg-white dark:bg-[#0E1117] rounded-lg shadow-sm border border-[#E2E8F0] dark:border-[#313B47] p-6">
          <h3 class="text-lg font-semibold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">{{ $t('actions') }}</h3>
          <div class="space-y-3">
            <button 
              @click="refreshProfile"
              class="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#5A6A85] dark:text-[#A9B4C6] hover:bg-[#F5F8FF] dark:hover:bg-[#313B47] rounded-md transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              {{ $t('refreshProfile') }}
            </button>
            <button 
              @click="signOut"
              class="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              {{ $t('signOut') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const {isAuthenticated, user, signOut, checkAuthStatus } = useGoogleAuth()
import { computed, onMounted, ref } from 'vue'

definePageMeta({
  middleware: 'auth'
})


onMounted(async () => {
  await checkAuthStatus()
  if (!isAuthenticated.value) {
    await navigateTo('/login')
  }
})


const config = useRuntimeConfig()
const API_BASE = config.public.apiBaseUrl
const API_KEY = config.public.defaultApiKey

const { $i18n } = useNuxtApp()
const { locale } = useI18n()

// Reactive data
const userProfile = ref<any>(null)
const userReports = ref<any[]>([])
const userPosts = ref<any[]>([])
const userComments = ref<any[]>([])
const userCoordinates = ref<any[]>([])
const loading = ref(false)
const activeTab = ref('reports')

// Tabs configuration
const tabs = computed(() => [
  { id: 'reports', label: $i18n.t('reports') },
  { id: 'posts', label: $i18n.t('posts') },
  // { id: 'comments', label: $i18n.t('comments') },
  { id: 'coordinates', label: $i18n.t('coordinates') }
])

// Achievements configuration
const achievements = computed(() => [
  { 
    id: 'first_like', 
    title: $i18n.t('firstLike'), 
    description: $i18n.t('receiveFirstLike'),
    unlocked: false,
    condition: (points: number, stats: any) => stats.totalLikes >= 1
  },
  { 
    id: 'like_master', 
    title: $i18n.t('likeMaster'), 
    description: $i18n.t('receive10Likes'),
    unlocked: false,
    condition: (points: number, stats: any) => stats.totalLikes >= 10
  },
  { 
    id: 'first_post', 
    title: $i18n.t('firstPost'), 
    description: $i18n.t('createFirstPost'),
    unlocked: false,
    condition: (points: number, stats: any) => stats.posts >= 1
  },
  { 
    id: 'contributor', 
    title: $i18n.t('contributor'), 
    description: $i18n.t('earn50Points'),
    unlocked: false,
    condition: (points: number, stats: any) => points >= 50
  }
])

// Computed properties
const totalLikes = computed(() => {
  const reportLikes = userReports.value.reduce((sum, report) => sum + (report.likes || 0), 0)
  const postLikes = userPosts.value.reduce((sum, post) => sum + (post.likes || 0), 0)
  const commentLikes = userComments.value.reduce((sum, comment) => sum + (comment.likes || 0), 0)
  const coordLikes = userCoordinates.value.reduce((sum, coord) => sum + (coord.likes || 0), 0)
  return reportLikes + postLikes + commentLikes + coordLikes
})

// Methods
const getTabCount = (tabId: string) => {
  switch (tabId) {
    case 'reports': return userReports.value.length
    case 'posts': return userPosts.value.length
    case 'comments': return userComments.value.length
    case 'coordinates': return userCoordinates.value.length
    default: return 0
  }
}

const getStatusColor = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: 'bg-[#FFCB2F] dark:bg-[#FFDD57] text-[#1A1A1A]',
    reviewed: 'bg-[#1E6DFF] dark:bg-[#6CA8FF] text-white',
    resolved: 'bg-[#2ECC71] dark:bg-[#38E39A] text-white',
    approved: 'bg-[#2ECC71] dark:bg-[#38E39A] text-white'
  }
  return statusMap[status] || statusMap.pending
}

const getSeverityColor = (severity: string) => {
  const severityMap: Record<string, string> = {
    low: 'bg-[#2ECC71] dark:bg-[#38E39A] text-white',
    medium: 'bg-[#FFCB2F] dark:bg-[#FFDD57] text-[#1A1A1A]',
    high: 'bg-[#FF4E4E] dark:bg-[#FF6B6B] text-white',
    critical: 'bg-[#DC2626] dark:bg-[#EF4444] text-white'
  }
  return severityMap[severity] || severityMap.medium
}

const getParentType = (parentType: string) => {
  const typeMap: Record<string, string> = {
    post: $i18n.t('post'),
    report: $i18n.t('report'),
    coordinate: $i18n.t('coordinate')
  }
  return typeMap[parentType] || parentType
}

const getUserRole = (role: number) => {
  const roles = [$i18n.t('user'), $i18n.t('editor'), $i18n.t('admin')]
  return roles[role] || $i18n.t('user')
}

const formatDate = (dateString: string) => {
  if (!dateString) return $i18n.t('unknown')
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffDays < 1) return $i18n.t('today')
  if (diffDays < 7) return $i18n.t('daysAgo', { days: diffDays })
  if (diffDays < 30) return $i18n.t('weeksAgo', { weeks: Math.floor(diffDays / 7) })
  
  return date.toLocaleDateString()
}

const formatJoinDate = (dateString: string) => {
  if (!dateString) return $i18n.t('unknown')
  const date = new Date(dateString)
  return date.toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Fetch user data from all collections
// Fetch user data from all collections
const fetchUserData = async () => {
  if (!user.value?.id) return

  loading.value = true
  try {
    console.log('👤 Fetching data for user:', user.value.id)
    
    // Fetch user profile with points
    const userResponse = await fetch(`${API_BASE}/api/users/me?userId=${user.value.id}`, {
      headers: {
        'X-API-Key': API_KEY
      }
    })
    
    if (userResponse.ok) {
      const userData = await userResponse.json()
      userProfile.value = userData.user
      console.log('✅ User profile:', userProfile.value)
    } else {
      console.error('❌ Failed to fetch user profile')
    }

    // Fetch all reports and filter by userId
    const reportsResponse = await fetch(`${API_BASE}/api/reports`, {
      headers: {
        'X-API-Key': API_KEY
      }
    })
    
    if (reportsResponse.ok) {
      const allReports = await reportsResponse.json()
      userReports.value = allReports.filter((report: any) => report.userId === user.value?.id)
      console.log('📊 User reports:', userReports.value.length)
    } else {
      console.error('❌ Failed to fetch reports')
    }

    // Fetch all posts - use the feed endpoint which we know works
    const postsResponse = await fetch(`${API_BASE}/api/posts/feed`, {
      headers: {
        'X-API-Key': API_KEY
      }
    })
    
    if (postsResponse.ok) {
      const allPosts = await postsResponse.json()
      console.log('📝 All posts from API:', allPosts)
      
      // Filter posts by authorId - make sure we're comparing the same values
      userPosts.value = allPosts.filter((post: any) => {
        const matches = post.authorId === user.value?.id
        console.log(`🔍 Checking post ${post._id}: authorId=${post.authorId}, user.id=${user.value?.id}, matches=${matches}`)
        return matches
      })
      
      console.log('✅ User posts found:', userPosts.value.length)
      console.log('📋 User posts:', userPosts.value)
    } else {
      console.error('❌ Failed to fetch posts')
    }

    // Fetch all comments and filter by userId
    const commentsResponse = await fetch(`${API_BASE}/api/comments`, {
      headers: {
        'X-API-Key': API_KEY
      }
    })
    
    if (commentsResponse.ok) {
      const allComments = await commentsResponse.json()
      userComments.value = allComments.filter((comment: any) => comment.userId === user.value?.id)
      console.log('💬 User comments:', userComments.value.length)
    } else {
      console.error('❌ Failed to fetch comments')
    }

    // Fetch all coordinates and filter by userId
    const coordsResponse = await fetch(`${API_BASE}/api/coordinates`, {
      headers: {
        'X-API-Key': API_KEY
      }
    })
    
    if (coordsResponse.ok) {
      const allCoords = await coordsResponse.json()
      userCoordinates.value = allCoords.filter((coord: any) => coord.userId === user.value?.id)
      console.log('📍 User coordinates:', userCoordinates.value.length)
    } else {
      console.error('❌ Failed to fetch coordinates')
    }

    // Update achievements
    updateAchievements()

  } catch (error) {
    console.error('❌ Error fetching user data:', error)
  } finally {
    loading.value = false
  }
}

const updateAchievements = () => {
  const stats = {
    totalLikes: totalLikes.value,
    reports: userReports.value.length,
    posts: userPosts.value.length,
    comments: userComments.value.length,
    coordinates: userCoordinates.value.length
  }

  achievements.value.forEach(achievement => {
    achievement.unlocked = achievement.condition(userProfile.value?.points || 0, stats)
  })
}


const refreshProfile = () => {
  checkAuthStatus()
  fetchUserData()
}

// Initialize
onMounted(() => {
  fetchUserData()
  refreshProfile()
})

// Watch for route changes to refresh data
watch(() => locale.value, () => {
  fetchUserData()
})

// Add translations
$i18n.mergeLocaleMessage('en', {
  profile: 'Profile',
  manageYourAccount: 'Manage your account information and track your contributions',
  pointsAchievements: 'Points & Achievements',
  points: 'points',
  yourContributions: 'Your Contributions',
  loadingContributions: 'Loading your contributions...',
  reports: 'Reports',
  posts: 'Posts',
  comments: 'Comments',
  coordinates: 'Coordinates',
  on: 'On',
  transparency: 'Transparency',
  temperature: 'Temperature',
  conductivity: 'Conductivity',
  waterLevel: 'Water Level',
  pathogens: 'Pathogens',
  noItemsFound: 'No {items} found',
  itemsWillAppear: 'Your {items} will appear here once you create some',
  userId: 'User ID',
  role: 'Role',
  memberSince: 'Member since',
  quickStats: 'Quick Stats',
  totalReports: 'Total Reports',
  totalPosts: 'Total Posts',
  totalComments: 'Total Comments',
  totalLikes: 'Total Likes',
  actions: 'Actions',
  refreshProfile: 'Refresh Profile',
  signOut: 'Sign Out',
  user: 'User',
  editor: 'Editor',
  admin: 'Admin',
  unknown: 'Unknown',
  today: 'Today',
  daysAgo: '{days} days ago',
  weeksAgo: '{weeks} weeks ago',
  firstLike: 'First Like',
  receiveFirstLike: 'Receive your first like',
  likeMaster: 'Like Master',
  receive10Likes: 'Receive 10+ likes',
  firstPost: 'First Post',
  createFirstPost: 'Create your first post',
  contributor: 'Contributor',
  earn50Points: 'Earn 50+ points',
  post: 'Post',
  report: 'Report',
  coordinate: 'Coordinate'
})

$i18n.mergeLocaleMessage('ru', {
  profile: 'Профиль',
  manageYourAccount: 'Управляйте информацией вашего аккаунта и отслеживайте ваши вклады',
  pointsAchievements: 'Очки и Достижения',
  points: 'очков',
  yourContributions: 'Ваши Вклады',
  loadingContributions: 'Загрузка ваших вкладов...',
  reports: 'Отчеты',
  posts: 'Посты',
  comments: 'Комментарии',
  coordinates: 'Координаты',
  on: 'На',
  transparency: 'Прозрачность',
  temperature: 'Температура',
  conductivity: 'Электропроводность',
  waterLevel: 'Уровень воды',
  pathogens: 'Патогены',
  noItemsFound: '{items} не найдено',
  itemsWillAppear: 'Ваши {items} появятся здесь, как только вы их создадите',
  userId: 'ID пользователя',
  role: 'Роль',
  memberSince: 'Участник с',
  quickStats: 'Быстрая статистика',
  totalReports: 'Всего отчетов',
  totalPosts: 'Всего постов',
  totalComments: 'Всего комментариев',
  totalLikes: 'Всего лайков',
  actions: 'Действия',
  refreshProfile: 'Обновить профиль',
  signOut: 'Выйти',
  user: 'Пользователь',
  editor: 'Редактор',
  admin: 'Администратор',
  unknown: 'Неизвестно',
  today: 'Сегодня',
  daysAgo: '{days} дней назад',
  weeksAgo: '{weeks} недель назад',
  firstLike: 'Первый лайк',
  receiveFirstLike: 'Получите ваш первый лайк',
  likeMaster: 'Мастер лайков',
  receive10Likes: 'Получите 10+ лайков',
  firstPost: 'Первый пост',
  createFirstPost: 'Создайте ваш первый пост',
  contributor: 'Участник',
  earn50Points: 'Заработайте 50+ очков',
  post: 'Пост',
  report: 'Отчет',
  coordinate: 'Координата'
})

$i18n.mergeLocaleMessage('kk', {
  profile: 'Профиль',
  manageYourAccount: 'Аккаунт ақпаратын басқарыңыз және үлесіңізді бақылаңыз',
  pointsAchievements: 'Ұпайлар мен Жетістіктер',
  points: 'ұпай',
  yourContributions: 'Сіздің Үлесіңіз',
  loadingContributions: 'Сіздің үлесіңіз жүктелуде...',
  reports: 'Есептер',
  posts: 'Посттар',
  comments: 'Пікірлер',
  coordinates: 'Координаттар',
  on: 'Қосулы',
  transparency: 'Мөлдірлік',
  temperature: 'Температура',
  conductivity: 'Электр өткізгіштік',
  waterLevel: 'Су деңгейі',
  pathogens: 'Патогендер',
  noItemsFound: '{items} табылмады',
  itemsWillAppear: 'Сіз {items} жасағаннан кейін олар осы жерде пайда болады',
  userId: 'Пайдаланушы ID',
  role: 'Рөл',
  memberSince: 'Мүше болған уақыты',
  quickStats: 'Жылтымды статистика',
  totalReports: 'Барлық есептер',
  totalPosts: 'Барлық посттар',
  totalComments: 'Барлық пікірлер',
  totalLikes: 'Барлық лайктар',
  actions: 'Әрекеттер',
  refreshProfile: 'Профильді жаңарту',
  signOut: 'Шығу',
  user: 'Пайдаланушы',
  editor: 'Редактор',
  admin: 'Әкімші',
  unknown: 'Белгісіз',
  today: 'Бүгін',
  daysAgo: '{days} күн бұрын',
  weeksAgo: '{weeks} апта бұрын',
  firstLike: 'Бірінші лайк',
  receiveFirstLike: 'Бірінші лайк алыңыз',
  likeMaster: 'Лайк шебері',
  receive10Likes: '10+ лайк алыңыз',
  firstPost: 'Бірінші пост',
  createFirstPost: 'Бірінші постыңызды жасаңыз',
  contributor: 'Қатысушы',
  earn50Points: '50+ ұпай жинаңыз',
  post: 'Пост',
  report: 'Есеп',
  coordinate: 'Координат'
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>