<template>
  <div class="py-8">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">
          Reports Management
        </h1>
        <p class="text-xl text-[#5A6A85] dark:text-[#A9B4C6]">
          Manage and review all submitted water condition reports
        </p>
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
            class="px-6 py-2 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg font-medium transition-colors"
          >
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
</template>

<script setup>
// ✅ UPDATE THIS URL WITH YOUR RENDER URL
const API_BASE = 'https://skogeohydro-backend.onrender.com';

// Reactive data
const allReports = ref([]);
const loading = ref(false);
const filters = ref({
  status: '',
  severity: '',
  type: '',
  search: ''
});

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
      // Revert the change in UI
      await fetchReports();
    }
  } catch (error) {
    console.error('Network error:', error);
    // Revert the change in UI
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
      await fetchReports(); // Refresh the list
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
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
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

// Fetch reports when component mounts
onMounted(() => {
  fetchReports();
});
</script>