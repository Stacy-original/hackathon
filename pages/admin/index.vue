<template>
  <div class="py-8">
    <div class="container mx-auto px-4 max-w-7xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF] mb-4">
          Admin Dashboard
        </h1>
        <p class="text-xl text-[#5A6A85] dark:text-[#A9B4C6]">
          Manage reports, coordinates, and posts
        </p>
      </div>

      <!-- Tabs -->
      <div class="flex space-x-1 mb-8 bg-white dark:bg-[#212832] rounded-xl p-1 border border-[#E2E8F0] dark:border-[#313B47]">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200',
            activeTab === tab.id
              ? 'bg-[#1E6DFF] text-white shadow-sm'
              : 'text-[#5A6A85] dark:text-[#A9B4C6] hover:text-[#1A1A1A] dark:hover:text-[#F1F5FF]'
          ]"
        >
          {{ tab.name }}
        </button>
      </div>

      <!-- Reports Management Section -->
      <div v-if="activeTab === 'reports'" class="space-y-8">
        <!-- Reports Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
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

        <!-- Reports Table -->
        <div class="bg-white dark:bg-[#212832] rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-[#313B47] overflow-hidden">
          <div class="p-6 border-b border-[#E2E8F0] dark:border-[#313B47]">
            <h2 class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF]">Water Condition Reports</h2>
            <p class="text-[#5A6A85] dark:text-[#A9B4C6] mt-1">Manage and review submitted water condition reports</p>
          </div>

          <!-- Reports Filters -->
          <div class="p-6 border-b border-[#E2E8F0] dark:border-[#313B47]">
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

          <!-- Reports Table Content -->
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
                        @change="updateReportStatus(report._id, report.status)"
                        class="px-2 py-1 text-xs bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded text-[#1A1A1A] dark:text-[#F1F5FF] focus:outline-none focus:ring-1 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF]"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <button 
                        @click="deleteReport(report._id)"
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

      <!-- Coordinates Management Section -->
      <div v-if="activeTab === 'coordinates'" class="space-y-8">
        <!-- Coordinates Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white dark:bg-[#212832] p-6 rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
            <div class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF]">{{ coordsStats.total }}</div>
            <div class="text-[#5A6A85] dark:text-[#A9B4C6] text-sm">Total Coordinates</div>
          </div>
          <div class="bg-white dark:bg-[#212832] p-6 rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
            <div class="text-2xl font-bold text-[#FFCB2F] dark:text-[#FFDD57]">{{ coordsStats.pending }}</div>
            <div class="text-[#5A6A85] dark:text-[#A9B4C6] text-sm">Pending Coords</div>
          </div>
          <div class="bg-white dark:bg-[#212832] p-6 rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
            <div class="text-2xl font-bold text-[#1E6DFF] dark:text-[#6CA8FF]">{{ coordsStats.reviewed }}</div>
            <div class="text-[#5A6A85] dark:text-[#A9B4C6] text-sm">Reviewed Coords</div>
          </div>
          <div class="bg-white dark:bg-[#212832] p-6 rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
            <div class="text-2xl font-bold text-[#2ECC71] dark:text-[#38E39A]">{{ coordsStats.resolved }}</div>
            <div class="text-[#5A6A85] dark:text-[#A9B4C6] text-sm">Resolved Coords</div>
          </div>
        </div>

        <!-- Coordinates Table -->
        <div class="bg-white dark:bg-[#212832] rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-[#313B47] overflow-hidden">
          <div class="p-6 border-b border-[#E2E8F0] dark:border-[#313B47]">
            <h2 class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF]">Coordinates Management</h2>
            <p class="text-[#5A6A85] dark:text-[#A9B4C6] mt-1">Manage submitted water body coordinates</p>
          </div>

          <!-- Coordinates Filters -->
          <div class="p-6 border-b border-[#E2E8F0] dark:border-[#313B47]">
            <div class="flex flex-col md:flex-row gap-4 items-center">
              <div class="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                <select v-model="coordsFilters.status" class="px-4 py-2 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF]">
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="resolved">Resolved</option>
                </select>
                <input
                  v-model="coordsFilters.search"
                  type="text"
                  placeholder="Search by name..."
                  class="px-4 py-2 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF]"
                >
              </div>
              <button 
                @click="fetchCoordinates"
                class="px-6 py-2 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              </div>
            </div>

            <!-- Coordinates Table Content -->
            <div v-if="coordsLoading" class="text-center py-8">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6DFF]"></div>
              <p class="text-[#5A6A85] dark:text-[#A9B4C6] mt-2">Loading coordinates...</p>
            </div>

            <div v-else-if="filteredCoordinates.length === 0" class="text-center py-8">
              <p class="text-[#5A6A85] dark:text-[#A9B4C6]">No coordinates found.</p>
            </div>

            <div v-else class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-[#E2E8F0] dark:border-[#313B47]">
                    <th class="text-left p-4 text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">Name</th>
                    <th class="text-left p-4 text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">Coordinates</th>
                    <th class="text-left p-4 text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">Water Level</th>
                    <th class="text-left p-4 text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">Temperature</th>
                    <th class="text-left p-4 text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">Status</th>
                    <th class="text-left p-4 text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">Date</th>
                    <th class="text-left p-4 text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="coord in filteredCoordinates" 
                    :key="coord.id"
                    class="border-b border-[#E2E8F0] dark:border-[#313B47] hover:bg-[#F5F8FF] dark:hover:bg-[#1A1F27] transition-colors"
                  >
                    <td class="p-4">
                      <div class="font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">{{ coord.name }}</div>
                      <div class="text-sm text-[#5A6A85] dark:text-[#A9B4C6]">{{ coord.pathogens }} pathogens</div>
                    </td>
                    <td class="p-4 text-sm text-[#5A6A85] dark:text-[#A9B4C6]">
                      {{ coord.lat.toFixed(6) }}, {{ coord.lng.toFixed(6) }}
                    </td>
                    <td class="p-4 text-sm text-[#5A6A85] dark:text-[#A9B4C6]">
                      {{ coord.waterlevel || '-' }} m
                    </td>
                    <td class="p-4 text-sm text-[#5A6A85] dark:text-[#A9B4C6]">
                      {{ coord.temperature || '-' }}°C
                    </td>
                    <td class="p-4">
                      <span :class="[
                        'px-2 py-1 rounded-full text-xs font-medium',
                        getStatusColor(coord.status)
                      ]">
                        {{ coord.status }}
                      </span>
                    </td>
                    <td class="p-4 text-sm text-[#5A6A85] dark:text-[#A9B4C6]">
                      {{ formatDate(coord.createdAt) }}
                    </td>
                    <td class="p-4">
                      <div class="flex gap-2">
                        <select 
                          v-model="coord.status" 
                          @change="updateCoordinateStatus(coord._id, coord.status)"
                          class="px-2 py-1 text-xs bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded text-[#1A1A1A] dark:text-[#F1F5FF] focus:outline-none focus:ring-1 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF]"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="resolved">Resolved</option>
                        </select>
                        <button 
                          @click="deleteCoordinate(coord._id)"
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

        <!-- Posts Management Section -->
        <div v-if="activeTab === 'posts'" class="space-y-8">
          <!-- Posts Stats -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-white dark:bg-[#212832] p-6 rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
              <div class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF]">{{ postsStats.total }}</div>
              <div class="text-[#5A6A85] dark:text-[#A9B4C6] text-sm">Total Posts</div>
            </div>
            <div class="bg-white dark:bg-[#212832] p-6 rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
              <div class="text-2xl font-bold text-[#FFCB2F] dark:text-[#FFDD57]">{{ postsStats.pending }}</div>
              <div class="text-[#5A6A85] dark:text-[#A9B4C6] text-sm">Pending</div>
            </div>
            <div class="bg-white dark:bg-[#212832] p-6 rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
              <div class="text-2xl font-bold text-[#1E6DFF] dark:text-[#6CA8FF]">{{ postsStats.approved }}</div>
              <div class="text-[#5A6A85] dark:text-[#A9B4C6] text-sm">Approved</div>
            </div>
            <div class="bg-white dark:bg-[#212832] p-6 rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-[#313B47]">
              <div class="text-2xl font-bold text-[#2ECC71] dark:text-[#38E39A]">{{ postsStats.rejected }}</div>
              <div class="text-[#5A6A85] dark:text-[#A9B4C6] text-sm">Rejected</div>
            </div>
          </div>

          <!-- Posts Table -->
          <div class="bg-white dark:bg-[#212832] rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-[#313B47] overflow-hidden">
            <div class="p-6 border-b border-[#E2E8F0] dark:border-[#313B47]">
              <h2 class="text-2xl font-bold text-[#1A1A1A] dark:text-[#F1F5FF]">Posts Management</h2>
              <p class="text-[#5A6A85] dark:text-[#A9B4C6] mt-1">Approve or reject posts for the community feed</p>
            </div>

            <!-- Posts Filters -->
            <div class="p-6 border-b border-[#E2E8F0] dark:border-[#313B47]">
              <div class="flex flex-col md:flex-row gap-4 items-center">
                <div class="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <select v-model="postsFilters.status" class="px-4 py-2 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF]">
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <select v-model="postsFilters.type" class="px-4 py-2 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF]">
                    <option value="">All Types</option>
                    <option value="news">News</option>
                    <option value="alert">Alert</option>
                    <option value="update">Update</option>
                    <option value="event">Event</option>
                  </select>
                  <input
                    v-model="postsFilters.search"
                    type="text"
                    placeholder="Search title..."
                    class="px-4 py-2 bg-white dark:bg-[#1A1F27] border border-[#E2E8F0] dark:border-[#313B47] rounded-lg text-[#1A1A1A] dark:text-[#F1F5FF] placeholder-[#5A6A85] dark:placeholder-[#A9B4C6] focus:outline-none focus:ring-2 focus:ring-[#1E6DFF] dark:focus:ring-[#6CA8FF]"
                  >
                </div>
                <button 
                  @click="fetchPosts"
                  class="px-6 py-2 bg-[#1E6DFF] hover:bg-[#1458CC] text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>

          <!-- Posts Table Content -->
          <div v-if="postsLoading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E6DFF]"></div>
            <p class="text-[#5A6A85] dark:text-[#A9B4C6] mt-2">Loading posts...</p>
          </div>

          <div v-else-if="filteredPosts.length === 0" class="text-center py-8">
            <p class="text-[#5A6A85] dark:text-[#A9B4C6]">No posts found.</p>
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-[#E2E8F0] dark:border-[#313B47]">
                  <th class="text-left p-4 text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">Title</th>
                  <th class="text-left p-4 text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">Type</th>
                  <th class="text-left p-4 text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">Severity</th>
                  <th class="text-left p-4 text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">Status</th>
                  <th class="text-left p-4 text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">Date</th>
                  <th class="text-left p-4 text-sm font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="post in filteredPosts" 
                  :key="post._id"
                  class="border-b border-[#E2E8F0] dark:border-[#313B47] hover:bg-[#F5F8FF] dark:hover:bg-[#1A1F27] transition-colors"
                >
                  <td class="p-4">
                    <div class="font-medium text-[#1A1A1A] dark:text-[#F1F5FF]">{{ post.title }}</div>
                    <div class="text-sm text-[#5A6A85] dark:text-[#A9B4C6] truncate max-w-xs">{{ post.description }}</div>
                  </td>
                  <td class="p-4">
                    <span class="text-sm text-[#1E6DFF] dark:text-[#6CA8FF] font-medium capitalize">
                      {{ post.type }}
                    </span>
                  </td>
                  <td class="p-4">
                    <span :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      getSeverityColor(post.severity)
                    ]">
                      {{ getSeverityLabel(post.severity) }}
                    </span>
                  </td>
                  <td class="p-4">
                    <span :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      getPostStatusColor(post.status)
                    ]">
                      {{ post.status }}
                    </span>
                  </td>
                  <td class="p-4 text-sm text-[#5A6A85] dark:text-[#A9B4C6]">
                    {{ formatDate(post.createdAt) }}
                  </td>
                  <td class="p-4">
                    <div class="flex gap-2">
                      <button 
                        v-if="post.status !== 'approved'"
                        @click="updatePostStatus(post._id, 'approved')"
                        class="px-2 py-1 text-xs bg-[#2ECC71] hover:bg-[#38E39A] text-white rounded transition-colors"
                      >
                        Approve
                      </button>
                      <button 
                        v-if="post.status !== 'rejected'"
                        @click="updatePostStatus(post._id, 'rejected')"
                        class="px-2 py-1 text-xs bg-[#FF4E4E] hover:bg-[#DC2626] text-white rounded transition-colors"
                      >
                        Reject
                      </button>
                      <button 
                        @click="deletePost(post._id)"
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
// Import runtime config for environment variables
const config = useRuntimeConfig()

