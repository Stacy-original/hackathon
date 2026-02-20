<template>
  <div class="py-8">
    <div class="container mx-auto px-4 max-w-4xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">
          {{ $t('communityNews') }}
        </h1>
        <p class="text-xl text-[#5A6A85] dark:text-[#A9B4C6] max-w-2xl mx-auto">
          {{ $t('communityNewsDescription') }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <div class="inline-flex flex-col items-center">
          <div class="w-8 h-8 border-2 border-[#1E6DFF] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p class="text-[#5A6A85] dark:text-[#A9B4C6]">{{ $t('loadingPosts') }}</p>
        </div>
      </div>

      <!-- No Posts -->
      <div v-else-if="posts.length === 0" class="text-center py-16">
        <div class="max-w-md mx-auto">
          <div class="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-[#313B47] rounded-2xl flex items-center justify-center">
            <svg class="w-8 h-8 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <p class="text-[#5A6A85] dark:text-[#A9B4C6] mb-6">{{ $t('noPostsYet') }}</p>
          <button 
            @click="fetchPosts"
            class="px-6 py-2 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg font-medium transition-colors duration-200"
          >
            {{ $t('refresh') }}
          </button>
        </div>
      </div>

      <!-- Posts Grid -->
      <div v-else class="space-y-8">
        <div
          v-for="post in posts"
          :key="post._id"
          class="bg-white dark:bg-[#212832] rounded-2xl p-8 shadow-sm border border-[#E2E8F0] dark:border-[#313B47] hover:shadow-md transition-all duration-200"
        >
          <!-- Post Header -->
          <div class="flex justify-between items-start mb-6">
            <div class="flex items-center gap-3 flex-wrap">
              <span 
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  getSeverityColor(post.severity)
                ]"
              >
                {{ $t(post.severity) }}
              </span>
              <span class="text-sm text-[#1E6DFF] dark:text-[#6CA8FF] font-medium capitalize">
                {{ $t(post.type) }}
              </span>
              <span v-if="post.location" class="flex items-center gap-1 text-sm text-[#5A6A85] dark:text-[#A9B4C6]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {{ post.location }}
              </span>
            </div>
            <span class="text-sm text-[#5A6A85] dark:text-[#A9B4C6] whitespace-nowrap">
              {{ formatDate(post.createdAt) }}
            </span>
          </div>
          
          <!-- Post Title -->
          <h2 class="font-bold text-2xl text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">
            {{ post.title }}
          </h2>
          
          <!-- Post Description -->
          <p class="text-[#5A6A85] dark:text-[#A9B4C6] mb-6 leading-relaxed text-lg">
            {{ post.description }}
          </p>

          <!-- Post Image -->
          <div v-if="post.image" class="mb-6 rounded-xl overflow-hidden max-h-120">
            <img 
              :src="post.image" 
              :alt="post.title"
              class="w-full h-auto object-cover max-h-120"
            >
          </div>

          <!-- Tags -->
          <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="(tag, index) in post.tags"
              :key="index"
              class="inline-flex items-center px-3 py-2 rounded-lg text-sm bg-[#1E6DFF]/10 text-[#1E6DFF] dark:bg-[#1E6DFF]/20 dark:text-[#6CA8FF]"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Video -->
          <div v-if="post.videoUrl" class="mb-6 max-h-120">
            <!-- YouTube/Vimeo Embed -->
            <iframe
              v-if="isEmbeddableVideo(post.videoUrl)"
              :src="getEmbedUrl(post.videoUrl)"
              class="w-full h-96 rounded-xl"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            
            <!-- Direct Video File -->
            <video
              v-else
              :src="post.videoUrl"
              controls
              class="w-full h-96 rounded-xl object-cover"
            >
              {{ $t('videoNotSupported') }}
            </video>
          </div>

          <!-- Post Content -->
          <div class="prose dark:prose-invert max-w-none mb-6">
            <p class="text-[#1A1A1A] dark:text-[#F1F5FF] whitespace-pre-line leading-relaxed text-base">
              {{ post.content }}
            </p>
          </div>

          <!-- Author Information -->
          <div class="flex items-center justify-between mb-6">
            <div class="text-sm text-[#5A6A85] dark:text-[#A9B4C6]">
              <span v-if="post.authorName">{{ $t('by') }}: {{ post.authorName }}</span>
              <span v-else>{{ $t('anonymous') }}</span>
            </div>
          </div>

          <!-- Likes, Dislikes, and Comments Section -->
          <div class="flex items-center justify-between border-t border-[#E2E8F0] dark:border-[#313B47] pt-6">
            <!-- Reactions -->
            <div class="flex items-center gap-4">
              <!-- Like Button -->
              <button 
                @click="toggleReaction(post._id, 'like')"
                :disabled="reactionLoading[post._id]"
                :class="[
                  'flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200',
                  post.userReaction === 'like' 
                    ? 'bg-[#1E6DFF] text-white' 
                    : 'bg-[#F7F9FC] dark:bg-[#1A1F27] text-[#5A6A85] dark:text-[#A9B4C6] hover:bg-[#E8F0FE] dark:hover:bg-[#252E3A]',
                  reactionLoading[post._id] ? 'opacity-50 cursor-not-allowed' : ''
                ]"
              >
                <svg v-if="reactionLoading[post._id]" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                </svg>
                <span class="text-sm font-medium">{{ post.likes || 0 }}</span>
              </button>

              <!-- Dislike Button -->
              <button 
                @click="toggleReaction(post._id, 'dislike')"
                :disabled="reactionLoading[post._id]"
                :class="[
                  'flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200',
                  post.userReaction === 'dislike' 
                    ? 'bg-[#FF4E4E] text-white' 
                    : 'bg-[#F7F9FC] dark:bg-[#1A1F27] text-[#5A6A85] dark:text-[#A9B4C6] hover:bg-[#FEE8E8] dark:hover:bg-[#252E3A]',
                  reactionLoading[post._id] ? 'opacity-50 cursor-not-allowed' : ''
                ]"
              >
                <svg v-if="reactionLoading[post._id]" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"/>
                </svg>
                <span class="text-sm font-medium">{{ post.dislikes || 0 }}</span>
              </button>

              <!-- Comment Button -->
              <button 
                @click="toggleComments(post._id)"
                :class="[
                  'flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200',
                  expandedPostId === post._id
                    ? 'bg-[#2ECC71] text-white'
                    : 'bg-[#F7F9FC] dark:bg-[#1A1F27] text-[#5A6A85] dark:text-[#A9B4C6] hover:bg-[#E8F0FE] dark:hover:bg-[#252E3A]'
                ]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                <span class="text-sm font-medium">{{ post.commentCount || 0 }}</span>
              </button>
            </div>
          </div>

          <!-- Comments Section -->
          <div v-if="expandedPostId === post._id" class="mt-6 border-t border-[#E2E8F0] dark:border-[#313B47] pt-6">
            <!-- Add Comment Form -->
            <div class="mb-6">
              <textarea
                v-model="newComments[post._id]"
                :placeholder="$t('addComment')"
                rows="3"
                class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent text-base resize-none"
              ></textarea>
              <div class="flex justify-end mt-3">
                <button
                  @click="addComment(post._id)"
                  :disabled="!newComments[post._id]?.trim() || commentLoading[post._id]"
                  :class="[
                    'px-6 py-3 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg font-medium transition-all duration-200',
                    (!newComments[post._id]?.trim() || commentLoading[post._id]) ? 'opacity-50 cursor-not-allowed' : ''
                  ]"
                >
                  <span v-if="commentLoading[post._id]" class="flex items-center gap-2">
                    <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    {{ $t('posting') }}
                  </span>
                  <span v-else>
                    {{ $t('postComment') }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Comments List -->
            <div v-if="postComments[post._id]?.length" class="space-y-4">
              <div
                v-for="comment in postComments[post._id]"
                :key="comment._id"
                class="p-4 bg-[#F7F9FC] dark:bg-[#1A1F27] rounded-lg"
              >
                <div class="flex justify-between items-start mb-2">
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
            <div v-else class="text-center py-6 text-sm text-[#5A6A85] dark:text-[#A9B4C6]">
              {{ $t('noCommentsYet') }}
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="posts.length > 0 && hasMorePosts" class="text-center mt-12">
        <button 
          @click="loadMorePosts"
          :disabled="loadingMore"
          class="px-8 py-4 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-base"
        >
          <span class="flex items-center gap-3">
            <svg v-if="loadingMore" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            {{ loadingMore ? $t('loading') : $t('loadMore') }}
          </span>
        </button>
        <p v-if="!hasMorePosts" class="text-[#5A6A85] dark:text-[#A9B4C6] mt-4">
          {{ $t('allPostsLoaded') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Define translations for this page only
const { $i18n } = useNuxtApp()

$i18n.mergeLocaleMessage('en', {
  communityNews: 'Community News',
  communityNewsDescription: 'Latest news, alerts, and updates from the community',
  loadingPosts: 'Loading posts...',
  loading: 'Loading...',
  noPostsYet: 'No posts yet. Check back later for updates!',
  loadMore: 'Load More',
  refresh: 'Refresh',
  allPostsLoaded: 'You have reached the end of the feed',
  news: 'News',
  alert: 'Alert',
  update: 'Update',
  event: 'Event',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
  videoNotSupported: 'Your browser does not support the video tag.',
  by: 'By',
  anonymous: 'Anonymous',
  addComment: 'Add a comment...',
  postComment: 'Post Comment',
  posting: 'Posting...',
  noCommentsYet: 'No comments yet. Be the first to comment!',
  like: 'Like',
  dislike: 'Dislike',
  comment: 'Comment'
})

$i18n.mergeLocaleMessage('ru', {
  communityNews: 'Новости сообщества',
  communityNewsDescription: 'Последние новости, оповещения и обновления от сообщества',
  loadingPosts: 'Загрузка постов...',
  loading: 'Загрузка...',
  noPostsYet: 'Пока нет постов. Зайдите позже для обновлений!',
  loadMore: 'Загрузить еще',
  refresh: 'Обновить',
  allPostsLoaded: 'Вы достигли конца ленты',
  news: 'Новости',
  alert: 'Оповещение',
  update: 'Обновление',
  event: 'Событие',
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
  critical: 'Критический',
  videoNotSupported: 'Ваш браузер не поддерживает видео тег.',
  by: 'От',
  anonymous: 'Аноним',
  addComment: 'Добавить комментарий...',
  postComment: 'Опубликовать',
  posting: 'Публикация...',
  noCommentsYet: 'Пока нет комментариев. Будьте первым!',
  like: 'Нравится',
  dislike: 'Не нравится',
  comment: 'Комментарий'
})

$i18n.mergeLocaleMessage('kk', {
  communityNews: 'Қауымдастық жаңалықтары',
  communityNewsDescription: 'Қауымдастықтан соңғы жаңалықтар, ескертулер және жаңартулар',
  loadingPosts: 'Посттар жүктелуде...',
  loading: 'Жүктелуде...',
  noPostsYet: 'Әлі посттар жоқ. Жаңартулар үшін кейінірек қайтып келіңіз!',
  loadMore: 'Көбірек жүктеу',
  refresh: 'Жаңарту',
  allPostsLoaded: 'Сіз лентаның соңына жеттіңіз',
  news: 'Жаңалықтар',
  alert: 'Ескерту',
  update: 'Жаңарту',
  event: 'Оқиға',
  low: 'Төмен',
  medium: 'Орташа',
  high: 'Жоғары',
  critical: 'Сыни',
  videoNotSupported: 'Сіздің браузеріңіз бейне тегін қолдамайды.',
  by: 'Автор',
  anonymous: 'Аноним',
  addComment: 'Пікір қосу...',
  postComment: 'Пікір жіберу',
  posting: 'Жіберілуде...',
  noCommentsYet: 'Әлі пікірлер жоқ. Бірінші болыңыз!',
  like: 'Ұнайды',
  dislike: 'Ұнамайды',
  comment: 'Пікір'
})

// ✅ USE RUNTIME CONFIG - KEEP IT SIMPLE LIKE YOUR WORKING PAGES
const config = useRuntimeConfig()
const API_BASE = config.public.apiBaseUrl
const API_KEY = config.public.defaultApiKey

// Auth check
const { isAuthenticated, checkAuthStatus, user } = useGoogleAuth()

onMounted(async () => {
  await checkAuthStatus()
})

// Define types
interface Post {
  _id: string;
  title: string;
  content: string;
  description: string;
  severity: string;
  type: string;
  location: string;
  image: string;
  videoUrl: string;
  tags: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  authorName?: string;
  likes: number;
  dislikes: number;
  commentCount: number;
  userReaction?: string;
}

interface Comment {
  _id: string;
  content: string;
  userName: string;
  createdAt: string;
}

// Reactive data
const posts = ref<Post[]>([]);
const loading = ref<boolean>(false);
const loadingMore = ref<boolean>(false);
const hasMorePosts = ref<boolean>(true);
const currentPage = ref<number>(1);
const expandedPostId = ref<string | null>(null);
const postComments = ref<Record<string, Comment[]>>({});
const newComments = ref<Record<string, string>>({});
const reactionLoading = ref<Record<string, boolean>>({});
const commentLoading = ref<Record<string, boolean>>({});

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

// Fetch approved posts from backend WITH API KEY
const fetchPosts = async () => {
  loading.value = true;
  try {
    console.log('🔑 API Key:', API_KEY ? 'Present' : 'Missing');
    console.log('🌐 Fetching from:', `${API_BASE}/api/posts/feed`);
    
    const response = await fetch(`${API_BASE}/api/posts/feed`, {
      headers: {
        'X-API-Key': API_KEY
      }
    });
    
    console.log('📡 Response status:', response.status);
    
    if (response.ok) {
      const postsData = await response.json();
      console.log('✅ Raw posts data:', postsData);
      
      if (!postsData || postsData.length === 0) {
        console.log('📭 No posts found');
        posts.value = [];
        hasMorePosts.value = false;
        return;
      }
      
      // Transform the data to match what the news page expects
      posts.value = postsData.map((post: any) => {
        // Handle different field names from different post structures
        const transformedPost = {
          _id: post._id,
          title: post.title,
          content: post.content,
          // Use description if exists, otherwise create from content
          description: post.description || (post.content ? post.content.substring(0, 100) + '...' : 'No description'),
          // Use type if exists, otherwise use category
          type: post.type || post.category || 'news',
          // Use severity if exists, otherwise default to medium
          severity: post.severity || 'medium',
          location: post.location || '',
          // Handle image field (could be image or imageUrl)
          image: post.image || post.imageUrl || '',
          // Handle video field
          videoUrl: post.videoUrl || '',
          tags: post.tags || [],
          status: post.status,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          authorName: post.authorName || 'Anonymous',
          likes: post.likes || 0,
          dislikes: post.dislikes || 0,
          commentCount: post.commentCount || 0,
          userReaction: null
        };
        
        console.log('🔄 Transformed post:', transformedPost);
        return transformedPost;
      });
      
      hasMorePosts.value = postsData.length === 10;
      currentPage.value = 1;
      
      console.log('✅ Posts loaded:', posts.value.length);
      console.log('✅ Final posts array:', posts.value);
    } else {
      const errorText = await response.text();
      console.error('❌ Failed to load posts:', response.status, errorText);
    }
  } catch (error) {
    console.error('❌ Network error:', error);
  } finally {
    loading.value = false;
  }
};
// Load more posts WITH API KEY
const loadMorePosts = async () => {
  loadingMore.value = true;
  try {
    const nextPage = currentPage.value + 1;
    // Note: Your feed endpoint might not support pagination parameters
    const response = await fetch(`${API_BASE}/api/posts/feed`, {
      headers: {
        'X-API-Key': API_KEY
      }
    });
    
    if (response.ok) {
      const postsData = await response.json();
      
      const newPosts = postsData.map((post: any) => ({
        _id: post._id,
        title: post.title,
        content: post.content,
        description: post.description || (post.content ? post.content.substring(0, 100) + '...' : 'No description'),
        type: post.type || post.category || 'news',
        severity: post.severity || 'medium',
        location: post.location || '',
        image: post.image || post.imageUrl || '',
        videoUrl: post.videoUrl || '',
        tags: post.tags || [],
        status: post.status,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        authorName: post.authorName || 'Anonymous',
        likes: post.likes || 0,
        dislikes: post.dislikes || 0,
        commentCount: post.commentCount || 0,
        userReaction: null
      }));
      
      // Since feed endpoint might not support pagination, we'll just replace the posts
      posts.value = newPosts;
      hasMorePosts.value = false; // Disable load more if no pagination
    } else {
      console.error('Failed to load more posts');
    }
  } catch (error) {
    console.error('Network error:', error);
  } finally {
    loadingMore.value = false;
  }
};

// Fetch reactions for a specific item
const fetchReactions = async (parentType: string, parentId: string) => {
  try {
    const userId = user.value?.id;
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
    console.error('Error fetching reactions:', error);
    return { likes: 0, dislikes: 0, userReaction: null };
  }
};

// Toggle like/dislike reaction - FIXED TypeScript errors
const toggleReaction = async (postId: string, type: 'like' | 'dislike') => {
  if (!user.value) {
    console.log('Please log in to react to posts');
    return;
  }

  // Set loading state for this specific post
  reactionLoading.value[postId] = true;

  try {
    const postIndex = posts.value.findIndex(p => p._id === postId);
    if (postIndex === -1) {
      console.error('Post not found:', postId);
      return;
    }

    const post = posts.value[postIndex];
    if (!post) {
      console.error('Post is undefined at index:', postIndex);
      return;
    }

    const currentReaction = post.userReaction || null;
    const currentLikes = post.likes || 0;
    const currentDislikes = post.dislikes || 0;

    // Calculate new reaction state locally
    let newReaction = null;
    let newLikes = currentLikes;
    let newDislikes = currentDislikes;

    if (currentReaction === type) {
      // Remove reaction if same type clicked
      newReaction = null;
      if (type === 'like') newLikes = Math.max(0, currentLikes - 1);
      if (type === 'dislike') newDislikes = Math.max(0, currentDislikes - 1);
    } else {
      // Switch reaction or add new one
      newReaction = type;
      
      if (type === 'like') {
        newLikes = currentLikes + 1;
        // If switching from dislike, remove dislike
        if (currentReaction === 'dislike') {
          newDislikes = Math.max(0, currentDislikes - 1);
        }
      } else if (type === 'dislike') {
        newDislikes = currentDislikes + 1;
        // If switching from like, remove like
        if (currentReaction === 'like') {
          newLikes = Math.max(0, currentLikes - 1);
        }
      }
    }

    // Update local state immediately
    posts.value[postIndex] = {
      ...post,
      userReaction: newReaction,
      likes: newLikes,
      dislikes: newDislikes
    };

    // Send API request in background
    const response = await fetch(`${API_BASE}/api/reactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify({
        parentType: 'post',
        parentId: postId,
        type: type,
        userId: user.value.id,
        userName: user.value.name
      }),
    });

    if (!response.ok) {
      // If API call fails, revert local changes
      const error = await response.json();
      console.error('Failed to update reaction:', error);
      
      // Revert to original state
      posts.value[postIndex] = {
        ...post,
        userReaction: currentReaction,
        likes: currentLikes,
        dislikes: currentDislikes
      };
    }

  } catch (error) {
    console.error('Network error:', error);
  } finally {
    // Clear loading state
    reactionLoading.value[postId] = false;
  }
};

// Toggle comments section
const toggleComments = async (postId: string) => {
  if (expandedPostId.value === postId) {
    // Hide comments
    expandedPostId.value = null;
  } else {
    // Show comments and fetch them
    expandedPostId.value = postId;
    await fetchComments(postId);
  }
};

// Fetch comments for a post
const fetchComments = async (postId: string) => {
  try {
    const response = await fetch(`${API_BASE}/api/comments/post/${postId}`, {
      headers: {
        'X-API-Key': API_KEY
      }
    });
    
    if (response.ok) {
      const comments = await response.json();
      postComments.value[postId] = comments;
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

// Add a new comment - FIXED TypeScript errors
const addComment = async (postId: string) => {
  if (!user.value) {
    console.log('Please log in to comment');
    return;
  }

  const content = newComments.value[postId]?.trim();
  if (!content) return;

  // Set loading state for this specific post
  commentLoading.value[postId] = true;

  try {
    const postIndex = posts.value.findIndex(p => p._id === postId);
    if (postIndex === -1) {
      console.error('Post not found:', postId);
      return;
    }

    const post = posts.value[postIndex];
    if (!post) {
      console.error('Post is undefined at index:', postIndex);
      return;
    }

    const currentCommentCount = post.commentCount || 0;

    // Update local state immediately - increment comment count
    posts.value[postIndex] = {
      ...post,
      commentCount: currentCommentCount + 1
    };

    // Send API request
    const response = await fetch(`${API_BASE}/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify({
        parentType: 'post',
        parentId: postId,
        content: content,
        userId: user.value.id,
        userName: user.value.name,
        userEmail: user.value.email
      }),
    });

    if (response.ok) {
      const newComment = await response.json();
      newComments.value[postId] = '';
      
      // Add the new comment to local comments list
      if (!postComments.value[postId]) {
        postComments.value[postId] = [];
      }
      postComments.value[postId].unshift(newComment.comment || newComment);
    } else {
      // If API call fails, revert local changes
      const error = await response.json();
      console.error('Failed to add comment:', error);
      
      posts.value[postIndex] = {
        ...post,
        commentCount: currentCommentCount
      };
    }
  } catch (error) {
    console.error('Network error:', error);
  } finally {
    commentLoading.value[postId] = false;
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
  console.log('🔄 News component mounted, fetching posts...');
  fetchPosts();
});
</script>

<style scoped>
.max-h-120 {
  max-height: 30rem;
}
</style>