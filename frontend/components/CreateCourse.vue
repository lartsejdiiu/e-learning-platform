<template>
  <div class="page-content">
    <h1>Create New Course</h1>
    <p class="subtitle">Design and publish your own course to share with the community.</p>

    <div class="course-form glass-card">
      <form @submit.prevent="submitCourse">
        <div class="form-section">
          <h3>Basic Information</h3>
          <div class="form-group">
            <label for="course-title">Course Title</label>
            <input type="text" id="course-title" v-model="course.title" required>
          </div>
          <div class="form-group">
            <label for="course-description">Description</label>
            <textarea id="course-description" v-model="course.description" rows="4" required></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="course-category">Category</label>
              <select id="course-category" v-model="course.category" required>
                <option value="">Select a category</option>
                <option value="Business">Business</option>
                <option value="Technology">Technology</option>
                <option value="Arts">Arts & Culture</option>
                <option value="Science">Science</option>
                <option value="Language">Language</option>
                <option value="Health">Health & Wellness</option>
                <option value="Design">Design</option>
              </select>
            </div>
            <div class="form-group">
              <label for="course-level">Difficulty Level</label>
              <select id="course-level" v-model="course.level" required>
                <option value="">Select level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Course Content</h3>
          <div class="module-list">
            <div v-for="(module, index) in course.modules" :key="index" class="module-item">
              <div class="module-header">
                <h4>Module {{ index + 1 }}</h4>
                <button type="button" @click="removeModule(index)" class="remove-btn">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div class="form-group">
                <label :for="'module-title-' + index">Title</label>
                <input type="text" :id="'module-title-' + index" v-model="module.title" required>
              </div>
              <div class="form-group">
                <label :for="'module-desc-' + index">Description</label>
                <textarea :id="'module-desc-' + index" v-model="module.description" rows="3"></textarea>
              </div>
            </div>
            <button type="button" @click="addModule" class="add-module-btn">
              <i class="fas fa-plus"></i> Add Module
            </button>
          </div>
        </div>

        <div class="form-section">
          <h3>Pricing & Visibility</h3>
          <div class="form-row">
            <div class="form-group">
              <label for="course-price">Price ($)</label>
              <input type="number" id="course-price" v-model="course.price" min="0" step="0.01">
            </div>
            <div class="form-group">
              <label for="course-visibility">Visibility</label>
              <select id="course-visibility" v-model="course.visibility" required>
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" @click="cancel" class="secondary-btn">Cancel</button>
          <button type="submit" class="primary-btn">Publish Course</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateCourse',
  data() {
    return {
      course: {
        title: '',
        description: '',
        category: '',
        level: '',
        price: 0,
        visibility: 'public',
        modules: [
          {
            title: '',
            description: ''
          }
        ]
      }
    };
  },
  methods: {
    addModule() {
      this.course.modules.push({
        title: '',
        description: ''
      });
    },
    removeModule(index) {
      if (this.course.modules.length > 1) {
        this.course.modules.splice(index, 1);
      }
    },
    submitCourse() {
      console.log('Submitting course:', this.course);
      this.$emit('show-message', 'Course Created', `"${this.course.title}" has been successfully created!`);
      this.$router.push('/dashboard/courses');
    },
    cancel() {
      this.$router.go(-1);
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

.form-section {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #E2E8F0;
}

.form-section:last-child {
  border-bottom: none;
}

.form-section h3 {
  color: #7C53FF;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #4A5568;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  color: #1E293B;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #7C53FF;
  box-shadow: 0 0 0 3px rgba(124, 83, 255, 0.2);
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-row .form-group {
  flex: 1;
}

.module-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.module-item {
  background: rgba(255, 255, 255, 0.7);
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.module-header h4 {
  margin: 0;
  color: #7C53FF;
}

.remove-btn {
  background: none;
  border: none;
  color: #EF4444;
  cursor: pointer;
  font-size: 1rem;
  padding: 5px;
}

.add-module-btn {
  background: rgba(255, 255, 255, 0.7);
  border: 1px dashed #7C53FF;
  color: #7C53FF;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.add-module-btn:hover {
  background: rgba(124, 83, 255, 0.1);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
}

.primary-btn, .secondary-btn {
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
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

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .glass-card {
    padding: 20px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .primary-btn, .secondary-btn {
    width: 100%;
  }
}
</style>