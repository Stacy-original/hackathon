// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  
  console.log('🔐 Auth middleware running for route:', to.path);
  
  // Define routes that require authentication
  const protectedRoutes = [
    '/profile',
    '/my-reports',
    '/dashboard',
    '/admin'
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
  
  // For JWT, we validate the token
  const isAuthenticated = await authStore.validateToken();
  
  console.log('✅ Auth check result:', isAuthenticated);
  
  if (!isAuthenticated) {
    console.log('❌ User not authenticated, redirecting to login');
    return navigateTo('/login');
  }
  
  console.log('✅ User authenticated, allowing access to:', to.path);
});