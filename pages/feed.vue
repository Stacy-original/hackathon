<template>
  <div class="py-8">
    <div class="container mx-auto px-4 max-w-4xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">
          {{ $t('communityFeed') }}
        </h1>
        <p class="text-xl text-[#5A6A85] dark:text-[#A9B4C6] max-w-2xl mx-auto">
          {{ $t('communityFeedDescription') }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6DFF]"></div>
        <p class="text-[#5A6A85] dark:text-[#A9B4C6] mt-2">{{ $t('loadingPosts') }}</p>
      </div>

      <!-- No Posts -->
      <div v-else-if="posts.length === 0" class="text-center py-8">
        <p class="text-[#5A6A85] dark:text-[#A9B4C6]">{{ $t('noPostsYet') }}</p>
      </div>

      <!-- Posts Grid -->
      <div v-else class="space-y-6">
        <div
          v-for="post in posts"
          :key="post._id"
          class="bg-white dark:bg-[#212832] rounded-2xl p-6 shadow-sm border border-[#E2E8F0] dark:border-[#313B47] hover:shadow-md transition-all duration-200"
        >
          <!-- Post Header -->
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center gap-3 flex-wrap">
              <span 
                :class="[
                  'px-3 py-1 rounded-full text-xs font-medium',
                  getSeverityColor(post.severity)
                ]"
              >
                {{ $t(post.severity) }}
              </span>
              <span class="text-sm text-[#1E6DFF] dark:text-[#6CA8FF] font-medium capitalize">
                {{ $t(post.type) }}
              </span>
              <span v-if="post.location" class="text-sm text-[#5A6A85] dark:text-[#A9B4C6]">
                📍 {{ post.location }}
              </span>
            </div>
            <span class="text-xs text-[#5A6A85] dark:text-[#A9B4C6] whitespace-nowrap">
              {{ formatDate(post.createdAt) }}
            </span>
          </div>
          
          <!-- Post Title -->
          <h2 class="font-bold text-2xl text-[#1A1A1A] dark:text-[#F1F5FF] mb-3">
            {{ post.title }}
          </h2>
          
          <!-- Post Description -->
          <p class="text-[#5A6A85] dark:text-[#A9B4C6] text-lg mb-4">
            {{ post.description }}
          </p>

          <!-- Post Image -->
          <div v-if="post.imageUrl" class="mb-4 rounded-lg overflow-hidden">
            <img 
              :src="post.imageUrl" 
              :alt="post.title"
              class="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            >
          </div>

    

          <!-- Tags -->
          <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="(tag, index) in post.tags"
              :key="index"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[#1E6DFF] text-white"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Video -->
          <div v-if="post.videoUrl" class="mb-4">
            <!-- YouTube/Vimeo Embed -->
            <iframe
              v-if="isEmbeddableVideo(post.videoUrl)"
              :src="getEmbedUrl(post.videoUrl)"
              class="w-full h-64 rounded-lg"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            
            <!-- Direct Video File -->
            <video
              v-else
              :src="post.videoUrl"
              controls
              class="w-full h-64 rounded-lg object-cover"
            >
              {{ $t('videoNotSupported') }}
            </video>
          </div>

          <!-- Post Content -->
          <div class="prose dark:prose-invert max-w-none mb-4">
            <p class="text-[#1A1A1A] dark:text-[#F1F5FF] whitespace-pre-line">{{ post.content }}</p>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="posts.length > 0" class="text-center mt-8">
        <button 
          @click="fetchPosts"
          class="px-6 py-3 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg font-medium transition-colors"
        >
          {{ $t('loadMore') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Define translations for this page only
const { $i18n } = useNuxtApp()

$i18n.mergeLocaleMessage('en', {
  communityFeed: 'Community Feed',
  communityFeedDescription: 'Latest news, alerts, and updates from the community',
  loadingPosts: 'Loading posts...',
  noPostsYet: 'No posts yet. Check back later for updates!',
  loadMore: 'Load More',
  news: 'News',
  alert: 'Alert',
  update: 'Update',
  event: 'Event',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
  videoNotSupported: 'Your browser does not support the video tag.'
})

$i18n.mergeLocaleMessage('ru', {
  communityFeed: 'Лента сообщества',
  communityFeedDescription: 'Последние новости, оповещения и обновления от сообщества',
  loadingPosts: 'Загрузка постов...',
  noPostsYet: 'Пока нет постов. Зайдите позже для обновлений!',
  loadMore: 'Загрузить еще',
  news: 'Новости',
  alert: 'Оповещение',
  update: 'Обновление',
  event: 'Событие',
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
  critical: 'Критический',
  videoNotSupported: 'Ваш браузер не поддерживает видео тег.'
})

$i18n.mergeLocaleMessage('kk', {
  communityFeed: 'Қауымдастық лентасы',
  communityFeedDescription: 'Қауымдастықтан соңғы жаңалықтар, ескертулер және жаңартулар',
  loadingPosts: 'Посттар жүктелуде...',
  noPostsYet: 'Әлі посттар жоқ. Жаңартулар үшін кейінірек қайтып келіңіз!',
  loadMore: 'Көбірек жүктеу',
  news: 'Жаңалықтар',
  alert: 'Ескерту',
  update: 'Жаңарту',
  event: 'Оқиға',
  low: 'Төмен',
  medium: 'Орташа',
  high: 'Жоғары',
  critical: 'Сыни',
  videoNotSupported: 'Сіздің браузеріңіз бейне тегін қолдамайды.'
})

// ✅ UPDATE THIS URL WITH YOUR RENDER URL
const API_BASE = 'https://skogeohydro-backend.onrender.com';

// Define types
interface Post {
  _id: string;
  title: string;
  content: string;
  description: string;
  severity: string;
  type: string;
  location: string;
  imageUrl: string;
  videoUrl: string;
  tags: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Reactive data
const posts = ref<Post[]>([]);
const loading = ref<boolean>(false);

// Check if video URL is from an embeddable platform
const isEmbeddableVideo = (url: string): boolean => {
  if (!url) return false;
  
  const embeddableDomains = [
    'youtube.com',
    'youtu.be',
    'vimeo.com'
  ];
  
  return embeddableDomains.some(domain => url.includes(domain));
};

// Convert video URL to embed URL
const getEmbedUrl = (url: string): string => {
  if (!url) return '';
  
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    // Extract video ID from various YouTube URL formats
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  
  // Vimeo
  if (url.includes('vimeo.com')) {
    const regex = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/;
    const match = url.match(regex);
    if (match && match[2]) {
      return `https://player.vimeo.com/video/${match[2]}`;
    }
  }
  
  return url;
};

// Fetch approved posts from backend
const fetchPosts = async () => {
  loading.value = true;
  try {
    const response = await fetch(`${API_BASE}/api/posts/feed`);
    if (response.ok) {
      const postsData = await response.json();
      posts.value = postsData;
    } else {
      console.error('Failed to load posts');
    }
  } catch (error) {
    console.error('Network error:', error);
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

// Fetch posts when component mounts
onMounted(() => {
  fetchPosts();
});
</script>