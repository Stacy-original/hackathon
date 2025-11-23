// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  
  console.log('🔐 Auth middleware running for route:', to.path);
  console.log('📝 Route meta:', to.meta);
  
  // Check if user is authenticated
  console.log('🔄 Checking auth status...');
  const isAuthenticated = await authStore.checkAuth();
  
  console.log('✅ Auth check result:', isAuthenticated);
  console.log('👤 User state:', authStore.user);
  console.log('🔑 Is authenticated:', authStore.isAuthenticated);
  
  if (!isAuthenticated) {
    console.log('❌ User not authenticated, redirecting to home');
    // Redirect to home page if not authenticated
    return navigateTo('/');
  }
  
  console.log('✅ User authenticated, allowing access to:', to.path);
});