const { isAuthenticated, hasRole, checkAuthStatus } = useGoogleAuth()

onMounted(async () => {
  await checkAuthStatus()
  
  if (!isAuthenticated.value) {
    await navigateTo('/login')
    return
  }
  
  if (!hasRole(2)) { 
    await navigateTo('/unauthorized')
  }
})

// API base URL from environment
const API_BASE = config.public.apiBaseUrl;

// API Keys from environment
const API_KEYS = {
  USER: config.public.defaultApiKey || 'user_key_123',
  EDITOR: config.editorApiKey || 'editor_key_123',
  ADMIN: config.adminApiKey || 'admin_key_123'
};

// Get API headers for different operations
const getApiHeaders = (operation = 'read') => {
  let apiKey = API_KEYS.USER; // Default to user key
  
  // Determine which API key to use based on operation
  switch(operation) {
    case 'read':
      // GET operations can use user key
      apiKey = API_KEYS.USER;
      break;
    case 'update':
      // PUT operations require editor or admin key
      apiKey = API_KEYS.EDITOR;
      break;
    case 'delete':
      // DELETE operations require admin key
      apiKey = API_KEYS.ADMIN;
      break;
    case 'posts':
      // Posts operations require editor key
      apiKey = API_KEYS.EDITOR;
      break;
    default:
      apiKey = API_KEYS.USER;
  }
  
  return {
    'Content-Type': 'application/json',
    'X-API-Key': apiKey
  };
};

