<template>
  <div class="split-container">
    <div class="marketing-side">
      <div class="marketing-content">
        <div class="logo-header">
          <div class="logo-crown">
            <svg viewBox="0 0 100 50" class="crown-icon">
              <path d="M10,25 L30,5 L50,25 L70,5 L90,25 L80,45 L20,45 Z" fill="url(#crown-gradient)"/>
              <circle cx="20" cy="15" r="5" fill="url(#gem-gradient)"/>
              <circle cx="50" cy="10" r="7" fill="url(#gem-gradient)"/>
              <circle cx="80" cy="15" r="5" fill="url(#gem-gradient)"/>
              <defs>
                <linearGradient id="crown-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#F5D033" />
                  <stop offset="50%" stop-color="#D4AF37" />
                  <stop offset="100%" stop-color="#F5D033" />
                </linearGradient>
                <linearGradient id="gem-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#00FFFF" />
                  <stop offset="50%" stop-color="#0088FF" />
                  <stop offset="100%" stop-color="#00FFFF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1>Join <span class="gradient-text">ÉCLAT</span></h1>
          <p class="subtitle">Begin your journey to mastery today</p>
        </div>

        <div class="features-list">
          <div class="feature-card" v-for="(feature, index) in features" :key="index">
            <div class="feature-icon" :class="`icon-${index}`">
              <i :class="feature.icon"></i>
            </div>
            <div class="feature-details">
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="quote-mark">“</div>
          <p class="testimonial-text">ÉCLAT's learning platform helped our team upskill 3x faster than traditional methods. The ROI was immediate.</p>
          <div class="author-info">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael Chen" class="author-avatar">
            <div>
              <div class="author-name">Michael Chen</div>
              <div class="author-title">Learning Director, Innovatech</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="signup-side">
      <div class="signup-container">
        <div class="signup-card">
          <div class="holographic-effect"></div>
          <div class="logo-area">
            <div class="logo-crown">
              <svg viewBox="0 0 100 50" class="crown-icon">
                <path d="M10,25 L30,5 L50,25 L70,5 L90,25 L80,45 L20,45 Z" fill="url(#crown-gradient)"/>
                <circle cx="20" cy="15" r="5" fill="url(#gem-gradient)"/>
                <circle cx="50" cy="10" r="7" fill="url(#gem-gradient)"/>
                <circle cx="80" cy="15" r="5" fill="url(#gem-gradient)"/>
              </svg>
            </div>
            <h2>Create Account</h2>
            <p class="tagline">Join our community of learners</p>
          </div>

          <form @submit.prevent="handleSignup" class="signup-form">
            <div class="input-group">
              <label for="name" class="input-label-with-icon">
                <i class="fas fa-user"></i> <span class="label-text">Full Name</span>
              </label>
              <div class="input-wrapper">
                <input
                  type="text"
                  id="name"
                  v-model.trim="name"
                  placeholder="Your full name"
                  required
                  :disabled="isLoading"
                  @input="clearError"
                />
                <div class="input-highlight"></div>
              </div>
            </div>

            <div class="input-group">
              <label for="email" class="input-label-with-icon">
                <i class="fas fa-envelope"></i> <span class="label-text">Email Address</span>
              </label>
              <div class="input-wrapper">
                <input
                  type="email"
                  id="email"
                  v-model.trim="email"
                  placeholder="your.email@example.com"
                  required
                  :disabled="isLoading"
                  @input="clearError"
                />
                <div class="input-highlight"></div>
              </div>
            </div>

            <div class="input-group">
              <label for="password" class="input-label-with-icon">
                <i class="fas fa-lock"></i> <span class="label-text">Password</span>
              </label>
              <div class="input-wrapper password-input-wrapper">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model.trim="password"
                  placeholder="Create a password"
                  required
                  :disabled="isLoading"
                  @input="clearError"
                />
                <div class="input-highlight"></div>
                <button
                  type="button"
                  class="toggle-password"
                  @click="showPassword = !showPassword"
                  :disabled="isLoading"
                  aria-label="Toggle password visibility"
                >
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>

            <div class="input-group">
              <label for="confirmPassword" class="input-label-with-icon">
                <i class="fas fa-lock"></i> <span class="label-text">Confirm Password</span>
              </label>
              <div class="input-wrapper password-input-wrapper">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  v-model.trim="confirmPassword"
                  placeholder="Confirm your password"
                  required
                  :disabled="isLoading"
                  @input="clearError"
                />
                <div class="input-highlight"></div>
                <button
                  type="button"
                  class="toggle-password"
                  @click="showConfirmPassword = !showConfirmPassword"
                  :disabled="isLoading"
                  aria-label="Toggle password visibility"
                >
                  <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>

            <div class="form-options">
              <label class="remember-me">
                <input
                  type="checkbox"
                  v-model="acceptTerms"
                  :disabled="isLoading"
                />
                <span class="checkmark"></span>
                <span>I accept the <a href="#" class="terms-link">Terms</a> and <a href="#" class="terms-link">Privacy Policy</a></span>
              </label>
            </div>

            <button
              type="submit"
              class="signup-button"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">
                <i class="fas fa-user-plus"></i> <span class="button-text">Create Account</span>
              </span>
              <span v-else class="button-loader">
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
              </span>
            </button>

            <div v-if="errorMessage" class="error-message">
              <i class="fas fa-exclamation-triangle"></i> {{ errorMessage }}
            </div>

            <div class="alternative-auth">
              <div class="divider">or sign up with</div>
              <div class="auth-providers">
                <button type="button" class="auth-provider" @click="signInWithGoogle" :disabled="isLoading">
                  <i class="fab fa-google"></i>
                  <span class="tooltip">Google</span>
                </button>
                <button type="button" class="auth-provider" @click="signInWithGithub" :disabled="isLoading">
                  <i class="fab fa-github"></i>
                  <span class="tooltip">GitHub</span>
                </button>
                <button type="button" class="auth-provider" @click="signInWithLinkedIn" :disabled="isLoading">
                  <i class="fab fa-linkedin"></i>
                  <span class="tooltip">LinkedIn</span>
                </button>
              </div>
            </div>

            <p class="login-prompt">
              Already have an account?
              <router-link to="/login" class="login-link">Sign in</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>

    <div class="floating-particles">
      <div class="particle" v-for="(particle, index) in 15" :key="index" :style="particleStyle(index)"></div>
    </div>
  </div>
