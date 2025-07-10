<template>
  <div class="page-content">
    <h1 v-if="courseData">{{ courseData.title }}</h1>
    <h1 v-else>Course Preview</h1>
    
    <p class="subtitle" v-if="!courseData">Loading course details or course not found.</p>

    <div v-if="courseData" class="course-details glass-card">
      <div class="card-header">
        <h2>{{ courseData.title }}</h2>
        <div class="course-meta">
          <span class="meta-item"><i class="fas fa-chalkboard-teacher"></i> {{ courseData.instructor || 'N/A' }}</span>
          <span class="meta-item"><i class="fas fa-clock"></i> {{ courseData.duration }} hours</span>
          <span class="meta-item"><i class="fas fa-tag"></i> {{ courseData.category || 'N/A' }}</span>
        </div>
      </div>

      <div class="course-content-area">
        <p class="description">{{ courseData.description }}</p>
        
        <h3>What you'll learn:</h3>
        <ul class="learning-points">
            <li><i class="fas fa-check-circle"></i> Master advanced principles and techniques</li>
            <li><i class="fas fa-check-circle"></i> Apply theoretical knowledge to real-world scenarios</li>
            <li><i class="fas fa-check-circle"></i> Develop critical thinking and problem-solving skills</li>
            <li><i class="fas fa-check-circle"></i> Gain insights from industry experts</li>
        </ul>
      </div>

      <div class="course-actions">
        <button @click="startCourse" class="primary-btn">
            <i class="fas fa-play-circle"></i> Start Course
        </button>
        <button @click="goBack" class="secondary-btn">
            <i class="fas fa-arrow-left"></i> Back to Courses
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// --- SIMULATED DATABASE ---
// In a real app, this data would be fetched from your backend API
const masterCourseList = [
    { id: 1, title: 'The Art of Leadership', description: 'Master the principles of effective leadership and team management for inspiring teams and driving success.', category: 'Business', instructor: 'Dr. Emma Richardson', duration: 12 },
    { id: 2, title: 'Data Visualization Essentials', description: 'Learn to create compelling and insightful data visualizations using modern tools and techniques like D3.js.', category: 'Technology', instructor: 'Prof. Alex Chen', duration: 8 },
    { id: 4, title: 'Blockchain Fundamentals', description: 'Understand the core concepts and applications of blockchain technology, cryptocurrencies, and decentralized systems.', category: 'Technology', instructor: 'Dr. Sarah Lee', duration: 10 },
    { id: 6, title: 'UI/UX Design Principles', description: 'Master the fundamentals of user interface and experience design for creating beautiful and intuitive digital products.', category: 'Design', instructor: 'Lisa Wong', duration: 14 },
];


export default {
  name: "CoursePreview",
  data() {
    return {
      // Initialize courseData as null
      courseData: null,
    };
  },
  methods: {
    startCourse() {
      console.log(`Starting course: ${this.courseData.title}`);
      this.$emit('show-message', 'Course Enrollment', `You are starting: "${this.courseData.title}". Enjoy your learning!`);
    },
    goBack() {
      this.$router.back();
    },
    // NEW: Method to find the course data
    findCourseData() {
        const courseId = this.$route.params.id;
        if (!courseId) {
            console.error("No course ID provided in the route.");
            return;
        }

        // Find the course in our simulated database.
        // The '==' is used for loose comparison as route params can be strings.
        const foundCourse = masterCourseList.find(c => c.id == courseId);

        if (foundCourse) {
            this.courseData = foundCourse;
        } else {
            console.error(`Course with ID ${courseId} not found.`);
            // Optionally, redirect to a 'not-found' page
            // this.$router.push('/not-found');
        }
    }
  },
  created() {
    // When the component is created, find the course data
    this.findCourseData();
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

h1 {
  margin-top: 0;
  color: #2D3748;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  margin-bottom: 10px;
}

.subtitle {
  color: #4A5568;
  font-size: 0.95rem;
  margin-bottom: 30px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.course-details h2 {
  margin-top: 0;
  color: #1E293B;
  font-size: 1.8rem;
  margin-bottom: 15px;
}

.course-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 25px;
  font-size: 0.9rem;
  color: #4A5568;
}

.course-meta .meta-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.course-meta .meta-item i {
    color: #7C53FF;
}

.description {
  color: #1E293B;
  line-height: 1.6;
  margin-bottom: 25px;
}

h3 {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.3rem;
  color: #1E293B;
  margin-top: 30px;
  margin-bottom: 15px;
  border-bottom: 1px solid #E2E8F0;
  padding-bottom: 10px;
}

.learning-points, .module-list {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.learning-points li, .module-list li {
  background-color: rgba(255, 255, 255, 0.7);
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1E293B;
  font-size: 0.95rem;
}

.learning-points li i {
    color: #10B981;
}

.module-list li i {
    color: #7C53FF;
}

.course-actions {
  margin-top: 30px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.primary-btn, .secondary-btn {
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.primary-btn {
  background: linear-gradient(135deg, #7C53FF 0%, #5E7CFF 100%);
  color: white;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(124, 83, 255, 0.3);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #E2E8F0;
  color: #1E293B;
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.9);
}

@media (max-width: 576px) {
  .course-meta {
    flex-direction: column;
    gap: 10px;
  }
  
  .course-actions {
    flex-direction: column;
  }
  
  .primary-btn, .secondary-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>