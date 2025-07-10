<template>
  <div class="luxe-dashboard-layout">
    <div class="luxe-sidebar">
      <div class="branding">
        <div class="logo">
          <svg viewBox="0 0 100 100" class="logo-icon">
            <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="none" stroke="#D4AF37" stroke-width="4"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="#D4AF37" stroke-width="4"/>
            <path d="M30 30 L70 70 M70 30 L30 70" stroke="#D4AF37" stroke-width="4"/>
          </svg>
        </div>
        <h1>Éclat</h1>
      </div>
      
      <nav class="main-nav">
        <router-link to="/dashboard" class="nav-item">
          <i class="fas fa-home"></i>
          <span>Dashboard</span>
        </router-link>
        <router-link to="/dashboard/courses" class="nav-item">
          <i class="fas fa-book-open"></i>
          <span>My Courses</span>
        </router-link>
        <router-link to="/dashboard/CourseList" class="nav-item">
          <i class="fas fa-th-list"></i>
          <span>All Courses</span>
        </router-link>
        <router-link to="/dashboard/progress" class="nav-item">
          <i class="fas fa-chart-line"></i>
          <span>Progress</span>
        </router-link>
        
        <router-link to="/dashboard/certificate" class="nav-item desktop-only-nav">
          <i class="fas fa-certificate"></i>
          <span>Certificate</span>
        </router-link>
        <router-link to="/dashboard/settings" class="nav-item desktop-only-nav">
          <i class="fas fa-cog"></i> 
          <span>Settings</span>
        </router-link>

        <a @click="toggleMoreMenu" class="nav-item mobile-only-nav">
          <i class="fas fa-ellipsis-h"></i>
          <span>More</span>
        </a>
      </nav>
      
       <div class="user-profile">
        <div class="avatar">
          <img src="data:image/jpeg;base64,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" alt="User avatar">
        </div>
        <div class="user-info">
          <h3>{{ userName }}</h3>
          <p>User ID: {{ displayUserId }}</p>
        </div>
        <button class="logout-btn" @click="handleLogout">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>

    <div class="luxe-main-content-wrapper">
      <div class="top-bar">
        <div class="search-bar" @click="openSearch">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Search courses, resources..." readonly>
        </div>
        <div class="top-bar-actions">
          <div class="action-wrapper" ref="newItemRef">
            <button class="action-btn" @click="handleNewItem">
              <i class="fas fa-plus-circle"></i>
              <span>New Item</span>
            </button>
            <transition name="dropdown-fade">
              <div v-if="isNewItemOpen" class="action-dropdown-panel">
                <div class="dropdown-item" @click="createNew('course')">
                  <i class="fas fa-book"></i> New Course
                </div>
                <div class="dropdown-item" @click="createNew('resource')">
                  <i class="fas fa-file-alt"></i> New Resource
                </div>
                <div class="dropdown-item" @click="createNew('upload')">
                  <i class="fas fa-upload"></i> Upload File
                </div>
              </div>  
            </transition>
          </div>
          <div class="action-wrapper" ref="notificationsRef">
            <button class="notification-btn" @click="handleNotifications">
              <i class="fas fa-bell"></i>
              <span v-if="notifications.length > 0" class="badge">{{ notifications.length }}</span>
            </button>
            <transition name="dropdown-fade">
              <div v-if="isNotificationsOpen" class="action-dropdown-panel notifications-panel">
                <div class="dropdown-header">
                  <h3>Notifications</h3>
                </div>
                <div class="dropdown-content">
                  <div v-if="notifications.length === 0" class="no-notifications">
                    <p>No new notifications</p>
                  </div>
                  <div v-else v-for="notif in notifications" :key="notif.id" class="notification-item">
                    <div class="notification-icon" :style="{ backgroundColor: notif.color }">
                      <i :class="notif.icon"></i>
                    </div>
                    <div class="notification-text">
                      <p v-html="notif.message"></p>
                      <span>{{ notif.time }}</span>
                    </div>
                  </div>
                </div>
                <div class="dropdown-footer">
                  <router-link to="./dashboard/all-notifications" @click="isNotificationsOpen = false">View All Notifications</router-link>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <router-view class="main-page-view" @show-message="showMessage" /> 
    </div>
    
    <MessageModal 
      :isVisible="modal.isVisible" 
      :title="modal.title" 
      :message="modal.message" 
      @update:isVisible="modal.isVisible = $event" 
    />

    <div v-if="isMoreMenuOpen" class="mobile-more-menu-overlay" @click="toggleMoreMenu">
      <div class="mobile-more-menu" @click.stop>
        <a class="mobile-menu-item" @click="openNewItemMobileMenu">
          <i class="fas fa-plus-circle"></i>
          <span>New Item</span>
        </a>
        <router-link to="/dashboard/all-notifications" class="mobile-menu-item" @click="toggleMoreMenu">
          <i class="fas fa-bell"></i>
          <span>Notifications</span>
          <span v-if="notifications.length > 0" class="badge mobile-badge">{{ notifications.length }}</span>
        </router-link>
        <router-link to="/dashboard/settings" class="mobile-menu-item" @click="toggleMoreMenu">
          <i class="fas fa-cog"></i>
          <span>Settings</span>
        </router-link>
        <router-link to="/dashboard/certificate" class="mobile-menu-item" @click="toggleMoreMenu">
          <i class="fas fa-certificate"></i>
          <span>Certificate</span>
        </router-link>
        <a class="mobile-menu-item close-item" @click="toggleMoreMenu">
          <i class="fas fa-times"></i>
          <span>Close</span>
        </a>
      </div>
    </div>

    <div v-if="isNewItemMobileMenuOpen" class="mobile-more-menu-overlay" @click="isNewItemMobileMenuOpen = false">
      <div class="mobile-more-menu" @click.stop>
        <div class="mobile-menu-header">Create New</div>
        <a class="mobile-menu-item" @click="createNew('course')">
          <i class="fas fa-book"></i>
          <span>New Course</span>
        </a>
        <a class="mobile-menu-item" @click="createNew('resource')">
          <i class="fas fa-file-alt"></i>
          <span>New Resource</span>
        </a>
        <a class="mobile-menu-item" @click="createNew('upload')">
          <i class="fas fa-upload"></i>
          <span>Upload File</span>
        </a>
        <a class="mobile-menu-item close-item" @click="isNewItemMobileMenuOpen = false">
          <i class="fas fa-times"></i>
          <span>Cancel</span>
        </a>
      </div>
    </div>

    <transition name="search-fade">
      <div v-if="isSearchOpen" class="search-overlay">
        <div class="search-modal" @click.stop>
          <button class="close-search-btn" @click="closeSearch">&times;</button>
          <div class="search-input-wrapper">
            <i class="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Start typing to search..." 
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              ref="searchInputRef"
            >
          </div>
          <div class="search-results">
            <div class="search-category">
              <h3>Recent Searches</h3>
              <a class="search-result-item">Leadership skills</a>
              <a class="search-result-item">Data Visualization</a>
            </div>
            <div class="search-category">
              <h3>Quick Links</h3>
              <router-link to="/dashboard/courses" class="search-result-item" @click="closeSearch">My Courses</router-link>
              <router-link to="/dashboard/settings" class="search-result-item" @click="closeSearch">Account Settings</router-link>
              <router-link to="/dashboard/progress" class="search-result-item" @click="closeSearch">My Progress</router-link>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import MessageModal from './MessageModal.vue';

