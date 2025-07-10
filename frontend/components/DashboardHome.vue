<template>
  <div class="dashboard-glass">
    <div class="glass-header">
      <div class="header-text">
        <h1>Welcome Back, <span class="gradient-text">Lart</span></h1>
        <p class="subtitle">Your learning dashboard • Updated just now</p>
      </div>
      <button class="glass-button upgrade-btn" @click="upgradeToPro">
        <i class="fas fa-sparkles"></i>
        <span>Upgrade to Pro</span>
      </button>
    </div>

    <div class="stats-container">
      <div class="glass-card stat-card" style="--card-color: rgba(255, 101, 165, 0.1)">
        <div class="card-glow" style="background: radial-gradient(circle at center, rgba(255, 101, 165, 0.3) 0%, transparent 70%)"></div>
        <div class="stat-content">
          <div class="stat-icon" style="background: linear-gradient(135deg, #FF65A5 0%, #FF677D 100%)">
            <i class="fas fa-book-open"></i>
          </div>
          <div class="stat-text">
            <h3>24</h3>
            <p>Active Courses</p>
            <div class="trend-indicator positive">
              <i class="fas fa-arrow-up"></i>
              <span>12% from last week</span>
            </div>
          </div>
        </div>
        <div class="stat-progress" style="--progress: 68%; --progress-color: #FF65A5"></div>
      </div>

      <div class="glass-card stat-card" style="--card-color: rgba(124, 83, 255, 0.1)">
        <div class="card-glow" style="background: radial-gradient(circle at center, rgba(124, 83, 255, 0.3) 0%, transparent 70%)"></div>
        <div class="stat-content">
          <div class="stat-icon" style="background: linear-gradient(135deg, #7C53FF 0%, #5E7CFF 100%)">
            <i class="fas fa-check-double"></i>
          </div>
          <div class="stat-text">
            <h3>68%</h3>
            <p>Completion</p>
            <div class="trend-indicator positive">
              <i class="fas fa-arrow-up"></i>
              <span>5% from last week</span>
            </div>
          </div>
        </div>
        <div class="stat-progress" style="--progress: 68%; --progress-color: #7C53FF"></div>
      </div>

      <div class="glass-card stat-card" style="--card-color: rgba(58, 227, 200, 0.1)">
        <div class="card-glow" style="background: radial-gradient(circle at center, rgba(58, 227, 200, 0.3) 0%, transparent 70%)"></div>
        <div class="stat-content">
          <div class="stat-icon" style="background: linear-gradient(135deg, #3AE3C8 0%, #3A8CE3 100%)">
            <i class="fas fa-clock"></i>
          </div>
          <div class="stat-text">
            <h3>156h</h3>
            <p>Learned</p>
            <div class="trend-indicator negative">
              <i class="fas fa-arrow-down"></i>
              <span>8% from last week</span>
            </div>
          </div>
        </div>
        <div class="stat-progress" style="--progress: 68%; --progress-color: #3AE3C8"></div>
      </div>

      <div class="glass-card stat-card" style="--card-color: rgba(255, 200, 61, 0.1)">
        <div class="card-glow" style="background: radial-gradient(circle at center, rgba(255, 200, 61, 0.3) 0%, transparent 70%)"></div>
        <div class="stat-content">
          <div class="stat-icon" style="background: linear-gradient(135deg, #FFC83D 0%, #FF8F3D 100%)">
            <i class="fas fa-trophy"></i>
          </div>
          <div class="stat-text">
            <h3>12</h3>
            <p>Achievements</p>
            <div class="trend-indicator positive">
              <i class="fas fa-arrow-up"></i>
              <span>2 new this week</span>
            </div>
          </div>
        </div>
        <div class="stat-progress" style="--progress: 68%; --progress-color: #FFC83D"></div>
      </div>
    </div>

    <div class="content-grid">
      <div class="glass-card main-card">
        <div class="card-header">
          <h2><i class="fas fa-chart-line"></i> Learning Progress</h2>
          <select v-model="selectedTimeFilter" @change="handleTimeFilterChange" class="glass-select">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>
        <div class="chart-container">
          <div class="modern-chart">
            <div class="chart-placeholder">
              <div class="chart-line" style="--height: 70%; --color: #7C53FF"></div>
              <div class="chart-line" style="--height: 85%; --color: #FF65A5"></div>
              <div class="chart-line" style="--height: 60%; --color: #3AE3C8"></div>
              <div class="chart-line" style="--height: 90%; --color: #FFC83D"></div>
              <div class="chart-line" style="--height: 75%; --color: #7C53FF"></div>
              <div class="chart-line" style="--height: 80%; --color: #FF65A5"></div>
              <div class="chart-line" style="--height: 95%; --color: #3AE3C8"></div>
            </div>
            <div class="chart-labels">
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              <span>S</span>
            </div>
          </div>
          <div class="chart-legend">
            <div class="legend-item">
              <span class="legend-color" style="background: #7C53FF"></span>
              <span>Leadership</span>
            </div>
            <div class="legend-item">
              <span class="legend-color" style="background: #FF65A5"></span>
              <span>Data Science</span>
            </div>
            <div class="legend-item">
              <span class="legend-color" style="background: #3AE3C8"></span>
              <span>Languages</span>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-card main-card">
        <div class="card-header">
          <h2><i class="fas fa-play-circle"></i> Continue Learning</h2>
          <button @click="viewAllCourses" class="glass-link">View All</button>
        </div>
        <div class="courses-list">
          <div class="course-card" style="--card-accent: #7C53FF">
            <div class="course-badge" style="background: var(--card-accent)">Popular</div>
            <div class="course-progress">
              <div class="radial-progress" style="--progress: 75%; --color: #7C53FF">
                <span>75%</span>
              </div>
            </div>
            <div class="course-info">
              <div class="course-category" style="color: #7C53FF">Leadership</div>
              <h3>The Art of Leadership</h3>
              <p class="course-desc">Master essential leadership skills for modern organizations</p>
              <div class="course-meta">
                <div class="meta-item">
                  <i class="fas fa-play-circle"></i>
                  <span>12/16 lessons</span>
                </div>
                <div class="meta-item">
                  <i class="fas fa-clock"></i>
                  <span>4h 22m left</span>
                </div>
              </div>
              <div class="course-footer">
                <div class="instructor">
                  <div class="avatar" style="background-image: url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop')"></div>
                  <span>Dr. Emma Richardson</span>
                </div>
                <button class="glass-button small with-icon" @click="resumeCourse('The Art of Leadership')">
                  <i class="fas fa-play"></i>
                  <span>Resume</span>
                </button>
              </div>
            </div>
          </div>

          <div class="course-card" style="--card-accent: #FF65A5">
            <div class="course-badge" style="background: var(--card-accent)">New</div>
            <div class="course-progress">
              <div class="radial-progress" style="--progress: 42%; --color: #FF65A5">
                <span>42%</span>
              </div>
            </div>
            <div class="course-info">
              <div class="course-category" style="color: #FF65A5">Data Science</div>
              <h3>Data Visualization</h3>
              <p class="course-desc">Advanced techniques for impactful data storytelling</p>
              <div class="course-meta">
                <div class="meta-item">
                  <i class="fas fa-play-circle"></i>
                  <span>5/12 lessons</span>
                </div>
                <div class="meta-item">
                  <i class="fas fa-clock"></i>
                  <span>6h 10m left</span>
                </div>
              </div>
              <div class="course-footer">
                <div class="instructor">
                  <div class="avatar" style="background-image: url('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop')"></div>
                  <span>Prof. James Chen</span>
                </div>
                <button class="glass-button small with-icon" @click="resumeCourse('Data Visualization')">
                  <i class="fas fa-play"></i>
                  <span>Resume</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-card main-card">
        <div class="card-header">
          <h2><i class="fas fa-lightbulb"></i> Recommended For You</h2>
          <button @click="viewMoreRecommendations" class="glass-link">See More</button>
        </div>
        <div class="recommendations-grid">
          <div class="recommendation-card">
            <div class="rec-thumbnail" style="background-image: url('https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1470&auto=format&fit=crop')">
              <div class="rec-overlay" style="background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)">
                <span class="difficulty" style="background: rgba(124, 83, 255, 0.8)">Intermediate</span>
                <div class="rec-price">$89.99</div>
              </div>
            </div>
            <div class="rec-content">
              <div class="rec-category" style="color: #7C53FF">Business Skills</div>
              <h3>Negotiation Mastery</h3>
              <div class="rec-stats">
                <div class="rating">
                  <i class="fas fa-star"></i>
                  <span>4.7</span>
                  <span>(1.2k reviews)</span>
                </div>
                <div class="duration">
                  <i class="fas fa-video"></i>
                  <span>8 hours</span>
                </div>
              </div>
              <p class="rec-desc">Master business negotiation techniques from top executives in various industries...</p>
              <button class="glass-button small full-width" @click="enrollCourse('Negotiation Mastery', 89.99)">
                <i class="fas fa-shopping-cart"></i>
                <span>Enroll Now</span>
              </button>
            </div>
          </div>

          <div class="recommendation-card">
            <div class="rec-thumbnail" style="background-image: url('https://images.unsplash.com/photo-1642104793577-9BA182e53cc7?q=80&w=1332&auto=format&fit=crop')">
              <div class="rec-overlay" style="background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)">
                <span class="difficulty" style="background: rgba(58, 227, 200, 0.8)">Advanced</span>
                <div class="rec-price">$129.99</div>
              </div>
            </div>
            <div class="rec-content">
              <div class="rec-category" style="color: #3AE3C8">Technology</div>
              <h3>Blockchain Fundamentals</h3>
              <div class="rec-stats">
                <div class="rating">
                  <i class="fas fa-star"></i>
                  <span>5.0</span>
                  <span>(856 reviews)</span>
                </div>
                <div class="duration">
                  <i class="fas fa-video"></i>
                  <span>12 hours</span>
                </div>
              </div>
              <p class="rec-desc">Understand blockchain technology from the ground up with real-world applications...</p>
              <button class="glass-button small full-width" @click="enrollCourse('Blockchain Fundamentals', 129.99)">
                <i class="fas fa-shopping-cart"></i>
                <span>Enroll Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-card main-card">
        <div class="card-header">
          <h2><i class="fas fa-bolt"></i> Recent Activity</h2>
          <button @click="viewAllActivity" class="glass-link">View All</button>
        </div>
        <div class="activity-feed">
          <div class="activity-item" @click="viewActivityDetail('completed-module')">
            <div class="activity-icon" style="background: rgba(124, 83, 255, 0.2); color: #7C53FF">
              <i class="fas fa-check"></i>
            </div>
            <div class="activity-content">
              <p>Completed <strong>Module 4: Advanced Techniques</strong> in <strong>The Art of Leadership</strong></p>
              <span class="activity-time">2 hours ago</span>
            </div>
          </div>

          <div class="activity-item" @click="viewActivityDetail('achievement-earned')">
            <div class="activity-icon" style="background: rgba(255, 200, 61, 0.2); color: #FFC83D">
              <i class="fas fa-trophy"></i>
            </div>
            <div class="activity-content">
              <p>Earned achievement <strong>Diligent Scholar</strong> for 10 consecutive days</p>
              <span class="activity-time">Yesterday</span>
            </div>
          </div>

          <div class="activity-item" @click="viewActivityDetail('new-course-started')">
            <div class="activity-icon" style="background: rgba(58, 227, 200, 0.2); color: #3AE3C8">
              <i class="fas fa-book"></i>
            </div>
            <div class="activity-content">
              <p>Started new course <strong>Blockchain Fundamentals</strong></p>
              <span class="activity-time">2 days ago</span>
            </div>
          </div>

          <div class="activity-item" @click="viewActivityDetail('forum-post')">
            <div class="activity-icon" style="background: rgba(255, 101, 165, 0.2); color: #FF65A5">
              <i class="fas fa-comment"></i>
            </div>
            <div class="activity-content">
              <p>Posted a question in <strong>Data Visualization</strong> discussion forum</p>
              <span class="activity-time">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="slide-fade">
      <div v-if="showSideMenu" class="side-menu-overlay" @click="closeSideMenu"></div>
    </transition>
    
    <transition name="slide-fade">
      <div v-if="showSideMenu" class="side-menu">
        <div class="side-menu-header">
          <h2>Notification</h2>
          <button class="close-btn" @click="closeSideMenu">&times;</button>
        </div>
        <div class="side-menu-content">
          <p>{{ notificationMessage }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "GlassDashboard",
  data() {
    return {
      selectedTimeFilter: 'Last 30 Days',
      showSideMenu: false,
      notificationMessage: '',
      notificationTitle: ''
    };
  },
  methods: {
    upgradeToPro() {
      this.showNotification('Upgrade Feature', 'Redirecting to upgrade page for Pro version...');
    },
    
    handleTimeFilterChange() {
      this.showNotification('Filter Applied', `Filtering data for: ${this.selectedTimeFilter}`);
    },
    
    viewAllCourses() {
      this.showNotification('Navigation', 'Opening all courses page...');
    },
    
    resumeCourse(courseName) {
      this.showNotification('Course Resumed', `Resuming your progress in "${courseName}"`);
    },
    
    viewMoreRecommendations() {
      this.showNotification('Navigation', 'Opening recommendations page...');
    },
    
    enrollCourse(courseName, price) {
      this.showNotification('Enrollment', `Added "${courseName}" to your cart for $${price}`);
    },
    
    viewAllActivity() {
      this.showNotification('Navigation', 'Opening full activity feed...');
    },
    
    viewActivityDetail(activityType) {
      const messages = {
        'completed-module': 'Showing details for completed module',
        'achievement-earned': 'Showing details for earned achievement',
        'new-course-started': 'Showing details for newly started course',
        'forum-post': 'Showing details for forum post'
      };
      this.showNotification('Activity Detail', messages[activityType] || 'Showing activity details');
    },
    
    showNotification(title, message) {
      this.notificationTitle = title;
      this.notificationMessage = message;
      this.showSideMenu = true;
      
      setTimeout(() => {
        this.closeSideMenu();
      }, 3000);
    },
    
    closeSideMenu() {
      this.showSideMenu = false;
    }
  }
};
</script>

