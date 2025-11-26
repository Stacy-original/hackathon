<template>
  <div class="p-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Auth Debug Info</h1>
      <div class="space-x-2">
        <button 
          @click="refreshAuth" 
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh Auth
        </button>
        <button 
          @click="refreshRole" 
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Refresh Role
        </button>
        <button 
          @click="clearAuth" 
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Auth
        </button>
      </div>
    </div>
    
    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
      <h2 class="text-lg font-semibold mb-2">User Info:</h2>
      <pre>{{ JSON.stringify(user, null, 2) }}</pre>
    </div>
    
    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
      <h2 class="text-lg font-semibold mb-2">Auth Status:</h2>
      <p>Authenticated: {{ isAuthenticated }}</p>
      <p>Role: {{ user?.role }}</p>
      <p>Role Text: {{ roleText }}</p>
    </div>
    
    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
      <h2 class="text-lg font-semibold mb-2">Role Checks:</h2>
      <p>Has Role 0 (User): {{ hasRole(0) }}</p>
      <p>Has Role 1 (Editor): {{ hasRole(1) }}</p>
      <p>Has Role 2 (Admin): {{ hasRole(2) }}</p>
      <p>Is Editor: {{ isEditor() }}</p>
      <p>Is Admin: {{ isAdmin() }}</p>
    </div>
    
    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <h2 class="text-lg font-semibold mb-2">Test Protected Routes:</h2>
      <div class="space-y-2">
        <NuxtLink to="/coords" class="block text-blue-600 hover:underline">
          /coords (requires auth)
        </NuxtLink>
        <NuxtLink to="/reports" class="block text-blue-600 hover:underline">
          /reports (requires auth)
        </NuxtLink>
        <NuxtLink to="/editor" class="block text-blue-600 hover:underline">
          /editor (requires role 1+)
        </NuxtLink>
        <NuxtLink to="/admin" class="block text-blue-600 hover:underline">
          /admin (requires role 2)
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { 
  user, 
  isAuthenticated, 
  hasRole, 
  isEditor, 
  isAdmin, 
  checkAuthStatus, 
  refreshUserRole,
  signOut 
} = useGoogleAuth()

const roleText = computed(() => {
  if (!user.value?.role) return 'User'
  switch (user.value.role) {
    case 0: return 'User'
    case 1: return 'Editor'
    case 2: return 'Admin'
    default: return 'User'
  }
})

// Refresh functions
const refreshAuth = async () => {
  console.log('🔄 Refreshing auth status...')
  await checkAuthStatus()
  console.log('✅ Auth status refreshed')
}

const refreshRole = async () => {
  console.log('🔄 Refreshing user role...')
  await refreshUserRole()
  console.log('✅ User role refreshed')
}

const clearAuth = () => {
  console.log('🗑️ Clearing auth data...')
  signOut()
  console.log('✅ Auth data cleared')
}

// Auto-refresh on mount
onMounted(async () => {
  console.log('🔍 Debug page mounted, checking auth...')
  await checkAuthStatus()
})
</script>