export default {
  name: 'DashboardLayout',
  components: {
    MessageModal
  },
  setup() {
    const router = useRouter();
    
    // --- State Properties ---
    const userName = ref('Lart Sejdiu');
    const displayUserId = ref('USR-12345');
    const searchQuery = ref('');
    const modal = ref({ isVisible: false, title: '', message: '' });
    const isMoreMenuOpen = ref(false);
    
    // NEW: State for mobile "New Item" menu
    const isNewItemMobileMenuOpen = ref(false);

    // --- Mobile Menu Logic ---
    const toggleMoreMenu = () => {
      isMoreMenuOpen.value = !isMoreMenuOpen.value;
    };

    // NEW: Open the dedicated mobile menu for "New Item"
    const openNewItemMobileMenu = () => {
      isMoreMenuOpen.value = false; // Close the 'More' menu first
      isNewItemMobileMenuOpen.value = true;
    };
    
    // --- General Methods ---
    const handleLogout = () => {
      localStorage.removeItem('authToken');
      router.push('/login');
    };

    const showMessage = (title, message) => {
      modal.value = { isVisible: true, title, message };
    };

    // --- Search Overlay Logic ---
    const isSearchOpen = ref(false);
    const searchInputRef = ref(null);

    const openSearch = async () => {
      isSearchOpen.value = true;
      await nextTick();
      searchInputRef.value?.focus();
    };

    const closeSearch = () => {
      isSearchOpen.value = false;
    };
    
    const handleSearch = () => {
      if (searchQuery.value.trim()) {
        const query = searchQuery.value;
        closeSearch();
        router.push({ path: '/dashboard/search', query: { q: query } });
      }
    };

    // --- Desktop Dropdown Logic ---
    const isNewItemOpen = ref(false);
    const newItemRef = ref(null);
    const isNotificationsOpen = ref(false);
    const notificationsRef = ref(null);
    
    const notifications = ref([
      { id: 1, icon: 'fas fa-check-circle', color: '#3AE3C8', message: 'Course <b>"The Art of Leadership"</b> completed!', time: '15m ago' },
      { id: 2, icon: 'fas fa-user-plus', color: '#7C53FF', message: '<b>James Chen</b> followed you.', time: '1h ago' },
      { id: 3, icon: 'fas fa-calendar-alt', color: '#FF65A5', message: 'Live Q&A for <b>"Data Visualization"</b> starts in 1 hour.', time: '2h ago' }
    ]);

    const handleNewItem = () => {
      isNewItemOpen.value = !isNewItemOpen.value;
      isNotificationsOpen.value = false;
    };
    
    const handleNotifications = () => {
      isNotificationsOpen.value = !isNotificationsOpen.value;
      isNewItemOpen.value = false;
    };

    const createNew = (itemType) => {
      isNewItemOpen.value = false;
      isNewItemMobileMenuOpen.value = false;

      switch (itemType) {
        case 'course':
          router.push('/dashboard/create-course');
          break;
        case 'resource':
          router.push('/dashboard/create-resource');
          break;
        case 'upload':
          router.push('/dashboard/upload-file');
          break;
        default:
          showMessage('Error', 'Unknown action.');
      }
    };

    // --- Global Event Listeners ---
    const handleKeydown = (event) => {
      if (event.key === 'Escape' && isSearchOpen.value) {
        closeSearch();
      }
    };
    
    const handleClickOutside = (event) => {
      if (newItemRef.value && !newItemRef.value.contains(event.target)) {
        isNewItemOpen.value = false;
      }
      if (notificationsRef.value && !notificationsRef.value.contains(event.target)) {
        isNotificationsOpen.value = false;
      }
    };
    
    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeydown);
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown);
    });

    return {
      userName, displayUserId, searchQuery, modal,
      handleLogout, handleSearch, handleNewItem, handleNotifications, showMessage,
      isMoreMenuOpen, toggleMoreMenu, openNewItemMobileMenu,
      isNewItemOpen, newItemRef, createNew,
      isNotificationsOpen, notificationsRef, notifications,
      isSearchOpen, openSearch, closeSearch, searchInputRef,
      isNewItemMobileMenuOpen
    };
  }
};
</script>

