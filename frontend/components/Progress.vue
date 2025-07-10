<template>
  <div class="page-content progress-page">
    <h1>Your Learning Progress</h1>
    <p class="subtitle">A detailed overview of your achievements and learning journey.</p>

    <div class="progress-summary-grid">
      <div class="summary-card">
        <i class="fas fa-chart-line summary-icon"></i>
        <h3>Total Courses</h3>
        <p class="summary-value">24</p>
      </div>
      <div class="summary-card">
        <i class="fas fa-clock summary-icon"></i>
        <h3>Hours Learned</h3>
        <p class="summary-value">156</p>
      </div>
      <div class="summary-card">
        <i class="fas fa-medal summary-icon"></i>
        <h3>Achievements Earned</h3>
        <p class="summary-value">12</p>
      </div>
      <div class="summary-card">
        <i class="fas fa-percent summary-icon"></i>
        <h3>Completion Rate</h3>
        <p class="summary-value">87%</p>
      </div>
    </div>

    <div class="progress-charts-section card">
      <div class="card-header">
        <h3>Activity Over Time</h3>
        <select class="time-filter" v-model="selectedProgressTimeFilter" @change="handleProgressTimeFilterChange">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>This Year</option>
        </select>
      </div>
      <div class="chart-area">
        <div class="chart-placeholder large-placeholder">
          <p>Complex interactive chart showing learning hours/progress over time.</p>
        </div>
      </div>
    </div>

    <div class="recent-achievements-section card">
      <div class="card-header">
        <h3>Recent Achievements</h3>
      </div>
      <div class="achievement-list">
        <div v-for="achievement in achievements" :key="achievement.id" class="achievement-item">
          <div class="achievement-icon">
            <i :class="achievement.icon"></i>
          </div>
          <div class="achievement-details">
            <h4>{{ achievement.title }}</h4>
            <p>{{ achievement.description }}</p>
            <span class="achievement-date">{{ achievement.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  data() {
    return {
      selectedProgressTimeFilter: 'Last 30 Days',
      achievements: [
        { id: 1, title: 'Diligent Scholar', description: 'Completed 10 consecutive days of learning.', icon: 'fas fa-book-reader', date: 'June 10, 2025' },
        { id: 2, title: 'Leadership Virtuoso', description: 'Finished "The Art of Leadership" Masterclass.', icon: 'fas fa-crown', date: 'May 28, 2025' },
        { id: 3, title: 'Data Dynamo', description: 'Excelled in "Data Visualization Essentials".', icon: 'fas fa-chart-bar', date: 'April 15, 2025' },
        { id: 4, title: 'Polyglot Pioneer', description: 'Reached advanced level in "French for Global Business".', icon: 'fas fa-language', date: 'March 01, 2025' },
      ],
    };
  },
  methods: {
    handleProgressTimeFilterChange() {
      console.log('Progress time filter changed to:', this.selectedProgressTimeFilter);
      this.$emit('show-message', 'Data Filtered', `Displaying progress for: ${this.selectedProgressTimeFilter}`);
    }
  }
};
</script>

<style scoped>
.page-content {
  padding: 30px;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(245, 245, 245, 0.95) 0%, rgba(240, 240, 240, 0.95) 100%);
  backdrop-filter: blur(5px);
}

.progress-page h1 {
  margin-top: 0;
  color: #2D3748;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  margin-bottom: 10px;
}

.progress-page .subtitle {
  color: #4A5568;
  font-size: 0.95rem;
  margin-bottom: 30px;
}

.progress-summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.summary-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  padding: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.summary-icon {
  font-size: 2.5rem;
  color: #4F46E5;
  margin-bottom: 15px;
}

.summary-card h3 {
  font-size: 1rem;
  color: #4A5568;
  margin-bottom: 5px;
}

.summary-value {
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #1E293B;
  margin: 0;
}

.card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
  overflow: hidden;
}

.card-header {
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.card-header h3 {
  margin: 0;
  color: #2D3748;
}

.time-filter {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 8px 15px;
  color: #1E293B;
  font-size: 0.9rem;
  cursor: pointer;
}

.time-filter option {
  background: white;
  color: #1E293B;
}

.chart-area {
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.chart-placeholder.large-placeholder {
  width: 95%;
  height: 95%;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4A5568;
  font-style: italic;
  font-size: 0.9rem;
  border: 1px dashed #CBD5E0;
}

.achievement-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
}

.achievement-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
}

.achievement-item:hover {
  background: rgba(255, 255, 255, 0.9);
}

.achievement-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: rgba(79, 70, 229, 0.1);
  color: #4F46E5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
}

.achievement-details h4 {
  margin: 0 0 5px;
  font-size: 1rem;
  color: #1E293B;
}

.achievement-details p {
  margin: 0 0 5px;
  font-size: 0.85rem;
  color: #4A5568;
}

.achievement-date {
  font-size: 0.75rem;
  color: #64748B;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .progress-summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .chart-area {
    height: 300px;
  }
}

@media (max-width: 768px) {
  .page-content {
    padding: 20px;
  }
  
  .summary-card {
    padding: 20px;
  }
  
  .summary-value {
    font-size: 1.8rem;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 576px) {
  .progress-summary-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-area {
    height: 250px;
  }
  
  .achievement-item {
    flex-direction: column;
    text-align: center;
  }
  
  .achievement-icon {
    margin-bottom: 10px;
  }
}
</style>