<style scoped>
/* Base Styles */
.dashboard-glass {
  padding: 24px;
  max-width: 1440px;
  margin: 0 auto;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #F5F7FA 0%, #E4E8EB 100%);
  min-height: 100vh;
}

/* Glassmorphism Base */
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Header Styles */
.glass-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
}

.header-text h1 {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: #2D3748;
}

.gradient-text {
  background: linear-gradient(135deg, #FF65A5 0%, #7C53FF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  color: #718096;
  margin: 8px 0 0;
  font-size: 14px;
  font-weight: 500;
}

/* Stats Container */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  position: relative;
  overflow: hidden;
  padding: 20px;
  background: var(--card-color);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover .card-glow {
  opacity: 1;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-text h3 {
  font-size: 24px;
  margin: 0;
  font-weight: 700;
  color: #2D3748;
}

.stat-text p {
  margin: 4px 0 0;
  color: #718096;
  font-size: 14px;
  font-weight: 500;
}

.trend-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  margin-top: 8px;
}

.trend-indicator.positive {
  color: #3AE3C8;
}

.trend-indicator.negative {
  color: #FF677D;
}

.stat-progress {
  height: 4px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.stat-progress::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: var(--progress);
  background: var(--progress-color);
  border-radius: 2px;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

.main-card {
  padding: 24px;
  grid-column: span 12;
}

@media (min-width: 992px) {
    .main-card:nth-child(1) { grid-column: span 7; }
    .main-card:nth-child(2) { grid-column: span 5; }
    .main-card:nth-child(3) { grid-column: span 6; }
    .main-card:nth-child(4) { grid-column: span 6; }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.card-header h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #2D3748;
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-header i {
  font-size: 16px;
}

/* Chart Styles */
.chart-container {
  height: 240px;
  display: flex;
  flex-direction: column;
}

.modern-chart {
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 16px;
  padding-bottom: 20px;
  position: relative;
}

.chart-placeholder {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: flex-end;
  gap: 16px;
  padding: 0 20px;
}

.chart-line {
  flex: 1;
  height: var(--height);
  background: var(--color);
  border-radius: 6px 6px 0 0;
  position: relative;
  transition: height 0.5s ease;
}

.chart-line::after {
  content: '';
  position: absolute;
  top: -8px;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--color);
  opacity: 0.3;
  border-radius: 2px;
}

.chart-labels {
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
  color: #718096;
  font-size: 12px;
  font-weight: 500;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #718096;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

/* Courses List */
.courses-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.course-card {
  position: relative;
  display: flex;
  gap: 16px;
  padding: 20px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.6);
  border-left: 4px solid var(--card-accent);
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8);
}

.course-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.course-progress {
  position: relative;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
}

.radial-progress {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(var(--color) calc(var(--progress) * 3.6deg), rgba(226, 232, 240, 0.5) 0deg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.radial-progress span {
  background: #ffffff;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #2D3748;
}

.course-info {
  flex: 1;
}

.course-category {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.course-info h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px;
  color: #2D3748;
}

.course-desc {
  font-size: 14px;
  color: #718096;
  margin: 8px 0 16px;
  line-height: 1.5;
}

.course-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #718096;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid rgba(203, 213, 225, 0.5);
}

.instructor {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
}

.instructor span {
  font-size: 12px;
  color: #718096;
}

/* Recommendations */
.recommendations-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 576px) {
    .recommendations-grid {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
}

.recommendation-card {
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.recommendation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8);
}

.rec-thumbnail {
  height: 160px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.rec-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.difficulty {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.rec-price {
  background: rgba(255, 255, 255, 0.9);
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 14px;
  color: #2D3748;
}

.rec-content {
  padding: 20px;
}

.rec-category {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.rec-content h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px;
  color: #2D3748;
}

.rec-stats {
  display: flex;
  justify-content: space-between;
  margin: 8px 0 12px;
  font-size: 12px;
  color: #718096;
}

.rec-stats i {
  margin-right: 4px;
}

.rating {
  color: #FFC83D;
}

.rec-desc {
  font-size: 14px;
  color: #718096;
  margin: 0 0 16px;
  line-height: 1.5;
}

/* Activity Feed */
.activity-feed {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  gap: 16px;
  padding: 12px;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.activity-item:hover {
  background: rgba(255, 255, 255, 0.5);
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
}

.activity-content p {
  margin: 0 0 4px;
  font-size: 14px;
  line-height: 1.5;
  color: #4A5568;
}

.activity-content strong {
  font-weight: 600;
  color: #2D3748;
}

.activity-time {
  font-size: 12px;
  color: #A0AEC0;
}

/* Buttons */
.glass-button {
  position: relative;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 
    0 6px 20px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.glass-button:active {
  transform: translateY(0);
  box-shadow: 
    0 2px 10px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.glass-button.small {
  padding: 8px 16px;
  font-size: 13px;
  border-radius: 10px;
}

.glass-button.with-icon {
  padding: 8px 16px 8px 12px;
}

.glass-button.full-width {
  width: 100%;
}

.upgrade-btn {
  background: linear-gradient(135deg, #FF65A5 0%, #7C53FF 100%);
  color: white;
}

.upgrade-btn:hover {
  background: linear-gradient(135deg, #FF65A5 0%, #7C53FF 100%);
  opacity: 0.9;
}

.glass-link {
  background: none;
  border: none;
  color: #7C53FF;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 0;
  transition: all 0.2s ease;
}

.glass-link:hover {
  color: #5E3BE8;
  text-decoration: underline;
}

.glass-select {
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid rgba(203, 213, 225, 0.5);
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  font-size: 14px;
  color: #4A5568;
  cursor: pointer;
  transition: all 0.3s ease;
}

.glass-select:hover {
  background: rgba(255, 255, 255, 0.6);
}

.glass-select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(124, 83, 255, 0.2);
}

/* Side Menu */
.side-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 100;
}

.side-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
  z-index: 101;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.side-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.side-menu-header h2 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #2D3748;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #718096;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-btn:hover {
  color: #4A5568;
}

.side-menu-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

/* Transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .glass-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .stats-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
    
  .side-menu {
    width: 100%;
    max-width: 320px;
  }
}

@media (max-width: 480px) {
  .dashboard-glass {
    padding: 16px;
  }
  
  .glass-card {
    padding: 16px;
  }
  
  .course-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .course-progress {
    margin-bottom: 16px;
  }

  .course-footer {
    flex-direction: column;
    gap: 12px;
  }
}
</style>