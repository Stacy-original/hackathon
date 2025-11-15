<template>
  <div>
    <!-- Login Form (shown when not authenticated) -->
    <div v-if="!isAuthenticated" class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0E1117] py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <div class="mx-auto h-12 w-12 bg-[#1E6DFF] rounded-lg flex items-center justify-center">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-[#1A1A1A] dark:text-[#F1F5FF]">
            Admin Login
          </h2>
          <p class="mt-2 text-center text-sm text-[#5A6A85] dark:text-[#A9B4C6]">
            Enter your credentials to access the admin panel
          </p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="username" class="sr-only">Username</label>
              <input
                id="username"
                v-model="username"
                name="username"
                type="text"
                required
                class="relative block w-full px-3 py-3 border border-[#E2E8F0] dark:border-[#313B47] bg-white dark:bg-[#1A1F27] text-[#1A1A1A] dark:text-[#F1F5FF] rounded-t-lg focus:outline-none focus:ring-[#1E6DFF] focus:border-[#1E6DFF] focus:z-10 sm:text-sm placeholder-[#5A6A85] dark:placeholder-[#A9B4C6]"
                placeholder="Username"
                autocomplete="username"
              >
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                required
                class="relative block w-full px-3 py-3 border border-[#E2E8F0] dark:border-[#313B47] border-t-0 bg-white dark:bg-[#1A1F27] text-[#1A1A1A] dark:text-[#F1F5FF] rounded-b-lg focus:outline-none focus:ring-[#1E6DFF] focus:border-[#1E6DFF] focus:z-10 sm:text-sm placeholder-[#5A6A85] dark:placeholder-[#A9B4C6]"
                placeholder="Password"
                autocomplete="current-password"
              >
            </div>
          </div>

          <div v-if="error" class="bg-[#FF4E4E] dark:bg-[#FF6B6B] text-white p-3 rounded-lg text-sm text-center">
            {{ error }}
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              :class="[
                'group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#1E6DFF] hover:bg-[#1458CC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E6DFF] transition-all duration-200',
                loading ? 'opacity-50 cursor-not-allowed' : ''
              ]"
            >
              <span v-if="loading" class="flex items-center">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing in...
              </span>
              <span v-else>Sign in</span>
            </button>
          </div>

        </form>
      </div>
    </div>

    <!-- Admin Panel (shown when authenticated) -->
    <div v-else class="py-8">
      <div class="container mx-auto px-4 max-w-6xl">
        <!-- Header with Logout -->
        <div class="flex justify-between items-center mb-12">
          <div>
            <h1 class="text-4xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-2">
              Reports Management
            </h1>
            <p class="text-xl text-[#5A6A85] dark:text-[#A9B4C6]">
              Manage and review all submitted water condition reports
            </p>
          </div>
          <button 
            @click="handleLogout"
            class="px-6 py-3 bg-[#FF4E4E] hover:bg-[#DC2626] text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white dark:bg-[#212832] p-6 rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
            <div class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF]">{{ stats.total }}</div>
            <div class="text-[#5A6A85] dark:text-[#A9B4C6] text-sm">Total Reports</div>
          </div>
          <div class="bg-white dark:bg-[#212832] p-6 rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
            <div class="text-2xl font-bold text-[#FFCB2F] dark:text-[#FFDD57]">{{ stats.pending }}</div>
            <div class="text-[#5A6A85] dark:text-[#A9B4C6] text-sm">Pending</div>
          </div>
          <div class="bg-white dark:bg-[#212832] p-6 rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
            <div class="text-2xl font-bold text-[#1E6DFF] dark:text-[#6CA8FF]">{{ stats.reviewed }}</div>
            <div class="text-[#5A6A85] dark:text-[#A9B4C6] text-sm">Reviewed</div>
          </div>
          <div class="bg-white dark:bg-[#212832] p-6 rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
            <div class="text-2xl font-bold text-[#2ECC71] dark:text-[#38E39A]">{{ stats.resolved }}</div>
            <div class="text-[#5A6A85] dark:text-[#A9B4C6] text-sm">Resolved</div>
          </div>
        </div>

        <!-- Filters -->
        <div class="bg-white dark:bg-[#212832] rounded-2xl p-6 shadow-sm border border-[#E2E8F0] dark:border-[#313B47] mb-6">
          <div class="flex flex-col md:flex-row gap-4 items-center">
            <div class="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              <select v-model="filters.status" class="px-4 py-2 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF]">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="resolved">Resolved</option>
              </select>
              <select v-model="filters.severity" class="px-4 py-2 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF]">
                <option value="">All Severity</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
              <select v-model="filters.type" class="px-4 py-2 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF]">
                <option value="">All Types</option>
                <option v-for="type in reportTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
              </select>
              <input
                v-model="filters.search"
                type="text"
                placeholder="Search location..."
                class="px-4 py-2 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF]"
              >
            </div>
            <button 
              @click="fetchReports"
              class="px-6 py-2 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        <!-- Reports Table -->
        <div class="bg-white dark:bg-[#212832] rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-[#313B47] overflow-hidden">
          <div v-if="loading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6DFF]"></div>
            <p class="text-[#5A6A85] dark:text-[#A9B4C6] mt-2">Loading reports...</p>
          </div>

          <div v-else-if="filteredReports.length === 0" class="text-center py-8">
            <p class="text-[#5A6A85] dark:text-[#A9B4C6]">No reports found.</p>
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-[#E2E8F0] dark:border-[#313B47]">
                  <th class="text-left p-4 text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">Location</th>
                  <th class="text-left p-4 text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">Type</th>
                  <th class="text-left p-4 text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">Severity</th>
                  <th class="text-left p-4 text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">Status</th>
                  <th class="text-left p-4 text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">Date</th>
                  <th class="text-left p-4 text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="report in filteredReports" 
                  :key="report.id"
                  class="border-b border-[#E2E8F0] dark:border-[#313B47] hover:bg-[#F5F8FF] dark:hover:bg-[#1A1F27] transition-colors"
                >
                  <td class="p-4">
                    <div class="font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">{{ report.location }}</div>
                    <div class="text-sm text-[#5A6A85] dark:text-[#A9B4C6] truncate max-w-xs">{{ report.description }}</div>
                  </td>
                  <td class="p-4">
                    <span class="text-sm text-[#1E6DFF] dark:text-[#6CA8FF] font-medium capitalize">
                      {{ report.type }}
                    </span>
                  </td>
                  <td class="p-4">
                    <span :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      getSeverityColor(report.severity)
                    ]">
                      {{ getSeverityLabel(report.severity) }}
                    </span>
                  </td>
                  <td class="p-4">
                    <span :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      getStatusColor(report.status)
                    ]">
                      {{ report.status }}
                    </span>
                  </td>
                  <td class="p-4 text-sm text-[#5A6A85] dark:text-[#A9B4C6]">
                    {{ formatDate(report.createdAt) }}
                  </td>
                  <td class="p-4">
                    <div class="flex gap-2">
                      <select 
                        v-model="report.status" 
                        @change="updateReportStatus(report.id, report.status)"
                        class="px-2 py-1 text-xs bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded text-[#1A1A1A] dark:text-[#F1F5FF] focus:outline-none focus:ring-1 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF]"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <button 
                        @click="deleteReport(report.id)"
                        class="px-2 py-1 text-xs bg-[#FF4E4E] hover:bg-[#DC2626] text-white rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// API base URL - update this with your Render URL
