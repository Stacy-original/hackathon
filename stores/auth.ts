export const useAuthStore = defineStore('auth', () => {
  const { user, isAuthenticated, signIn, signOut, checkAuthStatus } = useGoogleAuth()

  return {
    user,
    isAuthenticated,
    signIn,
    signOut,
    checkAuthStatus,
  }
})