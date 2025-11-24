// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  
  console.log('🔐 Auth middleware running for route:', to.path);
  
  // Define routes that require authentication
  const protectedRoutes = [
    '/profile',
    '/my-reports',
    '/dashboard',
    '/admin' // and any other protected routes
  ];
  
  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    to.path.startsWith(route)
  );
  
  console.log('🛡️ Is protected route:', isProtectedRoute);
  
  // If route doesn't require auth, skip the check
  if (!isProtectedRoute) {
    console.log('✅ Public route, skipping auth check');
    return;
  }
  
  console.log('🔄 Checking auth status for protected route...');
  const isAuthenticated = await authStore.checkAuth();
  
  console.log('✅ Auth check result:', isAuthenticated);
  
  if (!isAuthenticated) {
    console.log('❌ User not authenticated, redirecting to login');
    // Redirect to login page if not authenticated
    return navigateTo('/login');
  }
  
  console.log('✅ User authenticated, allowing access to:', to.path);
});