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
        const config = useRuntimeConfig();
        const API_BASE = config.public.apiBaseUrl;
        
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
        this.user = null;
        this.isAuthenticated = false;
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      try {
        const config = useRuntimeConfig();
        const API_BASE = config.public.apiBaseUrl;
        
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
        
        const { locale } = useI18n();
        const homePath = locale.value === 'en' ? '/' : `/${locale.value}/`;
        await navigateTo(homePath);
      }
    },

    getLoginUrl(): string {
      const config = useRuntimeConfig();
      const API_BASE = config.public.apiBaseUrl;
      return `${API_BASE}/auth/google`;
    }
  },

  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
    userName: (state) => state.user?.name || 'User'
  }
});