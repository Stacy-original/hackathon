<template>
  <div class="py-8">
    <div class="container mx-auto px-4 max-w-4xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">
          {{ $t('createPost') }}
        </h1>
        <p class="text-xl text-[#5A6A85] dark:text-[#A9B4C6] max-w-2xl mx-auto">
          {{ $t('createPostDescription') }}
        </p>
      </div>

      <!-- Create Post Form -->
      <div class="bg-white dark:bg-[#212832] rounded-2xl p-8 shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
        <form @submit.prevent="submitPost" class="space-y-6">
          <!-- Title -->
          <div>
            <label for="title" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
              {{ $t('title') }} *
            </label>
            <input
              id="title"
              v-model="postForm.title"
              type="text"
              required
              class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200"
              :placeholder="$t('title')"
            >
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
              {{ $t('description') }} *
            </label>
            <textarea
              id="description"
              v-model="postForm.description"
              required
              rows="3"
              class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200 resize-none"
              :placeholder="$t('description')"
            ></textarea>
          </div>

          <!-- Content -->
          <div>
            <label for="content" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
              {{ $t('content') }} *
            </label>
            <textarea
              id="content"
              v-model="postForm.content"
              required
              rows="6"
              class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200 resize-none"
              :placeholder="$t('content')"
            ></textarea>
          </div>

          <!-- Post Type and Severity -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Post Type -->
            <div>
              <label class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-3">
                {{ $t('postType') }}
              </label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  v-for="type in postTypes"
                  :key="type.value"
                  @click="postForm.type = type.value"
                  :class="[
                    'py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200',
                    postForm.type === type.value
                      ? 'bg-[#1E6DFF] text-white border-[#1E6DFF]'
                      : 'bg-white dark:bg-[#1A1F27] text-[#5A6A85] dark:text-[#A9B4C6] border-[#E2E8F0] dark:border-[#313B47] hover:border-[#1E6DFF]'
                  ]"
                >
                  {{ $t(type.value) }}
                </button>
              </div>
            </div>

            <!-- Severity -->
            <div>
              <label class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-3">
                {{ $t('severityLevel') }}
              </label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  v-for="severity in severityLevels"
                  :key="severity.value"
                  @click="postForm.severity = severity.value"
                  :class="[
                    'py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200',
                    postForm.severity === severity.value
                      ? severity.bgColor + ' ' + severity.textColor + ' border-current'
                      : 'bg-white dark:bg-[#1A1F27] text-[#5A6A85] dark:text-[#A9B4C6] border-[#E2E8F0] dark:border-[#313B47] hover:border-current'
                  ]"
                >
                  {{ $t(severity.value) }}
                </button>
              </div>
            </div>
          </div>

          <!-- Location -->
          <div>
            <label for="location" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
              {{ $t('location') }}
            </label>
            <input
              id="location"
              v-model="postForm.location"
              type="text"
              class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200"
              :placeholder="$t('location')"
            >
          </div>

          <!-- Media Uploads -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Image URL -->
            <div>
              <label for="imageUrl" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
                {{ $t('imageUrl') }}
              </label>
              <input
                id="imageUrl"
                v-model="postForm.imageUrl"
                type="url"
                class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200"
                :placeholder="$t('imageUrl')"
                @input="handleImageUrlChange"
              >
            </div>

            <!-- Video URL -->
            <div>
              <label for="videoUrl" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
                {{ $t('videoUrl') }}
              </label>
              <input
                id="videoUrl"
                v-model="postForm.videoUrl"
                type="url"
                class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200"
                :placeholder="$t('videoUrl')"
                @input="handleVideoUrlChange"
              >
            </div>
          </div>

          <!-- Media Previews -->
          <div v-if="postForm.imageUrl || postForm.videoUrl" class="border border-[#E2E8F0] dark:border-[#313B47] rounded-lg p-4">
            <h3 class="text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-3">{{ $t('mediaPreview') }}</h3>
            
            <!-- Image Preview -->
            <div v-if="postForm.imageUrl && !postForm.videoUrl" class="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img 
                :src="postForm.imageUrl" 
                :alt="$t('imagePreview')"
                class="w-full h-full object-cover"
                @load="handleImageLoad"
                @error="handleImageError"
              >
              <div v-if="imageLoading" class="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6DFF]"></div>
              </div>
            </div>

            <!-- Video Preview -->
            <div v-if="postForm.videoUrl && !postForm.imageUrl" class="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <!-- YouTube/Vimeo Embed -->
              <iframe
                v-if="isEmbeddableVideo(postForm.videoUrl)"
                :src="getEmbedUrl(postForm.videoUrl)"
                class="w-full h-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                @load="handleVideoLoad"
                @error="handleVideoError"
              ></iframe>
              
              <!-- Direct Video File -->
              <video
                v-else
                :src="postForm.videoUrl"
                class="w-full h-full object-cover"
                controls
                @loadstart="handleVideoLoadStart"
                @loadeddata="handleVideoLoad"
                @error="handleVideoError"
              >
                {{ $t('videoNotSupported') }}
              </video>
              
              <div v-if="videoLoading" class="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6DFF]"></div>
              </div>
            </div>

            <!-- Clear Media Button -->
            <div class="mt-3 flex justify-end">
              <button
                type="button"
                @click="clearMedia"
                class="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                {{ $t('clearMedia') }}
              </button>
            </div>
          </div>

          <!-- Tags -->
          <div>
            <label for="tags" class="block text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
              {{ $t('tags') }}
            </label>
            <input
              id="tags"
              v-model="tagInput"
              type="text"
              class="w-full px-4 py-3 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF] focus:border-transparent transition-all duration-200"
              :placeholder="$t('tags')"
              @keydown.enter.prevent="addTag"
            >
            <div class="flex flex-wrap gap-2 mt-2">
              <span
                v-for="(tag, index) in postForm.tags"
                :key="index"
                class="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[#1E6DFF] text-white"
              >
                {{ tag }}
                <button
                  type="button"
                  @click="removeTag(index)"
                  class="ml-2 hover:text-gray-200"
                >
                  ×
                </button>
              </span>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end pt-4">
            <button
              type="button"
              @click="resetForm"
              class="px-6 py-3 border border-[#E2E8F0] dark:border-[#313B47] text-[#5A6A85] dark:text-[#A9B4C6] rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-[#1A1F27] transition-colors mr-4"
            >
              {{ $t('reset') }}
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              :class="[
                'px-8 py-3 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg font-medium transition-all duration-200 hover:scale-105',
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              ]"
            >
              {{ isSubmitting ? $t('submitting') : $t('createPost') }}
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
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});
// Define translations for this page only
const { $i18n } = useNuxtApp()