const API_BASE = 'https://skogeohydro-backend.onrender.com';

// Authentication state
const isAuthenticated = ref(false);
const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

// Reports data
const allReports = ref([]);
const filters = ref({
  status: '',
  severity: '',
  type: '',
  search: ''
});

// Login handler
const handleLogin = async () => {
  error.value = '';
  loading.value = true;

  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    if (username.value === 'admin337' && password.value === '3141') {
      isAuthenticated.value = true;
      fetchReports();
    } else {
      error.value = 'Invalid username or password';
    }
  } catch (err) {
    error.value = 'Login failed. Please try again.';
  } finally {
    loading.value = false;
  }
};

// Logout handler
const handleLogout = () => {
  isAuthenticated.value = false;
  username.value = '';
  password.value = '';
  allReports.value = [];
};

// Stats computed
const stats = computed(() => {
  const total = allReports.value.length;
  const pending = allReports.value.filter(r => r.status === 'pending').length;
  const reviewed = allReports.value.filter(r => r.status === 'reviewed').length;
  const resolved = allReports.value.filter(r => r.status === 'resolved').length;
  
  return { total, pending, reviewed, resolved };
});

const filteredReports = computed(() => {
  return allReports.value.filter(report => {
    const matchesStatus = !filters.value.status || report.status === filters.value.status;
    const matchesSeverity = !filters.value.severity || report.severity === filters.value.severity;
    const matchesType = !filters.value.type || report.type === filters.value.type;
    const matchesSearch = !filters.value.search || 
      report.location.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      report.description.toLowerCase().includes(filters.value.search.toLowerCase());
    
    return matchesStatus && matchesSeverity && matchesType && matchesSearch;
  });
});

// Report types
const reportTypes = [
  { value: 'pollution', label: 'Pollution' },
  { value: 'algae', label: 'Algae Bloom' },
  { value: 'odor', label: 'Unusual Odor' },
  { value: 'color', label: 'Color Change' },
  { value: 'flooding', label: 'Flooding' },
  { value: 'wildlife', label: 'Wildlife Impact' },
  { value: 'other', label: 'Other' }
];

// Fetch all reports
const fetchReports = async () => {
  loading.value = true;
  try {
    const response = await fetch(`${API_BASE}/api/reports`);
    if (response.ok) {
      const reports = await response.json();
      allReports.value = reports;
    } else {
      console.error('Failed to fetch reports');
    }
  } catch (error) {
    console.error('Network error:', error);
  } finally {
    loading.value = false;
  }
};

// Update report status
const updateReportStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_BASE}/api/reports/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Failed to update report:', error);
      await fetchReports();
    }
  } catch (error) {
    console.error('Network error:', error);
    await fetchReports();
  }
};

// Delete report
const deleteReport = async (id) => {
  if (!confirm('Are you sure you want to delete this report?')) return;

  try {
    const response = await fetch(`${API_BASE}/api/reports/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      await fetchReports();
    } else {
      const error = await response.json();
      console.error('Failed to delete report:', error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// Helper functions
const getSeverityColor = (severity) => {
  const severityMap = {
    low: 'bg-[#2ECC71] dark:bg-[#38E39A] text-white',
    medium: 'bg-[#FFCB2F] dark:bg-[#FFDD57] text-[#1A1A1A]',
    high: 'bg-[#FF4E4E] dark:bg-[#FF6B6B] text-white',
    critical: 'bg-[#DC2626] dark:bg-[#EF4444] text-white'
  };
  return severityMap[severity] || severityMap.medium;
};

const getSeverityLabel = (severity) => {
  const labelMap = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical'
  };
  return labelMap[severity] || 'Medium';
};

const getStatusColor = (status) => {
  const statusMap = {
    pending: 'bg-[#FFCB2F] dark:bg-[#FFDD57] text-[#1A1A1A]',
    reviewed: 'bg-[#1E6DFF] dark:bg-[#6CA8FF] text-white',
    resolved: 'bg-[#2ECC71] dark:bg-[#38E39A] text-white'
  };
  return statusMap[status] || statusMap.pending;
};
</script>