// Tabs
const activeTab = ref('reports');
const tabs = [
  {id: 'reports', name: 'Reports' },
  {id: 'coordinates', name: 'Coordinates' },
  {id: 'posts', name: 'Posts' }
];

// Reports data
const allReports = ref([]);
const filters = ref({
  status: '',
  severity: '',
  type: '',
  search: ''
});
const loading = ref(false);

// Coordinates data
const allCoordinates = ref([]);
const coordsFilters = ref({
  status: '',
  search: ''
});
const coordsLoading = ref(false);

// Posts data
const allPosts = ref([]);
const postsFilters = ref({
  status: '',
  type: '',
  search: ''
});
const postsLoading = ref(false);

// Stats computed
const stats = computed(() => {
  const total = allReports.value.length;
  const pending = allReports.value.filter(r => r.status === 'pending').length;
  const reviewed = allReports.value.filter(r => r.status === 'reviewed').length;
  const resolved = allReports.value.filter(r => r.status === 'resolved').length;
  
  return { total, pending, reviewed, resolved };
});

const coordsStats = computed(() => {
  const total = allCoordinates.value.length;
  const pending = allCoordinates.value.filter(c => c.status === 'pending').length;
  const reviewed = allCoordinates.value.filter(c => c.status === 'reviewed').length;
  const resolved = allCoordinates.value.filter(c => c.status === 'resolved').length;
  
  return { total, pending, reviewed, resolved };
});