$i18n.mergeLocaleMessage('en', {
  createPost: 'Create Post',
  createPostDescription: 'Create a new post for the community feed',
  title: 'Title',
  description: 'Description',
  content: 'Content',
  postType: 'Post Type',
  location: 'Location',
  imageUrl: 'Image URL',
  videoUrl: 'Video URL',
  imagePreview: 'Image Preview',
  mediaPreview: 'Media Preview',
  tags: 'Tags',
  reset: 'Reset',
  submitting: 'Submitting...',
  news: 'News',
  alert: 'Alert',
  update: 'Update',
  event: 'Event',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
  clearMedia: 'Clear Media',
  videoNotSupported: 'Your browser does not support the video tag.'
})

$i18n.mergeLocaleMessage('ru', {
  createPost: 'Создать пост',
  createPostDescription: 'Создайте новый пост для ленты сообщества',
  title: 'Заголовок',
  description: 'Описание',
  content: 'Содержание',
  postType: 'Тип поста',
  location: 'Местоположение',
  imageUrl: 'URL изображения',
  videoUrl: 'URL видео',
  imagePreview: 'Предпросмотр изображения',
  mediaPreview: 'Предпросмотр медиа',
  tags: 'Теги',
  reset: 'Сбросить',
  submitting: 'Отправка...',
  news: 'Новости',
  alert: 'Оповещение',
  update: 'Обновление',
  event: 'Событие',
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
  critical: 'Критический',
  clearMedia: 'Очистить медиа',
  videoNotSupported: 'Ваш браузер не поддерживает видео тег.'
})

