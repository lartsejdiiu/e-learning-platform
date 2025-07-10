<template>
  <div class="split-view-container" :class="{ 'preview-is-active-mobile': selectedCourse !== null }">

    <div class="course-list-panel">
      <div class="list-header">
        <h1>Course Library</h1>
        <p>Select a course to see its details.</p>
      </div>
      
      <div class="course-filters">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search courses..." 
          class="search-input"
        />
        <select v-model="selectedCategory" class="category-select">
          <option value="">All Categories</option>
          <option value="Business">Business</option>
          <option value="Technology">Technology</option>
          <option value="Design">Design</option>
        </select>
      </div>

      <div class="list-items-container">
        <div v-if="isLoading" class="skeleton-list">
          <div v-for="n in 5" :key="n" class="skeleton-item"></div>
        </div>
        <div v-else-if="courses.length > 0">
          <div 
            v-for="course in courses" 
            :key="course.id" 
            class="course-list-item"
            :class="{ 'is-active': selectedCourse && selectedCourse.id === course.id }"
            @click="selectCourse(course)"
          >
            <div class="item-icon" :style="{ backgroundColor: course.color }">
              <i :class="course.icon"></i>
            </div>
            <div class="item-details">
              <span class="item-category">{{ course.category }}</span>
              <h3 class="item-title">{{ course.title }}</h3>
            </div>
          </div>
        </div>
        <div v-else class="no-results">
          <p>No courses match your search.</p>
        </div>
      </div>
    </div>

    <div class="course-preview-panel">
        <button class="mobile-back-button" @click="closePreview">
            <i class="fas fa-arrow-left"></i> Back to List
        </button>

        <div v-if="selectedCourse" class="preview-background" :style="{ backgroundImage: `url(${selectedCourse.thumbnail})` }"></div>
        <div class="preview-overlay"></div>

        <transition name="fade" mode="out-in">
            <div v-if="selectedCourse" :key="selectedCourse.id" class="preview-content">
                <div class="content-header">
                    <span class="tag" :style="{ backgroundColor: selectedCourse.color }">{{ selectedCourse.tags[0] }}</span>
                    <h1 class="preview-title">{{ selectedCourse.title }}</h1>
                    <p class="preview-instructor">A course by <strong>{{ selectedCourse.instructor }}</strong></p>
                </div>

                <div class="content-body">
                    <p class="preview-description">{{ selectedCourse.description }}</p>
                    <div class="preview-stats">
                        <div class="stat-item">
                            <i class="fas fa-clock"></i>
                            <span>{{ selectedCourse.duration }} Hours</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-star"></i>
                            <span>{{ selectedCourse.rating }} Rating</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-users"></i>
                            <span>{{ selectedCourse.activeUsers.toLocaleString() }} Students</span>
                        </div>
                    </div>
                </div>

                <div class="content-footer">
                    <button class="cta-button" :style="{ backgroundColor: selectedCourse.color }" @click="viewCourseDetails(selectedCourse)">
                        View Full Details <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
             <div v-else class="no-selection-prompt">
                <i class="fas fa-hand-pointer"></i>
                <h2>Select a Course</h2>
                <p>Choose a course from the list to see the details.</p>
            </div>
        </transition>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// --- DATA MODEL & STATE ---
