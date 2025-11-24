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
    initialized: false,
    token: null as string | null
  }),

  actions: {
    async initializeAuth(): Promise<boolean> {
      if (this.initialized) {
        return this.isAuthenticated;
      }

      console.log('🔄 Initializing auth...');
      
      // Check for token in localStorage
      const token = localStorage.getItem('auth_token');
      if (token) {
        this.token = token;
        const result = await this.validateToken();
        this.initialized = true;
        return result;
      }
      
      this.initialized = true;
      return false;
    },

    async validateToken(): Promise<boolean> {
      if (!this.token) return false;

      this.isLoading = true;
      console.log('🔐 Validating token...');
      
      try {
        const API_BASE = 'https://skogeohydro-backend.onrender.com';
        
        const response = await $fetch<{ valid: boolean; user: any }>(`${API_BASE}/auth/validate`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        
        console.log('📨 Token validation response:', response);
        
        if (response.valid && response.user) {
          this.user = response.user;
          this.isAuthenticated = true;
          console.log('✅ Token valid, user authenticated:', response.user.name);
          return true;
        } else {
          this.clearAuth();
          return false;
        }
      } catch (error: any) {
        console.error('💥 Token validation failed:', error);
        this.clearAuth();
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async checkAuth(): Promise<boolean> {
      // For JWT, this is the same as validateToken
      return this.validateToken();
    },

    setAuth(token: string, user: User) {
      this.token = token;
      this.user = user;
      this.isAuthenticated = true;
      localStorage.setItem('auth_token', token);
      console.log('✅ Auth set for user:', user.name);
    },

    clearAuth() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      this.initialized = false;
      localStorage.removeItem('auth_token');
      console.log('🧹 Auth cleared');
    },

    async logout() {
      try {
        const API_BASE = 'https://skogeohydro-backend.onrender.com';
        
        if (this.token) {
          await $fetch(`${API_BASE}/auth/logout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${this.token}`
            }
          });
        }
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        this.clearAuth();
        await navigateTo('/');
      }
    },

    getLoginUrl(): string {
      const API_BASE = 'https://skogeohydro-backend.onrender.com';
      const currentUrl = typeof window !== 'undefined' ? window.location.origin + '/auth/success' : '';
      return `${API_BASE}/auth/google?redirect=${encodeURIComponent(currentUrl)}`;
    }
  },

  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
    userName: (state) => state.user?.name || 'User'
  }
});