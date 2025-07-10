<template>
  <div class="page-content">
    <h1>My Courses</h1>
    <p class="subtitle">Here are all the courses you're currently enrolled in or have completed.</p>

    <div class="course-list-grid">
      <div v-for="course in courses" :key="course.id" class="glass-card course-card">
        <div class="course-thumbnail" :style="{ backgroundImage: 'url(' + course.thumbnail + ')' }">
          <span class="course-category">{{ course.category }}</span>
        </div>
        <div class="course-info">
          <h3>{{ course.title }}</h3>
          <p class="course-description">{{ course.description }}</p>
          <div class="course-progress">
            <div class="progress-bar-wrapper">
              <div class="progress-fill" :style="{ width: course.progress + '%' }"></div>
            </div>
            <span class="progress-text">{{ course.progress }}% Complete</span>
          </div>
          <button @click="continueCourse(course)" class="continue-btn">
            <i class="fas fa-play-circle"></i> Continue Course
          </button>
        </div>
      </div>

      <div class="glass-card add-course-card">
        <button @click="goToCreateCourse" class="add-course-btn">
          <i class="fas fa-plus-circle"></i> Add New Course
        </button>
        <p>Explore our vast catalog and enroll in new learning journeys.</p>
      </div>
    </div>
  </div>
</template>

<script>
// (Script content remains the same)
export default {
  name: 'MyCourses',
  data() {
    return {
      courses: [
        { id: 1, title: 'The Art of Leadership', description: 'Master the principles of effective leadership and team management.', category: 'Business', progress: 75, thumbnail: 'https://source.unsplash.com/random/400x250/?leadership,business', },
        { id: 2, title: 'Data Visualization Essentials', description: 'Learn to create compelling and insightful data visualizations.', category: 'Technology', progress: 42, thumbnail: 'https://source.unsplash.com/random/400x250/?data,chart', },
        { id: 3, title: 'French for Global Business', description: 'An executive-level course to master French for international commerce.', category: 'Language', progress: 90, thumbnail: 'https://source.unsplash.com/random/400x250/?paris,language', },
        { id: 4, title: 'Blockchain Fundamentals', description: 'Understand the core concepts and applications of blockchain technology.', category: 'Technology', progress: 60, thumbnail: 'https://source.unsplash.com/random/400x250/?blockchain,crypto', },
      ]
    };
  },
  methods: {
    continueCourse(course) {
      this.$emit('show-message', 'Course Action', `Continuing course: "${course.title}".`);
    },
    goToCreateCourse() {
      this.$router.push('/dashboard/create-course');
    }
  }
};
</script>

<style scoped>
/* UPDATED: Styles refactored for Glassmorphism Theme */
.page-content {
  font-family: 'Inter', sans-serif;
}
h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 10px;
  color: #2D3748;
}
.subtitle {
  color: #718096;
  font-size: 1rem;
  margin-bottom: 30px;
}

.course-list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.course-thumbnail {
  width: 100%;
  height: 150px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.course-category {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(124, 83, 255, 0.9); /* Purple accent */
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.course-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.course-info h3 { font-size: 1.2rem; margin: 0 0 10px; color: #2D3748; }
.course-info .course-description { font-size: 0.9rem; color: #4A5568; margin-bottom: 20px; flex-grow: 1; }

.course-progress { width: 100%; margin-bottom: 15px; }
.progress-bar-wrapper {
  height: 8px;
  background-color: #E2E8F0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 5px;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #7C53FF, #5E7CFF); /* Purple to Blue gradient */
  border-radius: 4px;
}
.progress-text { font-size: 0.8rem; color: #4A5568; font-weight: 500; }

.continue-btn {
  width: 100%;
  padding: 12px 15px;
  background: linear-gradient(135deg, #7C53FF 0%, #5E7CFF 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease-in-out;
}
.continue-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(124, 83, 255, 0.3);
}

.add-course-card {
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
    background: transparent;
    border: 2px dashed #CBD5E0;
}
.add-course-card p { font-size: 0.9rem; margin-top: 15px; color: #718096; }
.add-course-btn {
    background: none;
    border: 2px solid #7C53FF;
    color: #7C53FF;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex; align-items: center; gap: 10px;
}
.add-course-btn:hover { background-color: #7C53FF; color: white; }
.add-course-btn i { font-size: 1.2rem; }
</style>