</template>

<script>
import MessageModal from './MessageModal.vue';

export default {
  name: "Signup",
  components: {
    MessageModal
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
      isLoading: false,
      errorMessage: '',
      showPassword: false,
      showConfirmPassword: false,
      features: [
        {
          icon: 'fas fa-graduation-cap',
          title: 'Expert-Led Courses',
          description: 'Learn from industry leaders and subject matter experts'
        },
        {
          icon: 'fas fa-chart-line',
          title: 'Career Advancement',
          description: 'Gain skills that boost your professional growth'
        }
      ],
      modal: {
        isVisible: false,
        title: '',
        message: '',
      }
    };
  },
  methods: {
    particleStyle(index) {
      const size = Math.random() * 6 + 2;
      const posX = Math.random() * 100;
      const posY = 100 + Math.random() * 20;
      const delay = Math.random() * 5;
      const duration = Math.random() * 15 + 10;
      const opacity = Math.random() * 0.4 + 0.1;

      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${posX}%`,
        top: `${posY}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        opacity: opacity
      };
    },
    showMessage(title, message) {
      this.modal.title = title;
      this.modal.message = message;
      this.modal.isVisible = true;
    },
    clearError() {
      this.errorMessage = '';
    },
    async handleSignup() {
      if (!this.acceptTerms) {
        this.errorMessage = 'Please accept the terms and privacy policy';
        return;
      }

      if (!this.name || !this.email || !this.password || !this.confirmPassword) {
        this.errorMessage = 'Please fill in all fields';
        return;
      }

      if (this.password.length < 6) {
        this.errorMessage = 'Password should be at least 6 characters long';
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      try {
        this.isLoading = true;
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        this.showMessage('Signup Successful!', 'Your account has been created. Redirecting to login...');
        setTimeout(() => {
          this.$router.push('/login');
        }, 1500);
      } catch (error) {
        this.errorMessage = 'Registration failed. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },
    signInWithGoogle() {
      console.log('Google sign-in');
      this.errorMessage = "Google sign-in not implemented.";
    },
    signInWithGithub() {
      console.log('GitHub sign-in');
      this.errorMessage = "GitHub sign-in not implemented.";
    },
    signInWithLinkedIn() {
      console.log('LinkedIn sign-in');
      this.errorMessage = "LinkedIn sign-in not implemented.";
    }
  }
};
</script>

<style scoped>
/* Reuse all styles from Login.vue with minor adjustments */
.split-container {
  display: flex;
  min-height: 100vh;
  background: radial-gradient(ellipse at bottom, #0D1E31 0%, #090A0F 100%);
  font-family: 'Montserrat', sans-serif;
  position: relative;
  overflow: hidden;
}

/* Marketing Side (same as login) */
.marketing-side {
  flex: 1;
  padding: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.marketing-content {
  max-width: 640px;
  width: 100%;
}

.logo-header {
  margin-bottom: 40px;
}

.logo-crown {
  width: 80px;
  height: 40px;
  margin-bottom: 25px;
  filter: drop-shadow(0 0 15px rgba(100, 217, 255, 0.5));
}

.crown-icon {
  width: 100%;
  height: 100%;
}

.logo-header h1 {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 3.2rem;
  color: white;
  margin: 0 0 12px;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(135deg, #F5D033 0%, #64D9FF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-weight: 300;
  letter-spacing: 0.5px;
}

.features-list {
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.feature-card {
  display: flex;
  gap: 20px;
  padding: 20px;
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border-color: rgba(100, 217, 255, 0.2);
}

.feature-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
}

.icon-0 {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(100, 217, 255, 0.1) 100%);
  color: #10B981;
}

.icon-1 {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(100, 217, 255, 0.1) 100%);
  color: #8B5CF6;
}

.feature-details h3 {
  color: white;
  font-size: 1.2rem;
  margin: 0 0 8px;
}

.feature-details p {
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
}

.testimonial-card {
  background: rgba(30, 41, 59, 0.5);
  border-radius: 16px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.testimonial-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #F5D033, #64D9FF);
}

.quote-mark {
  position: absolute;
  top: 15px;
  left: 20px;
  font-size: 5rem;
  color: rgba(100, 217, 255, 0.1);
  font-family: serif;
  line-height: 1;
}

.testimonial-text {
  color: white;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(100, 217, 255, 0.3);
}

.author-name {
  color: white;
  font-weight: 600;
}

.author-title {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

/* Signup Side (similar to login side) */
.signup-side {
  width: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 3;
}

.signup-container {
  width: 100%;
  padding: 30px;
}

.signup-card {
  background: rgba(15, 23, 42, 0.8);
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
              0 0 0 1px rgba(255, 255, 255, 0.05),
              0 0 30px rgba(100, 217, 255, 0.1);
  text-align: center;
  width: 100%;
  position: relative;
  z-index: 10;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform-style: preserve-3d;
  perspective: 1000px;
}

.holographic-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg,
    rgba(100, 217, 255, 0) 0%,
    rgba(100, 217, 255, 0.8) 50%,
    rgba(100, 217, 255, 0) 100%);
  animation: hologram-scan 3s infinite;
  z-index: 1;
}

@keyframes hologram-scan {
  0% { top: 0; opacity: 0; }
  50% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

.logo-area {
  margin-bottom: 30px;
  position: relative;
}

.logo-area h2 {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 2.3rem;
  color: transparent;
  background: linear-gradient(135deg, #F5D033 0%, #64D9FF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  margin: 0 0 8px;
  letter-spacing: 1px;
}

.tagline {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  letter-spacing: 0.5px;
  font-weight: 300;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 25px;
}

/* Reuse all input styles from Login.vue */
.input-group {
  text-align: left;
  position: relative;
}

.input-label-with-icon {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 10px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.label-text {
  position: relative;
  display: inline-block;
}

.label-text::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, #F5D033, #64D9FF);
  transition: width 0.3s ease;
}

.input-group:focus-within .label-text::after {
  width: 100%;
}

.input-wrapper {
  position: relative;
}

.input-highlight {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: linear-gradient(90deg, #F5D033, #64D9FF);
  transition: width 0.4s ease;
}

.input-group input:focus ~ .input-highlight {
  width: 100%;
}

.input-group input {
  width: 100%;
  padding: 14px 18px;
  background-color: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
}

.password-input-wrapper {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  padding: 5px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.toggle-password:hover {
  color: #64D9FF;
  transform: translateY(-50%) scale(1.1);
}

.input-group input:focus {
  outline: none;
  border-color: rgba(100, 217, 255, 0.5);
  box-shadow: 0 0 0 3px rgba(100, 217, 255, 0.1),
              inset 0 1px 3px rgba(0, 0, 0, 0.3);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  position: relative;
  padding-left: 25px;
  font-size: 0.85rem;
}

.remember-me input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(100, 217, 255, 0.3);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.remember-me:hover input ~ .checkmark {
  border-color: rgba(100, 217, 255, 0.7);
}

.remember-me input:checked ~ .checkmark {
  background-color: #64D9FF;
  border-color: #64D9FF;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.remember-me input:checked ~ .checkmark:after {
  display: block;
}

.remember-me .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.terms-link {
  color: #64D9FF;
  text-decoration: none;
  transition: all 0.2s ease;
}

.terms-link:hover {
  color: #F5D033;
  text-decoration: underline;
}

.signup-button {
  background: linear-gradient(135deg, #64D9FF 0%, #F5D033 100%);
  color: #0F172A;
  padding: 16px 25px;
  border: none;
  border-radius: 12px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 10px 20px rgba(100, 217, 255, 0.2),
              0 0 0 1px rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 15px;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  z-index: 1;
}

.button-text {
  position: relative;
  z-index: 2;
}

.signup-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #F5D033 0%, #64D9FF 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
}

.signup-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(100, 217, 255, 0.3),
              0 0 0 1px rgba(255, 255, 255, 0.1);
}
.signup-button:hover:not(:disabled)::before {
  opacity: 1;
}

.signup-button:active:not(:disabled) {
  transform: translateY(1px);
}

.signup-button:disabled {
  background: linear-gradient(135deg, #64D9FF 0%, #F5D033 100%);
  opacity: 0.7;
  cursor: not-allowed;
}

.button-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 24px;
}

.particle {
  width: 8px;
  height: 8px;
  background-color: #0F172A;
  border-radius: 50%;
  animation: particle-pulse 1.4s infinite ease-in-out;
}

.particle:nth-child(1) {
  animation-delay: 0s;
}

.particle:nth-child(2) {
  animation-delay: 0.2s;
}

.particle:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes particle-pulse {
  0%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

.error-message {
  background-color: rgba(239, 68, 68, 0.2);
  color: #EF4444;
  padding: 15px;
  border-radius: 10px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
  border: 1px solid rgba(239, 68, 68, 0.3);
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
}

.alternative-auth {
  margin-top: 30px;
}

.divider {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0 15px;
}

.auth-providers {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.auth-provider {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.auth-provider:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(100, 217, 255, 0.2);
  border-color: rgba(100, 217, 255, 0.3);
}

.auth-provider:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.auth-provider:nth-child(1):hover {
  background: rgba(219, 68, 55, 0.2);
  color: #DB4437;
}

.auth-provider:nth-child(2):hover {
  background: rgba(24, 23, 23, 0.2);
  color: #f5f5f5;
}

.auth-provider:nth-child(3):hover {
  background: rgba(0, 119, 181, 0.2);
  color: #0077B5;
}

.tooltip {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.7rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  white-space: nowrap;
  pointer-events: none;
}

.auth-provider:hover .tooltip {
  opacity: 1;
  visibility: visible;
  bottom: -35px;
}

.login-prompt {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
  margin-top: 25px;
}

.login-link {
  color: #64D9FF;
  text-decoration: none;
  font-weight: 600;
  position: relative;
  transition: all 0.3s ease;
}

.login-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, #F5D033, #64D9FF);
  transition: width 0.3s ease;
}

.login-link:hover {
  color: #F5D033;
}

.login-link:hover::after {
  width: 100%;
}

/* Floating particles */
.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.floating-particles .particle {
  position: absolute;
  background: rgba(100, 217, 255, 0.6);
  border-radius: 50%;
  filter: blur(1px);
  animation: float linear infinite;
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-120vh) translateX(20px);
    opacity: 0;
  }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .marketing-side {
    padding: 50px;
  }
}

@media (max-width: 992px) {
  .split-container {
    flex-direction: column;
    overflow-y: auto;
  }

  .marketing-side, .signup-side {
    width: 100%;
    padding: 40px 20px;
  }

  .marketing-content {
    max-width: 100%;
    padding: 0;
  }

  .signup-container {
    max-width: 600px;
    margin: 0 auto;
  }

  .logo-header h1 {
    font-size: 2.8rem;
  }
  .signup-card {
    padding: 40px 30px;
  }
}

@media (max-width: 768px) {
  .marketing-side, .signup-side {
    padding: 30px 15px;
  }

  .logo-header h1 {
    font-size: 2.2rem;
  }

  .feature-card {
    flex-direction: column;
    gap: 15px;
  }

  .signup-card {
    padding: 30px 20px;
  }

  .signup-button {
    padding: 14px 20px;
    font-size: 1rem;
  }

  .auth-provider {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .signup-card {
    padding: 25px 15px;
  }

  .logo-area h2 {
    font-size: 2rem;
  }
}
</style>