const masterCourseList = ref([
    { id: 1, title: 'The Art of Leadership', description: 'Master the principles of effective leadership and team management for inspiring teams and driving success.', category: 'Business', instructor: 'Dr. Emma Richardson', duration: 12, rating: 4.7, thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop', tags: ['Popular'], color: '#3b82f6', icon: 'fas fa-chart-line', activeUsers: 1280 },
    { id: 2, title: 'Data Visualization Essentials', description: 'Learn to create compelling and insightful data visualizations using modern tools and techniques like D3.js.', category: 'Technology', instructor: 'Prof. Alex Chen', duration: 8, rating: 4.5, thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop', tags: ['Technology'], color: '#10b981', icon: 'fas fa-chart-bar', activeUsers: 890 },
    { id: 4, title: 'Blockchain Fundamentals', description: 'Understand the core concepts and applications of blockchain technology, cryptocurrencies, and decentralized systems.', category: 'Technology', instructor: 'Dr. Sarah Lee', duration: 10, rating: 4.8, thumbnail: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1332&auto=format&fit=crop', tags: ['New'], color: '#10b981', icon: 'fas fa-cubes', activeUsers: 2560 },
    { id: 6, title: 'UI/UX Design Principles', description: 'Master the fundamentals of user interface and experience design for creating beautiful and intuitive digital products.', category: 'Design', instructor: 'Lisa Wong', duration: 14, rating: 4.6, thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1470&auto=format&fit=crop', tags: ['Design'], color: '#8b5cf6', icon: 'fas fa-palette', activeUsers: 3120 },
    // --- NEW COURSES ADDED HERE ---
    { id: 7, title: 'Introduction to Python', description: 'A beginner-friendly introduction to Python programming, covering variables, data structures, and functions.', category: 'Technology', instructor: 'John Smith', duration: 15, rating: 4.9, thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1374&auto=format&fit=crop', tags: ['Beginner'], color: '#10b981', icon: 'fab fa-python', activeUsers: 4500 },
    { id: 8, title: 'Psychology of Influence', description: 'Learn the science behind persuasion and influence to improve your communication and negotiation skills.', category: 'Business', instructor: 'Dr. Carol Finch', duration: 9, rating: 4.8, thumbnail: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1374&auto=format&fit=crop', tags: ['Psychology'], color: '#3b82f6', icon: 'fas fa-brain', activeUsers: 1800 },
    { id: 9, title: 'Digital Marketing & SEO', description: 'A complete guide to digital marketing, covering SEO, content marketing, and social media strategies.', category: 'Business', instructor: 'Mark Chen', duration: 20, rating: 4.7, thumbnail: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=1471&auto=format&fit=crop', tags: ['Marketing'], color: '#f97316', icon: 'fas fa-search-dollar', activeUsers: 2200 },
    { id: 10, title: 'Graphic Design Fundamentals', description: 'Explore the core principles of graphic design, including typography, color theory, and layout composition.', category: 'Design', instructor: 'Anna Rodriguez', duration: 18, rating: 4.6, thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1471&auto=format&fit=crop', tags: ['Creative'], color: '#8b5cf6', icon: 'fas fa-pen-nib', activeUsers: 2850 },
]);
const isLoading = ref(true);
const searchQuery = ref('');
const selectedCategory = ref('');
const selectedCourse = ref(null);

// --- COMPUTED PROPERTIES ---
const courses = computed(() => {
    return masterCourseList.value.filter(course => {
        const searchMatch = course.title.toLowerCase().includes(searchQuery.value.toLowerCase());
        const categoryMatch = !selectedCategory.value || course.category === selectedCategory.value;
        return searchMatch && categoryMatch;
    });
});

// --- METHODS ---
const selectCourse = (course) => {
    selectedCourse.value = course;
};
const closePreview = () => {
    selectedCourse.value = null;
}
const viewCourseDetails = (course) => {
    router.push({ name: 'CoursePreview', params: { id: course.id } });
};

// --- LIFECYCLE & WATCHERS ---
onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
        if (window.innerWidth > 1024 && courses.value.length > 0) {
            selectCourse(courses.value[0]);
        }
    }, 1200);
});

watch(courses, (newCourses) => {
    const isSelectedCourseVisible = newCourses.some(c => c.id === selectedCourse.value?.id);
    if (!isSelectedCourseVisible) {
        if (window.innerWidth > 1024) {
            selectedCourse.value = newCourses.length > 0 ? newCourses[0] : null;
        } else {
            selectedCourse.value = null;
        }
    }
});
</script>

<style scoped>
/* Main Split-View Layout */
.split-view-container {
    display: flex;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
    background-color: #f3f4f6;
}

/* Left Panel: Course List */
.course-list-panel {
    width: 100%;
    flex-shrink: 0;
    flex-basis: 420px;
    background-color: #ffffff;
    border-right: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    padding: 24px;
    overflow-y: auto;
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}
.list-header { margin-bottom: 24px; }
.list-header h1 { font-size: 1.75rem; font-weight: 700; color: #111827; }
.list-header p { font-size: 1rem; color: #6b7280; }

.course-filters { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
.search-input, .category-select {
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  width: 100%;
}

.list-items-container { display: flex; flex-direction: column; gap: 8px; }
.course-list-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    border-radius: 12px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: background-color 0.2s ease, border-color 0.2s ease;
}
.course-list-item:hover { background-color: #f9fafb; }
.course-list-item.is-active {
    background-color: #f3f4f6;
    border-color: #d1d5db;
}

.item-icon {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
}
.item-details { flex-grow: 1; }
.item-category { font-size: 0.8rem; font-weight: 500; color: #6b7280; }
.item-title { font-size: 1.1rem; font-weight: 600; color: #111827; margin: 2px 0 0; }
.no-results { text-align: center; padding: 20px; color: #6b7280; }

/* Right Panel: Course Preview */
.course-preview-panel {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px;
    overflow: hidden;
}
.preview-background {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transform: scale(1.1);
    transition: all 0.5s ease-in-out;
}
.preview-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, rgba(0,0,0,0.8), rgba(0,0,0,0.5));
}
.preview-content {
    position: relative;
    z-index: 1;
    color: white;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.content-header .tag { padding: 8px 16px; font-size: 0.85rem; font-weight: 600; border-radius: 30px; display: inline-block; }
.preview-title { font-size: 3.5rem; font-weight: 700; line-height: 1.1; margin: 12px 0; text-shadow: 0 4px 10px rgba(0,0,0,0.5); }
.preview-instructor { font-size: 1.1rem; opacity: 0.8; }
.preview-description { font-size: 1.1rem; line-height: 1.7; opacity: 0.9; }
.preview-stats { display: flex; gap: 32px; margin-top: 16px; }
.stat-item { display: flex; align-items: center; gap: 12px; font-size: 0.95rem; }
.stat-item i { font-size: 1.1rem; opacity: 0.7; }
.cta-button {
    padding: 16px 32px;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 12px;
}
.cta-button:hover { transform: scale(1.05); box-shadow: 0 10px 25px rgba(0,0,0,0.3); }

/* Initial States */
.no-selection-prompt { color: white; text-align: center; }
.skeleton-list { display: flex; flex-direction: column; gap: 8px; }
.skeleton-item { height: 85px; background-color: #e5e7eb; border-radius: 12px; }

.mobile-back-button {
    display: none; /* Hidden on desktop */
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 10;
    background: rgba(0,0,0,0.3);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255,255,255,0.2);
    color: white;
    padding: 10px 16px;
    border-radius: 30px;
    cursor: pointer;
    display: none;
    align-items: center;
    gap: 8px;
}

/* --- RESPONSIVE STYLES --- */
@media (max-width: 1024px) {
    .split-view-container {
        display: block;
        height: auto;
        position: relative;
    }
    .course-list-panel {
        flex-basis: auto;
        max-width: none;
        width: 100%;
        height: 100vh;
        border-right: none;
        transform: translateX(0);
        transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .preview-is-active-mobile .course-list-panel {
        transform: translateX(-100%);
    }

    .course-preview-panel {
        position: fixed;
        inset: 0;
        z-index: 1000;
        padding: 24px;
        transform: translateX(100%);
        transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .preview-is-active-mobile .course-preview-panel {
        transform: translateX(0);
    }

    .mobile-back-button {
        display: flex;
    }

    .preview-title { font-size: 2.5rem; }
    .preview-description { font-size: 1rem; }
    .preview-stats { flex-direction: column; gap: 16px; }
}

@media (max-width: 768px) {
    .list-header h1 { font-size: 1.5rem; }
    .list-header p { font-size: 0.9rem; }
    .course-list-item { padding: 12px; }
    .item-title { font-size: 1rem; }
}

</style>wq 
