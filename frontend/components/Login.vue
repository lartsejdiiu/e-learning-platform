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
          <h1>Experience <span class="gradient-text">ÉCLAT</span></h1>
          <p class="subtitle">The future of secure digital experiences</p>
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
          <p class="testimonial-text">ÉCLAT's authentication system reduced our security incidents by 92% while improving user onboarding time.</p>
          <div class="author-info">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop" alt="Sarah Johnson" class="author-avatar">
            <div>
              <div class="author-name">Sarah Johnson</div>
              <div class="author-title">CTO, TechCorp</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="login-side">
      <div class="login-container">
        <div class="login-card">
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
            <h2>Welcome Back</h2>
            <p class="tagline">Sign in to continue to ÉCLAT</p>
          </div>

          <form @submit.prevent="handleLogin" class="login-form">
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
                  placeholder="Enter your password"
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

            <div class="form-options">
              <label class="remember-me">
                <input
                  type="checkbox"
                  v-model="rememberMe"
                  :disabled="isLoading"
                />
                <span class="checkmark"></span>
                <span>Remember me</span>
              </label>
              <router-link to="#" class="forgot-password" @click.prevent="showForgotPasswordModal = true">Forgot password?</router-link>
            </div>

            <div v-if="showForgotPasswordModal" class="modal-overlay">
              <div class="modal-content">
                <button class="modal-close" @click="showForgotPasswordModal = false">
                  <i class="fas fa-times"></i>
                </button>
                
                <div class="modal-logo">
                  <svg viewBox="0 0 100 50" class="crown-icon">
                    <path d="M10,25 L30,5 L50,25 L70,5 L90,25 L80,45 L20,45 Z" fill="url(#crown-gradient)"/>
                    <circle cx="20" cy="15" r="5" fill="url(#gem-gradient)"/>
                    <circle cx="50" cy="10" r="7" fill="url(#gem-gradient)"/>
                    <circle cx="80" cy="15" r="5" fill="url(#gem-gradient)"/>
                  </svg>
                </div>
                
                <h3>Reset Your Password</h3>
                
                <div v-if="!forgotPasswordSuccess">
                  <p>Enter your email to receive a reset code</p>
                  
                  <div class="input-group">
                    <label for="forgot-email" class="input-label-with-icon">
                      <i class="fas fa-envelope"></i> <span class="label-text">Email Address</span>
                    </label>
                    <div class="input-wrapper">
                      <input
                        type="email"
                        id="forgot-email"
                        v-model.trim="forgotPasswordEmail"
                        placeholder="your.email@example.com"
                        required
                        :disabled="isLoading"
                      />
                      <div class="input-highlight"></div>
                    </div>
                  </div>
                  
                  <button
                    @click="handleForgotPassword"
                    class="login-button"
                    :disabled="isLoading"
                  >
                    <span v-if="!isLoading">
                      Send Reset Code
                    </span>
                    <span v-else class="button-loader">
                      <div class="particle"></div>
                      <div class="particle"></div>
                      <div class="particle"></div>
                    </span>
                  </button>
                </div>
                
                <div v-else class="success-message">
                  <i class="fas fa-check-circle"></i>
                  <p>Reset code sent to <strong>{{ forgotPasswordEmail }}</strong></p>
                  <p>Please check your email.</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="login-button"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">
                <i class="fas fa-fingerprint"></i> <span class="button-text">Biometric Login</span>
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
              <div class="divider">or authenticate with</div>
              <div class="auth-providers">
                <button type="button" class="auth-provider" @click="signInWithGoogle" :disabled="isLoading">
                  <i class="fab fa-google"></i>
                  <span class="tooltip">Google</span>
                </button>
                <button type="button" class="auth-provider" @click="signInWithGithub" :disabled="isLoading">
                  <i class="fab fa-github"></i>
                  <span class="tooltip">GitHub</span>
                </button>
                <button type="button" class="auth-provider" @click="signInWithFaceId" :disabled="isLoading">
                  <i class="fas fa-user-circle"></i>
                  <span class="tooltip">Face ID</span>
                </button>
              </div>
            </div>

            <p class="signup-prompt">
              New to ÉCLAT?
              <router-link to="/signup" class="signup-link">Create account</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>

    <div class="floating-particles">
  <div class="particle" v-for="n in 15" :key="n" :style="particleStyle(n)"></div>
