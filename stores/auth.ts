// stores/auth.ts
interface User {
  id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
}

interface AuthResponse {
  user: User;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
    isLoading: false,
    initialized: false
  }),

  actions: {
    async initializeAuth(): Promise<boolean> {
      if (this.initialized) {
        return this.isAuthenticated;
      }

      console.log('🔄 Initializing auth...');
      const result = await this.checkAuth();
      this.initialized = true;
      return result;
    },

    async checkAuth(): Promise<boolean> {
      if (this.isLoading) {
        return this.isAuthenticated;
      }

      this.isLoading = true;
      console.log('🔐 Checking auth status...');
      
      try {
        // Use direct URL since config might not be available yet
        const API_BASE = 'https://skogeohydro-backend.onrender.com';
        
        console.log('🌐 Calling auth endpoint:', `${API_BASE}/auth/user`);
        
        const response = await $fetch<AuthResponse>(`${API_BASE}/auth/user`, {
          credentials: 'include',
          retry: 1,
          timeout: 10000
        });
        
        console.log('📨 Auth response:', response);
        
        if (response && response.user) {
          this.user = response.user;
          this.isAuthenticated = true;
          console.log('✅ User authenticated:', response.user.name);
          return true;
        }
        
        console.log('❌ No user data in response');
        this.user = null;
        this.isAuthenticated = false;
        return false;
      } catch (error: any) {
        console.error('💥 Auth check failed:', error);
        // Don't clear state on network errors, just return current status
        return this.isAuthenticated;
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      try {
        const API_BASE = 'https://skogeohydro-backend.onrender.com';
        
        await $fetch(`${API_BASE}/auth/logout`, {
          method: 'POST',
          credentials: 'include'
        });
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        this.user = null;
        this.isAuthenticated = false;
        this.initialized = false;
        
        // Use navigateTo from nuxt app
        await navigateTo('/');
      }
    },

    getLoginUrl(): string {
      const API_BASE = 'https://skogeohydro-backend.onrender.com';
      const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';
      return `${API_BASE}/auth/google?redirect=${encodeURIComponent(currentUrl)}`;
    }
  },

  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
    userName: (state) => state.user?.name || 'User'
  }
});