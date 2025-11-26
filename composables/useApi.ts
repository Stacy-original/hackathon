export const useApi = () => {
  const config = useRuntimeConfig()
  const { getUserData, apiCall } = useGoogleAuth()

  // Public API calls (no authentication needed)
  const publicApi = {
    // Get all reports
    getReports: () => {
      return $fetch(`${config.public.apiBaseUrl}/api/reports`)
    },

    // Get coordinates
    getCoordinates: () => {
      return $fetch(`${config.public.apiBaseUrl}/api/coordinates`)
    },

    // Get feed posts
    getFeedPosts: () => {
      return $fetch(`${config.public.apiBaseUrl}/api/posts/feed`)
    },

    // Submit report (anonymous or authenticated)
    submitReport: (reportData: any, userData?: any) => {
      const body = userData ? { ...reportData, userData } : reportData
      return $fetch(`${config.public.apiBaseUrl}/api/reports`, {
        method: 'POST',
        body
      })
    },

    // Submit coordinates (anonymous or authenticated)
    submitCoordinates: (coordinateData: any, userData?: any) => {
      const body = userData ? { ...coordinateData, userData } : coordinateData
      return $fetch(`${config.public.apiBaseUrl}/api/coordinates`, {
        method: 'POST',
        body
      })
    }
  }

  // Authenticated API calls (requires user data)
  const authApi = {
    // Get user's reports
    getMyReports: () => {
      return apiCall('/api/my-reports')
    },

    // Update report status (editor+ only)
    updateReportStatus: (reportId: string, status: string) => {
      return apiCall(`/api/reports/${reportId}`, {
        method: 'PUT',
        body: { status }
      })
    },

    // Get all posts (editor+ only)
    getAllPosts: () => {
      return apiCall('/api/posts')
    },

    // Create post (editor+ only)
    createPost: (postData: any) => {
      return apiCall('/api/posts', {
        method: 'POST',
        body: postData
      })
    },

    // Update post status (editor+ only)
    updatePostStatus: (postId: string, status: string) => {
      return apiCall(`/api/posts/${postId}/status`, {
        method: 'PUT',
        body: { status }
      })
    },

    // Get admin stats (admin only)
    getAdminStats: () => {
      return apiCall('/api/admin/stats')
    },

    // Get all users (admin only)
    getUsers: () => {
      return apiCall('/api/users')
    },

    // Update user role (admin only)
    updateUserRole: (userId: string, role: number) => {
      return apiCall(`/api/users/${userId}/role`, {
        method: 'PUT',
        body: { role }
      })
    }
  }

  return {
    public: publicApi,
    auth: authApi
  }
}