</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      isLoading: false,
      errorMessage: '',
      showPassword: false,
      features: [
        {
          icon: 'fas fa-shield-alt',
          title: 'Military-Grade Security',
          description: 'End-to-end encryption with biometric authentication'
        },
        {
          icon: 'fas fa-bolt',
          title: 'Lightning Fast',
          description: 'Global CDN ensures instant access from anywhere'
        }
      ],
      forgotPasswordEmail: '',
      showForgotPasswordModal: false,
      forgotPasswordSuccess: false,
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
    async handleLogin() {
      try {
        this.isLoading = true;
        this.clearError();
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (this.email === 'test@example.com' && this.password === 'password123') {
          const mockToken = 'mock-auth-token-' + Date.now();
          localStorage.setItem('authToken', mockToken);
          const redirectPath = this.$route.query.redirect || '/dashboard';
          this.$router.push(redirectPath);
        } else {
          this.errorMessage = 'Invalid email or password.';
        }
      } catch (error) {
        this.errorMessage = 'Authentication failed. Please try again.';
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
    signInWithFaceId() {
      console.log('Face ID authentication');
      this.errorMessage = "Face ID authentication not implemented.";
    },
    clearError() {
      this.errorMessage = '';
    },
    async handleForgotPassword() {
      if (!this.forgotPasswordEmail) {
        this.errorMessage = 'Please enter your email address';
        return;
      }

      this.isLoading = true;
      this.clearError();
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        this.forgotPasswordSuccess = true;
        console.log(`Password reset code sent to ${this.forgotPasswordEmail}`);
        
        setTimeout(() => {
          this.showForgotPasswordModal = false;
          // Reset state after a short delay to allow fade out
          setTimeout(() => {
            this.forgotPasswordSuccess = false;
            this.forgotPasswordEmail = '';
          }, 500);
        }, 5000);
      } catch (error) {
        this.errorMessage = 'Failed to send reset code. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');

/* Base Layout */
.split-container {
  display: flex;
  min-height: 100vh;
  background: radial-gradient(ellipse at bottom, #0D1E31 0%, #090A0F 100%);
  font-family: 'Montserrat', sans-serif;
  position: relative;
  overflow: hidden; /* CRITICAL: Prevents any scrolling on the main container */
}

/* Marketing Side */
.marketing-side {
  flex: 1;
  padding: 60px; /* Reduced padding */
  display: flex;
  align-items: center; /* Ensures content is vertically centered */
  justify-content: center;
  position: relative;
  z-index: 2;
}

.marketing-content {
  max-width: 640px;
  width: 100%;
}

.logo-header {
  margin-bottom: 40px; /* Reduced margin */
}

.logo-crown {
  width: 80px;
  height: 40px;
  margin-bottom: 25px; /* Slightly reduced margin */
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
  margin: 0 0 12px; /* Slightly reduced margin */
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
  margin: 40px 0; /* Reduced margin */
  display: flex;
  flex-direction: column;
  gap: 25px; /* Reduced gap */
}

.feature-card {
  display: flex;
  gap: 20px;
  padding: 20px; /* Reduced padding */
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
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(100, 217, 255, 0.1) 100%);
  color: #EF4444;
}

.icon-1 {
  background: linear-gradient(135deg, rgba(245, 208, 51, 0.1) 0%, rgba(100, 217, 255, 0.1) 100%);
  color: #F5D033;
}

.feature-details h3 {
  color: white;
  font-size: 1.2rem;
  margin: 0 0 8px; /* Slightly reduced margin */
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
  padding: 30px; /* Reduced padding */
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
  top: 15px; /* Adjusted position */
  left: 20px; /* Adjusted position */
  font-size: 5rem;
  color: rgba(100, 217, 255, 0.1);
  font-family: serif;
  line-height: 1;
}

.testimonial-text {
  color: white;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 20px; /* Reduced margin */
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

/* Login Side */
.login-side {
  width: 480px;
  display: flex;
  align-items: center; /* Ensures content is vertically centered */
  justify-content: center;
  position: relative;
  z-index: 3;
}

.login-container {
  width: 100%;
  padding: 30px; /* Reduced padding */
}

.login-card {
  background: rgba(15, 23, 42, 0.8);
  padding: 40px 30px; /* Reduced padding */
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
  margin-bottom: 30px; /* Reduced margin */
  position: relative;
}

.logo-area h2 {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 2.3rem; /* Slightly reduced font size */
  color: transparent;
  background: linear-gradient(135deg, #F5D033 0%, #64D9FF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  margin: 0 0 8px; /* Reduced margin */
  letter-spacing: 1px;
}

.tagline {
  font-size: 0.95rem; /* Slightly reduced font size */
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  letter-spacing: 0.5px;
  font-weight: 300;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Reduced gap */
  margin-bottom: 25px; /* Reduced margin */
}

.input-group {
  text-align: left;
  position: relative;
}

.input-label-with-icon {
  display: flex;
  align-items: center;
  gap: 8px; /* Slightly reduced gap */
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 10px; /* Slightly reduced margin */
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
  padding: 14px 18px; /* Slightly reduced padding */
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

.forgot-password {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
}

.forgot-password::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, #F5D033, #64D9FF);
  transition: width 0.3s ease;
}

.forgot-password:hover {
  color: #64D9FF;
}

.forgot-password:hover::after {
  width: 100%;
}

.login-button {
  background: linear-gradient(135deg, #64D9FF 0%, #F5D033 100%);
  color: #0F172A;
  padding: 16px 25px; /* Slightly reduced padding */
  border: none;
  border-radius: 12px;
  font-size: 1.05rem; /* Slightly reduced font size */
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 10px 20px rgba(100, 217, 255, 0.2),
              0 0 0 1px rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 15px; /* Reduced margin */
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  z-index: 1;
}

.button-text {
  position: relative;
  z-index: 2;
}

.login-button::before {
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

.login-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(100, 217, 255, 0.3),
              0 0 0 1px rgba(255, 255, 255, 0.1);
}
.login-button:hover:not(:disabled)::before {
  opacity: 1;
}

.login-button:active:not(:disabled) {
  transform: translateY(1px);
}

.login-button:disabled {
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
  margin-top: 15px; /* Reduced margin */
  border: 1px solid rgba(239, 68, 68, 0.3);
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
}

.alternative-auth {
  margin-top: 30px; /* Reduced margin */
}

.divider {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  margin-bottom: 15px; /* Reduced margin */
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
  gap: 15px; /* Reduced gap */
}

.auth-provider {
  width: 48px; /* Slightly reduced size */
  height: 48px; /* Slightly reduced size */
  border-radius: 50%;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.2rem; /* Slightly reduced font size */
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
  background: rgba(0, 122, 255, 0.2);
  color: #64D9FF;
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

.signup-prompt {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
  margin-top: 25px; /* Reduced margin */
}

.signup-link {
  color: #64D9FF;
  text-decoration: none;
  font-weight: 600;
  position: relative;
  transition: all 0.3s ease;
}

.signup-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, #F5D033, #64D9FF);
  transition: width 0.3s ease;
}

.signup-link:hover {
  color: #F5D033;
}

.signup-link:hover::after {
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
  overflow: hidden; /* Ensures particles don't show when starting off-screen if they are rendered initially */
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
    transform: translateY(0) translateX(0); /* Particles start at their `top: ${posY}%` defined in JS */
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-120vh) translateX(20px); /* Ensures they go fully off-screen top */
    opacity: 0;
  }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .marketing-side {
    padding: 50px; /* Further reduced padding */
  }
}

@media (max-width: 992px) {
  .split-container {
    flex-direction: column;
    overflow-y: auto; /* Allow scrolling on smaller screens if content overflows after stacking */
  }

  .marketing-side, .login-side {
    width: 100%;
    padding: 40px 20px; /* Adjust padding for stacked view */
  }

  .marketing-content {
    max-width: 100%;
    padding: 0; /* Remove horizontal padding here, parent handles it */
  }

  .login-container {
    max-width: 600px;
    margin: 0 auto;
  }

  .logo-header h1 {
    font-size: 2.8rem;
  }
  .login-card {
    padding: 40px 30px;
  }
}

@media (max-width: 768px) {
  .marketing-side, .login-side {
    padding: 30px 15px; /* Further reduced padding */
  }

  .logo-header h1 {
    font-size: 2.2rem;
  }

  .feature-card {
    flex-direction: column;
    gap: 15px;
  }

  .login-card {
    padding: 30px 20px; /* Adjusted padding */
  }

  .login-button {
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

  .forgot-password {
    align-self: flex-end;
  }

  .login-card {
    padding: 25px 15px;
  }

  .logo-area h2 {
    font-size: 2rem;
  }
}
/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: rgba(15, 23, 42, 0.95);
  padding: 40px;
  border-radius: 20px;
  width: 100%;
  max-width: 450px;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
              0 0 0 1px rgba(255, 255, 255, 0.05),
              0 0 30px rgba(100, 217, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-close:hover {
  color: #64D9FF;
  transform: rotate(90deg);
}

.modal-logo {
  width: 60px;
  height: 30px;
  margin: 0 auto 20px;
  filter: drop-shadow(0 0 15px rgba(100, 217, 255, 0.5));
}

.modal-content h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  color: white;
  margin: 0 0 15px;
}

.modal-content p {
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 25px;
  font-size: 0.95rem;
}

.success-message {
  color: #4ade80;
  padding: 20px 0;
}

.success-message i {
  font-size: 3rem;
  margin-bottom: 15px;
  color: #4ade80;
}

.success-message p {
  color: rgba(255, 255, 255, 0.8);
  margin: 5px 0;
}

.success-message strong {
  color: white;
}
</style>