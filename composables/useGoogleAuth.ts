interface GoogleUser {
  id: string
  name: string
  email: string
  picture: string
  given_name: string
  family_name: string
  role: number // 0 = user, 1 = editor, 2 = admin
}

interface BackendResponse {
  message?: string
  user?: any
  data?: any
  id?: string
  [key: string]: any
}

export const useGoogleAuth = () => {
  const config = useRuntimeConfig()
  const user = ref<GoogleUser | null>(null)
  const isAuthenticated = ref(false)

  // API Keys - use the same pattern as reports.vue
  const getApiHeaders = (operation = 'read') => {
    // Always use the defaultApiKey like in reports.vue
    const apiKey = config.public.defaultApiKey || 'user_key_123'
    
    return {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey
    };
  };

  const loadGoogleScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.getElementById('google-oauth-script')) {
        resolve()
        return
      }

      const script = document.createElement('script')
      script.id = 'google-oauth-script'
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load Google script'))
      document.head.appendChild(script)
    })
  }

  const initializeGoogleAuth = () => {
    if (!window.google) {
      console.error('Google library not loaded')
      return
    }

    try {
      window.google.accounts.id.initialize({
        client_id: config.public.googleClientId,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      })
    } catch (error) {
      console.error('Failed to initialize Google Auth:', error)
    }
  }

  // Simple and reliable JWT decoding function
  const decodeJWT = (token: string): any => {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format')
      }

      const base64Url = parts[1]
      // Simple base64 decoding with padding
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      
      // Add padding
      while (base64.length % 4) {
        base64 += '='
      }
      
      // Decode base64
      const decoded = atob(base64)
      
      // Parse JSON
      return JSON.parse(decoded)
    } catch (error) {
      console.error('JWT decoding error:', error)
      throw new Error('Failed to decode JWT')
    }
  }

  // Test backend connection
  const testBackendConnection = async (): Promise<void> => {
    try {
      console.log('🔍 Testing backend connection...')
      
      const response = await $fetch(`${config.public.apiBaseUrl}/api/users/test`, {
        method: 'GET',
        headers: getApiHeaders()
      })
      
      console.log('✅ Backend connection test:', response)
    } catch (error) {
      console.error('❌ Backend connection test failed:', error)
    }
  }

  // Enhanced backend sync with proper API key
  const syncUserWithBackend = async (userData: any): Promise<GoogleUser> => {
    try {
      console.log('🔐 Attempting to sync user with backend:', userData)

      const response = await $fetch(`${config.public.apiBaseUrl}/api/users/sync`, {
        method: 'POST',
        headers: getApiHeaders(),
        body: {
          userData: {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            photo: userData.picture,
            role: 0
          }
        }
      }) as BackendResponse

      console.log('🔐 Backend sync response:', response)

      // Handle different response formats
      let backendUser = null
      
      if (response?.user) {
        backendUser = response.user
      } else if (response?.id) {
        backendUser = response
      } else if (response?.data) {
        backendUser = response.data
      } else if (response) {
        // If response itself is the user object
        backendUser = response
      }

      if (!backendUser) {
        console.warn('⚠️ No user data in backend response, using local data')
        return {
          ...userData,
          role: 0
        }
      }

      console.log('🔐 Backend user data received:', backendUser)

      const syncedUser = {
        id: backendUser.id || userData.id,
        name: backendUser.name || userData.name,
        email: backendUser.email || userData.email,
        picture: backendUser.photo || backendUser.picture || userData.picture,
        given_name: userData.given_name,
        family_name: userData.family_name,
        role: backendUser.role !== undefined ? backendUser.role : 0
      }

      console.log('✅ User synced successfully with role:', syncedUser.role)
      return syncedUser

    } catch (error: any) {
      console.error('❌ Failed to sync user with backend:', error)
      
      // Log the specific error for debugging
      if (error?.data) {
        console.error('🔍 Backend error details:', error.data)
      }
      
      if (error?.status) {
        console.error('🔍 HTTP Status:', error.status)
      }
      
      // If sync fails, still allow login but with default role
      return {
        ...userData,
        role: 0
      }
    }
  }

  // Fallback user creation method
  const createUserInBackend = async (userData: any): Promise<any> => {
    try {
      console.log('🔐 Attempting to create user in backend...')
      
      const response = await $fetch(`${config.public.apiBaseUrl}/api/users`, {
        method: 'POST',
        headers: getApiHeaders(),
        body: {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          photo: userData.picture,
          role: 0
        }
      })
      
      console.log('✅ User created in backend:', response)
      return response
    } catch (error) {
      console.error('❌ Failed to create user in backend:', error)
      throw error
    }
  }

  // NEW: Verify user role with backend using API keys
  const verifyUserRole = async (): Promise<GoogleUser | null> => {
    try {
      const currentUser = getUserData()
      if (!currentUser) return null

      const response = await $fetch(`${config.public.apiBaseUrl}/api/users/verify-role`, {
        method: 'POST',
        headers: getApiHeaders(),
        body: {
          userData: currentUser
        }
      }) as BackendResponse

      if (response?.user) {
        const verifiedUser = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          picture: response.user.photo || response.user.picture,
          given_name: user.value?.given_name || response.user.name?.split(' ')[0],
          family_name: user.value?.family_name || response.user.name?.split(' ').slice(1).join(' '),
          role: response.user.role
        }

        user.value = verifiedUser
        localStorage.setItem('user', JSON.stringify(verifiedUser))
        
        console.log('🔐 Role verified:', verifiedUser.role)
        return verifiedUser
      }
    } catch (error) {
      console.error('❌ Role verification failed:', error)
    }
    return null
  }

  const handleCredentialResponse = async (response: any) => {
    try {
      const { credential } = response
      
      if (!credential) {
        throw new Error('No credential received')
      }

      console.log('🔐 Received Google credential')

      // Decode the JWT token to get user info
      const userData = decodeJWT(credential)
      
      const userPayload = {
        id: userData.sub,
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
        given_name: userData.given_name,
        family_name: userData.family_name,
        role: 0 // This will be overridden by backend
      }
      
      console.log('👤 Decoded user data:', userPayload)

      // Try to sync with backend
      let syncedUser
      try {
        syncedUser = await syncUserWithBackend(userPayload)
      } catch (syncError) {
        console.warn('⚠️ Sync failed, trying direct user creation...')
        try {
          await createUserInBackend(userPayload)
          // If creation succeeds but doesn't return user data, use local data
          syncedUser = { ...userPayload, role: 0 }
        } catch (createError) {
          console.error('❌ All user creation methods failed, using local data')
          syncedUser = { ...userPayload, role: 0 }
        }
      }
      
      user.value = syncedUser
      isAuthenticated.value = true
      
      // Store in localStorage
      localStorage.setItem('google_token', credential)
      localStorage.setItem('user', JSON.stringify(syncedUser))

      console.log('✅ User authenticated with role:', syncedUser.role)
      console.log('💾 User data stored in localStorage')

      // Redirect to dashboard
      await navigateTo('/success')

    } catch (error) {
      console.error('❌ Authentication failed:', error)
      // Show user-friendly error message
      alert('Authentication failed. Please try again.')
    }
  }

  const renderGoogleButton = (element: HTMLElement, options: any = {}) => {
    if (!window.google) {
      console.error('Google library not loaded')
      return
    }

    try {
      window.google.accounts.id.renderButton(element, {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        text: 'continue_with',
        shape: 'rectangular',
        ...options
      })
    } catch (error) {
      console.error('Failed to render Google button:', error)
    }
  }

  const signIn = async (): Promise<void> => {
    try {
      await loadGoogleScript()
      initializeGoogleAuth()
    } catch (error) {
      console.error('Sign in failed:', error)
    }
  }

  const signOut = (): void => {
    try {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.disableAutoSelect()
        window.google.accounts.id.cancel()
      }
    } catch (error) {
      console.error('Error during Google sign out:', error)
    } finally {
      // Clear all auth data
      user.value = null
      isAuthenticated.value = false
      localStorage.removeItem('google_token')
      localStorage.removeItem('user')
      
      // Redirect to home
      navigateTo('/')
    }
  }

  // Enhanced auth status check with role verification
  const checkAuthStatus = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('google_token')
      const userData = localStorage.getItem('user')
      
      if (token && userData) {
        // Verify token is not expired
        const decoded = decodeJWT(token)
        const currentTime = Date.now() / 1000
        
        if (decoded.exp && decoded.exp > currentTime) {
          const parsedUser = JSON.parse(userData)
          user.value = parsedUser
          isAuthenticated.value = true
          
          // Verify role with backend (but don't block if it fails)
          setTimeout(() => {
            verifyUserRole().catch(console.error)
          }, 1000)
          
        } else {
          // Token expired, clear storage
          signOut()
        }
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
      // Clear invalid data
      localStorage.removeItem('google_token')
      localStorage.removeItem('user')
    }
  }

  // Get user data for API calls
  const getUserData = (): any => {
    if (!user.value) return null
    
    return {
      id: user.value.id,
      email: user.value.email,
      name: user.value.name,
      photo: user.value.picture,
      role: user.value.role
    }
  }

  // Make authenticated API calls with proper API keys
  const apiCall = async (url: string, options: any = {}) => {
    const userData = getUserData()
    
    if (!userData) {
      throw new Error('User not authenticated')
    }

    const headers = getApiHeaders()

    const mergedOptions = {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
        'User-Data': JSON.stringify(userData)
      }
    }

    return await $fetch(`${config.public.apiBaseUrl}${url}`, mergedOptions)
  }

  // Check if user has specific role
  const hasRole = (minRole: number): boolean => {
    return user.value?.role !== undefined && user.value.role >= minRole
  }

  // Check if user is admin
  const isAdmin = (): boolean => {
    return hasRole(2)
  }

  // Check if user is editor
  const isEditor = (): boolean => {
    return hasRole(1)
  }

  // Force refresh user role from backend
  const refreshUserRole = async (): Promise<void> => {
    await verifyUserRole()
  }

  return {
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    signIn,
    signOut,
    renderGoogleButton,
    checkAuthStatus,
    getUserData,
    apiCall,
    hasRole,
    isAdmin,
    isEditor,
    refreshUserRole,
    verifyUserRole,
    getApiHeaders,
    testBackendConnection // Export for debugging
  }
}