const postsStats = computed(() => {
  const total = allPosts.value.length;
  const pending = allPosts.value.filter(p => p.status === 'pending').length;
  const approved = allPosts.value.filter(p => p.status === 'approved').length;
  const rejected = allPosts.value.filter(p => p.status === 'rejected').length;
  
  return { total, pending, approved, rejected };
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

const filteredCoordinates = computed(() => {
  return allCoordinates.value.filter(coord => {
    const matchesStatus = !coordsFilters.value.status || coord.status === coordsFilters.value.status;
    const matchesSearch = !coordsFilters.value.search || 
      coord.name.toLowerCase().includes(coordsFilters.value.search.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
});

const filteredPosts = computed(() => {
  return allPosts.value.filter(post => {
    const matchesStatus = !postsFilters.value.status || post.status === postsFilters.value.status;
    const matchesType = !postsFilters.value.type || post.type === postsFilters.value.type;
    const matchesSearch = !postsFilters.value.search || 
      post.title.toLowerCase().includes(postsFilters.value.search.toLowerCase()) ||
      post.description.toLowerCase().includes(postsFilters.value.search.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
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
    const response = await fetch(`${API_BASE}/api/reports`, {
      headers: getApiHeaders('read') // User key for GET
    });
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

// Fetch all coordinates
const fetchCoordinates = async () => {
  coordsLoading.value = true;
  try {
    const response = await fetch(`${API_BASE}/api/coordinates`, {
      headers: getApiHeaders('read') // User key for GET
    });
    if (response.ok) {
      const coordinates = await response.json();
      allCoordinates.value = coordinates;
    } else {
      console.error('Failed to fetch coordinates');
    }
  } catch (error) {
    console.error('Network error:', error);
  } finally {
    coordsLoading.value = false;
  }
};

// Fetch all posts
const fetchPosts = async () => {
  postsLoading.value = true;
  try {
    const response = await fetch(`${API_BASE}/api/posts`, {
      headers: getApiHeaders('posts') // Editor key for posts GET
    });
    if (response.ok) {
      const posts = await response.json();
      allPosts.value = posts;
    } else {
      console.error('Failed to fetch posts');
    }
  } catch (error) {
    console.error('Network error:', error);
  } finally {
    postsLoading.value = false;
  }
};

// Update report status
const updateReportStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_BASE}/api/reports/${id}`, {
      method: 'PUT',
      headers: getApiHeaders('update'), // Editor key for PUT
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

// Update coordinate status
const updateCoordinateStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_BASE}/api/coordinates/${id}`, {
      method: 'PUT',
      headers: getApiHeaders('update'), // Editor key for PUT
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Failed to update coordinate:', error);
      await fetchCoordinates();
    }
  } catch (error) {
    console.error('Network error:', error);
    await fetchCoordinates();
  }
};

// Update post status
const updatePostStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_BASE}/api/posts/${id}`, {
      method: 'PUT',
      headers: getApiHeaders('posts'), // Editor key for posts operations
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      await fetchPosts();
    } else {
      const error = await response.json();
      console.error('Failed to update post:', error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

// Delete report
const deleteReport = async (id) => {
  if (!confirm('Are you sure you want to delete this report?')) return;

  try {
    const response = await fetch(`${API_BASE}/api/reports/${id}`, {
      method: 'DELETE',
      headers: getApiHeaders('delete'), // Admin key for DELETE
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

// Delete coordinate
const deleteCoordinate = async (id) => {
  if (!confirm('Are you sure you want to delete this coordinate?')) return;

  try {
    const response = await fetch(`${API_BASE}/api/coordinates/${id}`, {
      method: 'DELETE',
      headers: getApiHeaders('delete'), // Admin key for DELETE
    });

    if (response.ok) {
      await fetchCoordinates();
    } else {
      const error = await response.json();
      console.error('Failed to delete coordinate:', error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

// Delete post
const deletePost = async (id) => {
  if (!confirm('Are you sure you want to delete this post?')) return;

  try {
    const response = await fetch(`${API_BASE}/api/posts/${id}`, {
      method: 'DELETE',
      headers: getApiHeaders('delete'), // Admin key for DELETE
    });

    if (response.ok) {
      await fetchPosts();
    } else {
      const error = await response.json();
      console.error('Failed to delete post:', error);
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

const getPostStatusColor = (status) => {
  const statusMap = {
    pending: 'bg-[#FFCB2F] dark:bg-[#FFDD57] text-[#1A1A1A]',
    approved: 'bg-[#2ECC71] dark:bg-[#38E39A] text-white',
    rejected: 'bg-[#FF4E4E] dark:bg-[#FF6B6B] text-white'
  };
  return statusMap[status] || statusMap.pending;
};

// Fetch data when component mounts
onMounted(() => {
  fetchReports();
  fetchCoordinates();
  fetchPosts();
});
</script>