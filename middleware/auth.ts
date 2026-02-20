export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated, user, hasRole } = useGoogleAuth()
  
  // Check if route requires auth
  const requiresAuth = to.meta.requiresAuth
  const requiresRole = to.meta.requiresRole as number | undefined
  
  console.log(`🛡️ Route ${to.path} - requiresAuth: ${requiresAuth}, requiresRole: ${requiresRole}`)
  console.log(`🛡️ User authenticated: ${isAuthenticated.value}, user role: ${user.value?.role}`)
  
  if (requiresAuth || requiresRole !== undefined) {
    // Verify user is authenticated
    if (!isAuthenticated.value) {
      console.log('🛡️ Redirecting to login: User not authenticated')
      return navigateTo('/login')
    }
    
    // For role-protected routes, check role
    if (requiresRole !== undefined) {
      console.log(`🛡️ Checking role: Required ${requiresRole}, User has ${user.value?.role}`)
      
      // Use the hasRole function from useGoogleAuth
      if (!hasRole(requiresRole)) {
        console.warn(`🛡️ Access denied: Required role ${requiresRole}, user role ${user.value?.role}`)
        return navigateTo('/unauthorized')
      }
      
      console.log(`🛡️ Role check passed: User has role ${user.value?.role}`)
    }
  }
  
  // Redirect authenticated users away from login page to home
  if (to.path === '/login' && isAuthenticated.value) {
    console.log('🛡️ Redirecting authenticated user from login to home')
    return navigateTo('/login')
  }
})