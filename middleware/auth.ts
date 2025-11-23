// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  
  console.log('🔐 Auth middleware running for route:', to.path);
  
  // Check if user is authenticated
  const isAuthenticated = await authStore.checkAuth();
  
  if (!isAuthenticated) {
    console.log('❌ User not authenticated, redirecting to home');
    // Redirect to home page if not authenticated
    return navigateTo('/');
  }
  
  console.log('✅ User authenticated, allowing access');
});