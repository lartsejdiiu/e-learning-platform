<template>
  <div class="notifications-page">
    <div class="page-header">
      <div class="header-text">
        <h1>Notifications</h1>
        <p class="subtitle">Review and manage all your account notifications here.</p>
      </div>
      <div class="header-actions">
        <button class="action-btn-secondary"><i class="fas fa-check-double"></i> Mark all as read</button>
        <button class="action-btn-primary"><i class="fas fa-cog"></i></button>
      </div>
    </div>

    <div class="filter-tabs">
      <button :class="{ active: activeTab === 'all' }" @click="activeTab = 'all'">All</button>
      <button :class="{ active: activeTab === 'unread' }" @click="activeTab = 'unread'">
        Unread <span class="count">{{ unreadCount }}</span>
      </button>
      <button :class="{ active: activeTab === 'courses' }" @click="activeTab = 'courses'">Courses</button>
      <button :class="{ active: activeTab === 'system' }" @click="activeTab = 'system'">System</button>
    </div>

    <div class="notifications-list">
      <transition-group name="list-fade">
        <div
          v-for="notif in filteredNotifications"
          :key="notif.id"
          class="notification-card"
          :class="{ unread: notif.unread }"
        >
          <div class="notification-icon" :style="{ backgroundColor: notif.color }">
            <i :class="notif.icon"></i>
          </div>
          <div class="notification-content">
            <p v-html="notif.message"></p>
            <span class="notification-time">{{ notif.time }}</span>
          </div>
          <div class="notification-actions">
            <span v-if="notif.unread" class="unread-dot" title="Unread"></span>
            <button class="more-btn"><i class="fas fa-ellipsis-h"></i></button>
          </div>
        </div>
      </transition-group>
       <div v-if="filteredNotifications.length === 0" class="empty-state">
          <i class="fas fa-bell-slash"></i>
          <h2>No Notifications</h2>
          <p>There are no notifications in this category.</p>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: "AllNotifications",
  setup() {
    const activeTab = ref('all');

    const notifications = ref([
      { id: 1, icon: 'fas fa-check-circle', color: 'rgba(58, 227, 200, 0.2)', message: 'Course <b>"The Art of Leadership"</b> completed!', time: '15m ago', unread: true, category: 'courses' },
      { id: 2, icon: 'fas fa-user-plus', color: 'rgba(124, 83, 255, 0.2)', message: '<b>James Chen</b> followed you.', time: '1h ago', unread: true, category: 'system' },
      { id: 3, icon: 'fas fa-calendar-alt', color: 'rgba(255, 101, 165, 0.2)', message: 'Live Q&A for <b>"Data Visualization"</b> starts in 1 hour.', time: '2h ago', unread: false, category: 'courses' },
      { id: 4, icon: 'fas fa-shield-alt', color: 'rgba(255, 200, 61, 0.2)', message: 'Your password was successfully changed.', time: '1d ago', unread: false, category: 'system' },
      { id: 5, icon: 'fas fa-trophy', color: 'rgba(255, 200, 61, 0.2)', message: 'New achievement unlocked: <b>Course Connoisseur</b>', time: '2d ago', unread: true, category: 'courses' },
      { id: 6, icon: 'fas fa-credit-card', color: 'rgba(124, 83, 255, 0.2)', message: 'Your subscription has been renewed.', time: '4d ago', unread: false, category: 'system' },
    ]);

    const unreadCount = computed(() => notifications.value.filter(n => n.unread).length);

    const filteredNotifications = computed(() => {
      switch (activeTab.value) {
        case 'unread':
          return notifications.value.filter(n => n.unread);
        case 'courses':
          return notifications.value.filter(n => n.category === 'courses');
        case 'system':
          return notifications.value.filter(n => n.category === 'system');
        default:
          return notifications.value;
      }
    });

    return {
      activeTab,
      notifications,
      filteredNotifications,
      unreadCount,
    };
  }
}
</script>

<style scoped>
:root {
  --accent-color: #3AE3C8;
  --text-primary: #1A202C;
  --text-secondary: #4A5568;
  --border-color: rgba(255, 255, 255, 0.2);
  --page-bg: #F0F2F5;
}

.notifications-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 16px;
  font-family: 'Inter', sans-serif;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.header-text h1 {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.header-text .subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.action-btn-primary, .action-btn-secondary {
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn-primary {
  background-color: var(--accent-color);
  color: var(--text-primary);
}
.action-btn-primary:hover {
  filter: brightness(1.1);
}

.action-btn-secondary {
  background-color: #fff;
  color: var(--text-secondary);
  border: 1px solid #E2E8F0;
}
.action-btn-secondary:hover {
  background-color: #F8FAFC;
}


.filter-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E2E8F0;
  padding-bottom: 8px;
}

.filter-tabs button {
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
}

.filter-tabs button:hover {
  background-color: #F8FAFC;
  color: var(--text-primary);
}

.filter-tabs button.active {
  background-color: var(--accent-color);
  color: var(--text-primary);
  font-weight: 600;
}

.filter-tabs .count {
  margin-left: 6px;
  background-color: rgba(0,0,0,0.1);
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
}

.notifications-list {
  display: grid;
  gap: 16px;
}

.notification-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.notification-card.unread {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6));
}

.notification-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
}

.notification-content {
  flex-grow: 1;
}

.notification-content p {
  margin: 0 0 4px;
  color: var(--text-primary);
}

.notification-time {
  font-size: 13px;
  color: var(--text-secondary);
}

.notification-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.unread-dot {
  width: 10px;
  height: 10px;
  background-color: var(--accent-color);
  border-radius: 50%;
}

.more-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
}
.more-btn:hover {
  background-color: rgba(0,0,0,0.05);
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  color: var(--text-secondary);
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

/* Transitions */
.list-fade-enter-active,
.list-fade-leave-active {
  transition: all 0.5s ease;
}
.list-fade-enter-from,
.list-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>