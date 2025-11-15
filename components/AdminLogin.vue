<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0E1117] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 bg-[#1E6DFF] rounded-lg flex items-center justify-center">
          <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-[#1A1A1A] dark:text-[#F1F5FF]">
          Admin Login
        </h2>
        <p class="mt-2 text-center text-sm text-[#5A6A85] dark:text-[#A9B4C6]">
          Enter your credentials to access the admin panel
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              v-model="username"
              name="username"
              type="text"
              required
              class="relative block w-full px-3 py-3 border border-[#E2E8F0] dark:border-[#313B47] bg-white dark:bg-[#1A1F27] text-[#1A1A1A] dark:text-[#F1F5FF] rounded-t-lg focus:outline-none focus:ring-[#1E6DFF] focus:border-[#1E6DFF] focus:z-10 sm:text-sm placeholder-[#5A6A85] dark:placeholder-[#A9B4C6]"
              placeholder="Username"
              autocomplete="username"
            >
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              class="relative block w-full px-3 py-3 border border-[#E2E8F0] dark:border-[#313B47] border-t-0 bg-white dark:bg-[#1A1F27] text-[#1A1A1A] dark:text-[#F1F5FF] rounded-b-lg focus:outline-none focus:ring-[#1E6DFF] focus:border-[#1E6DFF] focus:z-10 sm:text-sm placeholder-[#5A6A85] dark:placeholder-[#A9B4C6]"
              placeholder="Password"
              autocomplete="current-password"
            >
          </div>
        </div>

        <div v-if="error" class="bg-[#FF4E4E] dark:bg-[#FF6B6B] text-white p-3 rounded-lg text-sm text-center">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            :class="[
              'group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#1E6DFF] hover:bg-[#1458CC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E6DFF] transition-all duration-200',
              loading ? 'opacity-50 cursor-not-allowed' : ''
            ]"
          >
            <span v-if="loading" class="flex items-center">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Signing in...
            </span>
            <span v-else>Sign in</span>
          </button>
        </div>

        <!-- Demo credentials hint -->
        <div class="text-center">
          <p class="text-xs text-[#5A6A85] dark:text-[#A9B4C6]">
            Demo: admin337 / 3141
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const { login } = useAuth();

const handleLogin = async () => {
  error.value = '';
  loading.value = true;

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    if (login(username.value, password.value)) {
      // Redirect to admin panel
      await navigateTo('/admin-reports');
    } else {
      error.value = 'Invalid username or password';
    }
  } catch (err) {
    error.value = 'Login failed. Please try again.';
  } finally {
    loading.value = false;
  }
};

// Auto-focus username field on mount
onMounted(() => {
  const usernameInput = document.getElementById('username');
  if (usernameInput) {
    usernameInput.focus();
  }
});
</script>