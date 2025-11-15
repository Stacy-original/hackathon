// middleware/admin.auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth();
  
  if (to.path === '/admin-reports' && !isAuthenticated()) {
    return navigateTo('/');
  }
});