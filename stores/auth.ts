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
    isLoading: false
  }),

  actions: {
    async checkAuth(): Promise<boolean> {
      // Prevent multiple simultaneous auth checks
      if (this.isLoading) {
        return this.isAuthenticated;
      }

      this.isLoading = true;
      try {
        const config = useRuntimeConfig();
        const API_BASE = config.public.apiBaseUrl;
        
        const response = await $fetch<AuthResponse>(`${API_BASE}/auth/user`, {
          credentials: 'include',
          retry: 1,
          timeout: 10000
        });
        
        if (response && response.user) {
          this.user = response.user;
          this.isAuthenticated = true;
          return true;
        }
        return false;
      } catch (error) {
        console.error('Auth check failed:', error);
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
        // Use navigateTo with proper locale handling
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