<style scoped>
  /* ...(All existing styles are the same) */
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Roboto:wght@300;400;500;700&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

  .luxe-dashboard-layout { display: flex; min-height: 100vh; font-family: 'Roboto', sans-serif; color: #2D3748; background-color: #F8FAFC; }
  .luxe-sidebar { width: 280px; background: #1A202C; color: white; display: flex; flex-direction: column; padding: 30px 0; box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1); position: fixed; top: 0; left: 0; bottom: 0; z-index: 10; overflow-y: auto; transition: width 0.3s ease, padding 0.3s ease, background 0.3s ease, border-radius 0.3s ease, bottom 0.3s ease, transform 0.3s ease; }
  .luxe-main-content-wrapper { flex: 1; padding: 30px; background-color: #F0F2F5; margin-left: 280px; min-height: 100vh; transition: margin-left 0.3s ease, padding-bottom 0.3s ease; }
  .branding { padding: 0 25px 30px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); margin-bottom: 30px; }
  .logo { width: 50px; height: 50px; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; }
  .logo-icon { width: 100%; height: 100%; filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.5)); }
  .branding h1 { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1.8rem; color: #D4AF37; margin: 0; }
  .main-nav { flex: 1; padding: 0 15px; }
  .nav-item { display: flex; align-items: center; padding: 12px 20px; margin-bottom: 5px; border-radius: 8px; color: rgba(255, 255, 255, 0.7); text-decoration: none; transition: all 0.3s ease; }
  .nav-item i { width: 24px; text-align: center; margin-right: 12px; font-size: 1.1rem; transition: margin 0.3s ease; }
  .nav-item:hover { background: rgba(255, 255, 255, 0.05); color: white; }
  .nav-item.router-link-active, .nav-item.router-link-exact-active { background: linear-gradient(90deg, rgba(212, 175, 55, 0.2), transparent); color: #D4AF37; border-left: 3px solid #D4AF37; }
  .user-profile { padding: 20px 25px 0; border-top: 1px solid rgba(255, 255, 255, 0.1); margin-top: auto; display: flex; align-items: center; }
  .avatar { width: 40px; height: 40px; border-radius: 50%; overflow: hidden; margin-right: 12px; }
  .avatar img { width: 100%; height: 100%; object-fit: cover; }
  .user-info h3, .user-info p { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .user-info h3 { font-size: 0.9rem; margin: 0 0 4px; }
  .user-info p { font-size: 0.75rem; margin: 0; color: rgba(255, 255, 255, 0.6); }
  .logout-btn { margin-left: auto; background: none; border: none; color: rgba(255, 255, 255, 0.6); cursor: pointer; font-size: 1rem; transition: color 0.2s ease; }
  .logout-btn:hover { color: #D4AF37; }
  .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; background: linear-gradient(90deg, #6A11CB 0%, #2575FC 100%); padding: 20px 30px; border-radius: 12px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); color: white; }
  .search-bar { position: relative; flex-grow: 1; max-width: 450px; margin-right: 20px; cursor: pointer; }
  .search-bar i { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); color: rgba(255, 255, 255, 0.7); }
  .search-bar input { width: 100%; padding: 14px 20px 14px 50px; border: none; border-radius: 30px; font-size: 1rem; background-color: rgba(255, 255, 255, 0.2); color: white; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); pointer-events: none; }
  .search-bar input::placeholder { color: rgba(255, 255, 255, 0.6); }
  .top-bar-actions { display: flex; gap: 15px; }
  .action-wrapper { position: relative; }
  .action-btn, .notification-btn { background: rgba(255, 255, 255, 0.2); border: none; padding: 12px 20px; border-radius: 30px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: white; font-size: 0.95rem; font-weight: 500; transition: all 0.3s ease; position: relative; }
  .action-btn i, .notification-btn i { margin-right: 8px; }
  .action-btn:hover, .notification-btn:hover { background: rgba(255, 255, 255, 0.3); transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); }
  .badge { position: absolute; top: -5px; right: -5px; background: #FFD700; color: #1A202C; width: 20px; height: 20px; border-radius: 50%; font-size: 0.7rem; display: flex; align-items: center; justify-content: center; font-weight: bold; }
  .mobile-only-nav { display: none; }
  
  .action-dropdown-panel { position: absolute; top: calc(100% + 10px); right: 0; width: 280px; background: #fff; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); border: 1px solid #E2E8F0; z-index: 100; overflow: hidden; padding: 8px; }
  .dropdown-item { display: flex; align-items: center; padding: 10px 12px; border-radius: 8px; color: #4A5568; font-size: 0.9rem; cursor: pointer; transition: background-color 0.2s ease; }
  .dropdown-item:hover { background-color: #F8FAFC; color: #1A202C; }
  .dropdown-item i { width: 20px; margin-right: 12px; text-align: center; color: #A0AEC0; }

  .notifications-panel { width: 360px; padding: 0; }
  .dropdown-header, .dropdown-footer { padding: 12px 16px; background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0; }
  .dropdown-header h3 { margin: 0; font-size: 1rem; color: #2D3748; }
  .dropdown-content { max-height: 320px; overflow-y: auto; }
  .no-notifications { padding: 20px; text-align: center; color: #a0aec0; }
  .notification-item { display: flex; padding: 12px 16px; border-bottom: 1px solid #E2E8F0; transition: background-color 0.2s ease; cursor: pointer; }
  .notification-item:last-child { border-bottom: none; }
  .notification-item:hover { background-color: #F8FAFC; }
  .notification-icon { width: 36px; height: 36px; flex-shrink: 0; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; color: #fff; }
  .notification-text p { margin: 0 0 4px; font-size: 0.9rem; color: #4A5568; line-height: 1.4; }
  .notification-text span { font-size: 0.75rem; color: #A0AEC0; }
  .dropdown-footer { border-bottom: none; border-top: 1px solid #E2E8F0; text-align: center; }
  .dropdown-footer a { color: #6A11CB; text-decoration: none; font-weight: 500; }
  .dropdown-footer a:hover { text-decoration: underline; }
  .dropdown-fade-enter-active, .dropdown-fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
  .dropdown-fade-enter-from, .dropdown-fade-leave-to { opacity: 0; transform: translateY(-5px); }

  .search-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(248, 250, 252, 0.7); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); z-index: 999; display: flex; justify-content: center; padding-top: 10vh; }
  .search-modal { width: 100%; max-width: 640px; height: fit-content; }
  .close-search-btn { position: absolute; top: 20px; right: 20px; background: none; border: none; font-size: 2rem; color: #a0aec0; cursor: pointer; }
  .search-input-wrapper { position: relative; margin-bottom: 24px; }
  .search-input-wrapper i { position: absolute; left: 20px; top: 50%; transform: translateY(-50%); color: #a0aec0; font-size: 1.5rem; }
  .search-input-wrapper input { width: 100%; padding: 20px 20px 20px 60px; font-size: 1.5rem; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #fff; }
  .search-input-wrapper input:focus { outline: none; border-color: #6A11CB; box-shadow: 0 0 0 4px rgba(106, 17, 203, 0.1); }
  .search-results { color: #2D3748; }
  .search-category { margin-bottom: 24px; }
  .search-category h3 { font-size: 0.9rem; color: #a0aec0; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
  .search-result-item { display: block; padding: 12px; border-radius: 8px; margin-bottom: 4px; text-decoration: none; color: #4A5568; cursor: pointer; transition: background-color 0.2s ease; }
  .search-result-item:hover { background-color: #fff; color: #6A11CB; }
  .search-fade-enter-active, .search-fade-leave-active { transition: opacity 0.3s ease; }
  .search-fade-enter-from, .search-fade-leave-to { opacity: 0; }
  .search-fade-enter-active .search-modal, .search-fade-leave-active .search-modal { transition: transform 0.3s ease; }
  .search-fade-enter-from .search-modal, .search-fade-leave-to .search-modal { transform: scale(0.95); }

  @media (max-width: 1024px) { .luxe-sidebar { width: 240px; } .luxe-main-content-wrapper { margin-left: 240px; } .search-bar { max-width: 350px; } }
  @media (max-width: 768px) { .top-bar-actions { display: none; } .luxe-sidebar { width: 70px; padding: 20px 0; } .luxe-main-content-wrapper { margin-left: 70px; } .branding h1, .nav-item span, .user-info, .logout-btn { display: none; } .nav-item { justify-content: center; padding: 15px 0; } .nav-item i { margin-right: 0; } .user-profile { justify-content: center; padding: 15px 0 0; } .avatar { margin-right: 0; } .top-bar { flex-direction: column; gap: 15px; align-items: stretch; padding: 15px 20px; } .search-bar { max-width: none; margin-right: 0; } }
  @media (max-width: 576px) { .luxe-sidebar { position: fixed; bottom: 15px; left: 50%; transform: translateX(-50%); width: calc(100% - 30px); max-width: 400px; height: 65px; flex-direction: row; padding: 0 10px; z-index: 100; top: auto; background:rgba(255,255,255,0.8) !important; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-radius: 32.5px; border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); } .branding, .user-profile { display: none; } .main-nav { display: flex; flex: 1; padding: 0; justify-content: space-around; align-items: center; } .nav-item { flex: 1; flex-direction: column; padding: 8px 0; margin: 0; border-radius: 0; border-left: none; border-top: none; color: #326bce; background: transparent ; } .nav-item i { font-size: 1.3rem; margin: 0 0 3px; } .nav-item span { display: block; font-size: 0.7rem; font-weight: 500;} .nav-item.router-link-active, .nav-item.router-link-exact-active { border-left: none; border-top: none; color: #6A11CB; } .luxe-main-content-wrapper { margin-left: 0; padding: 20px 20px 95px 20px; } .mobile-only-nav { display: flex; cursor: pointer; } .desktop-only-nav { display: none; } }

  .mobile-more-menu-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: transparent; z-index: 200; display: flex; align-items: flex-end; transition: opacity 0.3s ease; }
  .mobile-more-menu { display: block; background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); width: 100%; padding: 20px 20px 30px; border-top-left-radius: 20px; border-top-right-radius: 20px; box-shadow: 0 -5px 25px rgba(0,0,0,0.1); transform: translateY(100%); animation: slide-up 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards; border: 1px solid rgba(255, 255, 255, 0.2); }
  @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
  .mobile-menu-item { display: flex; align-items: center; padding: 12px 20px; margin-bottom: 10px; border-radius: 8px; color: #4A5568; text-decoration: none; transition: background 0.3s ease, color 0.3s ease; cursor: pointer; }
  .mobile-menu-item i { font-size: 1.2rem; color: #4A5568; width: 24px; margin-right: 20px; text-align: center; }
  /* NEW: Style for the mobile badge */
  .mobile-badge { position: static; background: #6A11CB; color: white; margin-left: auto; }
  /* NEW: Header for the mobile "Create" menu */
  .mobile-menu-header {
    font-size: 1rem;
    font-weight: 600;
    color: #a0aec0;
    text-transform: uppercase;
    padding: 0 20px 10px;
    margin-bottom: 10px;
  }
  .mobile-menu-item.close-item { margin-top: 10px; background: #F1F5F9; color: #4A5568; justify-content: center; cursor: pointer; }
  .mobile-menu-item.close-item i { margin-right: 8px; }
</style>