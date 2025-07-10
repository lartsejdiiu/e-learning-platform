<template>
  <div class="settings-page">
    <div class="bg-blob-1"></div>
    <div class="bg-blob-2"></div>
    <div class="settings-header">
      <h1>Account Settings</h1>
      <p class="subtitle">Manage your profile, security, and notification preferences.</p>
    </div>

    <div class="settings-content-card">
      <div class="tabs-nav">
        <button :class="{ active: activeTab === 'profile' }" @click="activeTab = 'profile'">
          <i class="fas fa-user-circle"></i>
          <span>Profile</span>
        </button>
        <button :class="{ active: activeTab === 'password' }" @click="activeTab = 'password'">
          <i class="fas fa-shield-alt"></i>
          <span>Password</span>
        </button>
        <button :class="{ active: activeTab === 'notifications' }" @click="activeTab = 'notifications'">
          <i class="fas fa-bell"></i>
          <span>Notifications</span>
        </button>
      </div>

      <div class="tab-content">
        <transition name="fade-up" mode="out-in">
          <div :key="activeTab">
            <section v-if="activeTab === 'profile'" class="settings-section">
              <h2 class="section-title">Edit Your Profile</h2>
              <hr class="section-divider" />
              <form @submit.prevent="saveProfile">
                <div class="form-field">
                  <label for="username" class="form-label">Username</label>
                  <input id="username" v-model="profile.username" type="text" required class="form-input" placeholder="e.g., lartsejdiu" />
                </div>
                <div class="form-field">
                  <label for="email" class="form-label">Email Address</label>
                  <input id="email" v-model="profile.email" type="email" required class="form-input" placeholder="your@email.com"/>
                </div>
                <div class="form-field">
                  <label for="bio" class="form-label">Your Bio</label>
                  <textarea id="bio" v-model="profile.bio" rows="4" class="form-textarea" placeholder="Tell us a bit about yourself..."></textarea>
                </div>
                <div class="form-actions">
                  <button type="submit" class="primary-btn"><span>Save Changes</span></button>
                </div>
              </form>
            </section>

            <section v-if="activeTab === 'password'" class="settings-section">
              <h2 class="section-title">Change Password</h2>
              <hr class="section-divider" />
              <form @submit.prevent="changePassword">
                <div class="form-field">
                  <label for="current-pass" class="form-label">Current Password</label>
                  <input id="current-pass" v-model="password.current" type="password" required class="form-input" />
                </div>
                <div class="form-group">
                    <div class="form-field">
                        <label for="new-pass" class="form-label">New Password</label>
                        <input id="new-pass" v-model="password.new" type="password" required class="form-input" />
                    </div>
                    <div class="form-field">
                        <label for="confirm-pass" class="form-label">Confirm New Password</label>
                        <input id="confirm-pass" v-model="password.confirm" type="password" required class="form-input" />
                    </div>
                </div>
                <div class="form-actions">
                  <button type="submit" class="primary-btn"><span>Update Password</span></button>
                </div>
              </form>
            </section>

            <section v-if="activeTab === 'notifications'" class="settings-section">
              <h2 class="section-title">Notification Preferences</h2>
               <hr class="section-divider" />
              <div class="toggle-settings">
                <div class="toggle-item">
                    <div class="toggle-icon-label">
                        <i class="fas fa-envelope"></i>
                        <div class="toggle-text">
                          <span class="toggle-label">Email Notifications</span>
                          <span class="toggle-description">Receive updates and news via email.</span>
                        </div>
                    </div>
                  <input type="checkbox" id="email-toggle" class="toggle-checkbox" v-model="notifications.email" />
                  <label for="email-toggle" class="toggle-switch"></label>
                </div>
                <div class="toggle-item">
                   <div class="toggle-icon-label">
                        <i class="fas fa-mobile-alt"></i>
                        <div class="toggle-text">
                          <span class="toggle-label">Push Notifications</span>
                          <span class="toggle-description">Get alerts directly on your devices.</span>
                        </div>
                    </div>
                  <input type="checkbox" id="push-toggle" class="toggle-checkbox" v-model="notifications.push" />
                  <label for="push-toggle" class="toggle-switch"></label>
                </div>
                <div class="toggle-item">
                  <div class="toggle-icon-label">
                        <i class="fas fa-newspaper"></i>
                        <div class="toggle-text">
                          <span class="toggle-label">Monthly Newsletter</span>
                           <span class="toggle-description">Subscribe to our monthly newsletter.</span>
                        </div>
                    </div>
                  <input type="checkbox" id="newsletter-toggle" class="toggle-checkbox" v-model="notifications.newsletter" />
                  <label for="newsletter-toggle" class="toggle-switch"></label>
                </div>
                <div class="form-actions">
                  <button @click="saveNotifications" class="primary-btn"><span>Save Preferences</span></button>
                </div>
              </div>
            </section>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModernSettings',
  data() {
    return {
      activeTab: 'profile',
      profile: {
        username: 'Lart Sejdiu',
        email: 'lartsejdiiu@gmail.com',
        bio: 'Just a developer navigating the digital frontier.',
      },
      password: { current: '', new: '', confirm: '' },
      notifications: { email: true, push: false, newsletter: true },
    };
  },
  methods: {
    saveProfile() {
      console.log('Profile saved:', this.profile);
      alert('Profile updated successfully.');
    },
    changePassword() {
      if (this.password.new !== this.password.confirm) {
        alert('Error: New passwords do not match.');
        return;
      }
      if (!this.password.new || !this.password.current) {
        alert('Error: All password fields are required.');
        return;
      }
      console.log('Password changed');
      alert('Password updated successfully.');
      this.password = { current: '', new: '', confirm: '' };
    },
    saveNotifications() {
      console.log('Notification settings saved:', this.notifications);
      alert('Notification preferences have been saved.');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

:root {
  /* NEW: Changed accent color to Cyan */
  --accent-color: #3AE3C8;
  --accent-color-glow: rgba(58, 227, 200, 0.3);
  
  --text-primary: #1A202C; /* Darker text for better contrast */
  --text-secondary: #4A5568;
  --border-color: rgba(255, 255, 255, 0.2); /* Lighter border for glass */
  --page-bg: #F0F2F5;
  --input-bg: rgba(255, 255, 255, 0.5);
}

.settings-page {
  position: relative;
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
  background-color: var(--page-bg);
  min-height: 100vh;
  overflow: hidden; /* Hide blob overflow */
}

/* NEW: Decorative background blobs for the glass effect */
.bg-blob-1, .bg-blob-2 {
    width: 400px;
    height: 400px;
    background-image: linear-gradient(135deg, var(--accent-color) 0%, #7C53FF 100%);
    border-radius: 50%;
    filter: blur(150px);
    opacity: 0.3;
    position: absolute;
    z-index: 0;
}
.bg-blob-1 {
    top: -100px;
    left: -150px;
}
.bg-blob-2 {
    bottom: -150px;
    right: -100px;
    background-image: linear-gradient(135deg, #FF65A5 0%, #FFC83D 100%);
}


/* Main card is now a child of the page, above the blobs */
.settings-header, .settings-content-card {
    position: relative;
    z-index: 1;
}

.settings-header {
  margin-bottom: 32px;
  text-align: left;
}

.settings-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.settings-header .subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
}

/* --- NEW: "Lique Glass" Card Style --- */
.settings-content-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* --- Tab Navigation --- */
.tabs-nav {
  display: flex;
  padding: 8px 48px 0;
  border-bottom: 1px solid var(--border-color);
  gap: 24px;
}

.tabs-nav button {
  padding: 16px 4px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}

.tabs-nav button:hover {
  color: var(--text-primary);
}

.tabs-nav button.active {
  color: var(--accent-color);
  font-weight: 600;
  border-bottom-color: var(--accent-color);
}

.tab-content {
  padding: 32px 48px 40px;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
}

.section-divider {
    border: none;
    height: 1px;
    background-color: var(--border-color);
    margin: 16px 0 32px;
}

/* --- Forms --- */
.form-field {
  margin-bottom: 28px;
}

.form-label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 14px;
  color: var(--text-primary);
}

.form-input,
.form-textarea {
  width: 100%;
  background-color: var(--input-bg);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 12px 16px;
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 15px;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px var(--accent-color-glow);
  background-color: rgba(255, 255, 255, 0.8);
}

.form-group {
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 28px;
}
.form-group .form-field:last-child {
    margin-bottom: 0;
}


.form-actions {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

/* --- NEW: Button Style --- */
.primary-btn {
  background: var(--accent-color);
  color: var(--text-primary); /* Changed for better contrast */
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px var(--accent-color-glow);
}
.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--accent-color-glow);
  filter: brightness(1.1);
}

/* --- Toggle Switch --- */
.toggle-settings {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.toggle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.3);
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.toggle-icon-label {
  display: flex;
  align-items: center;
  gap: 16px;
}
.toggle-icon-label i {
  font-size: 18px;
  color: var(--text-secondary);
  width: 24px;
  text-align: center;
}
.toggle-text {
    display: flex;
    flex-direction: column;
}
.toggle-label {
  color: var(--text-primary);
  font-weight: 500;
  font-size: 15px;
}
.toggle-description {
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.5;
}

.toggle-checkbox { display: none; }

.toggle-switch {
  position: relative;
  width: 48px;
  height: 26px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 13px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex-shrink: 0;
}

.toggle-switch::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  top: 3px;
  left: 3px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.toggle-checkbox:checked + .toggle-switch {
  background: var(--accent-color);
}

.toggle-checkbox:checked + .toggle-switch::after {
  transform: translateX(22px);
}

/* --- Transitions --- */
.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* --- Responsive Design --- */
@media (max-width: 768px) {
  .settings-page {
    padding: 24px;
  }
  .tabs-nav {
    padding: 0 24px;
    gap: 16px;
  }
  .tab-content {
    padding: 32px 24px;
  }
  .form-actions {
      justify-content: center;
  }
  .primary-btn {
      width: 100%;
  }
}

@media (max-width: 480px) {
  .settings-page {
    padding: 16px;
  }
  .settings-header h1 {
    font-size: 24px;
  }
  .settings-header .subtitle {
    font-size: 14px;
  }
  .tabs-nav {
    padding: 0 16px;
    gap: 8px;
    justify-content: space-between;
  }
  .tabs-nav button {
    font-size: 14px;
    gap: 6px;
  }
  .tab-content {
    padding: 24px 16px;
  }
  .toggle-item {
      align-items: flex-start;
      flex-direction: column;
      gap: 16px;
  }
  .toggle-switch {
      align-self: flex-end;
  }
}
</style>