$i18n.mergeLocaleMessage('kk', {
  createPost: 'Пост жасау',
  createPostDescription: 'Қауымдастық лентасы үшін жаңа пост жасаңыз',
  title: 'Тақырып',
  description: 'Сипаттама',
  content: 'Мазмұны',
  postType: 'Пост түрі',
  location: 'Орналасқан жері',
  imageUrl: 'Сурет URL мекенжайы',
  videoUrl: 'Бейне URL мекенжайы',
  imagePreview: 'Суретті алдын ала қарау',
  mediaPreview: 'Медианы алдын ала қарау',
  tags: 'Тегтер',
  reset: 'Қалпына келтіру',
  submitting: 'Жіберілуде...',
  news: 'Жаңалықтар',
  alert: 'Ескерту',
  update: 'Жаңарту',
  event: 'Оқиға',
  low: 'Төмен',
  medium: 'Орташа',
  high: 'Жоғары',
  critical: 'Сыни',
  clearMedia: 'Медианы тазалау',
  videoNotSupported: 'Сіздің браузеріңіз бейне тегін қолдамайды.'
})

// ✅ UPDATE THIS URL WITH YOUR RENDER URL
const API_BASE = 'https://skogeohydro-backend.onrender.com';

// Define types
interface Post {
  title: string;
  content: string;
  description: string;
  severity: string;
  type: string;
  location: string;
  imageUrl: string;
  videoUrl: string;
  tags: string[];
}

interface Message {
  text: string;
  type: 'success' | 'error';
}

// Reactive data
const isSubmitting = ref<boolean>(false);
const message = ref<Message | null>(null);
const imageLoading = ref<boolean>(false);
const videoLoading = ref<boolean>(false);
const tagInput = ref<string>('');

const postForm = ref<Post>({
  title: '',
  content: '',
  description: '',
  severity: 'medium',
  type: 'news',
  location: '',
  imageUrl: '',
  videoUrl: '',
  tags: []
});

// Post types
const postTypes = [
  { value: 'news', label: 'News' },
  { value: 'alert', label: 'Alert' },
  { value: 'update', label: 'Update' },
  { value: 'event', label: 'Event' }
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

// Show message
const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
  message.value = { text, type };
  setTimeout(() => {
    message.value = null;
  }, 5000);
};

// Add tag
const addTag = () => {
  if (tagInput.value.trim() && !postForm.value.tags.includes(tagInput.value.trim())) {
    postForm.value.tags.push(tagInput.value.trim());
    tagInput.value = '';
  }
};

// Remove tag
const removeTag = (index: number) => {
  postForm.value.tags.splice(index, 1);
};

// Handle image URL change
const handleImageUrlChange = () => {
  if (postForm.value.imageUrl.trim()) {
    // Clear video URL if image URL is entered
    postForm.value.videoUrl = '';
    imageLoading.value = true;
    videoLoading.value = false;
  }
};

// Handle video URL change
const handleVideoUrlChange = () => {
  if (postForm.value.videoUrl.trim()) {
    // Clear image URL if video URL is entered
    postForm.value.imageUrl = '';
    videoLoading.value = true;
    imageLoading.value = false;
  }
};

// Handle image load
const handleImageLoad = () => {
  imageLoading.value = false;
};

// Handle image error
const handleImageError = () => {
  imageLoading.value = false;
  showMessage('Failed to load image. Please check the URL.', 'error');
};

// Handle video load start
const handleVideoLoadStart = () => {
  videoLoading.value = true;
};

// Handle video load
const handleVideoLoad = () => {
  videoLoading.value = false;
};

// Handle video error
const handleVideoError = () => {
  videoLoading.value = false;
  showMessage('Failed to load video. Please check the URL.', 'error');
};

// Clear media
const clearMedia = () => {
  postForm.value.imageUrl = '';
  postForm.value.videoUrl = '';
  imageLoading.value = false;
  videoLoading.value = false;
};

// Reset form
const resetForm = () => {
  postForm.value = {
    title: '',
    content: '',
    description: '',
    severity: 'medium',
    type: 'news',
    location: '',
    imageUrl: '',
    videoUrl: '',
    tags: []
  };
  tagInput.value = '';
  imageLoading.value = false;
  videoLoading.value = false;
};

// Submit post to backend
const submitPost = async () => {
  if (!postForm.value.title || !postForm.value.description || !postForm.value.content) {
    showMessage('Please fill in all required fields', 'error');
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await fetch(`${API_BASE}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postForm.value),
    });

    if (response.ok) {
      showMessage('Post created successfully! It will be reviewed by admin before appearing in the feed.');
      resetForm();
    } else {
      const error = await response.json();
      showMessage(error.error || 'Failed to create post', 'error');
    }
  } catch (error) {
    showMessage('Network error. Please try again.', 'error');
  } finally {
    isSubmitting.value = false;
  }
};
</script>