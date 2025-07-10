import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import DashboardLayout from '../components/DashboardLayout.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    // Lazy load the Signup component
    component: () => import('../components/Signup.vue'),
  },
  {
    path: '/dashboard',
    name: 'DashboardLayout',
    component: DashboardLayout,
    meta: { requiresAuth: true }, // This entire section requires a user to be logged in.
    children: [
      {
        path: '',
        name: 'DashboardHome',
        component: () => import('../components/DashboardHome.vue'),
      },
      {
        path: 'courses',
        name: 'MyCourses',
        component: () => import('../components/MyCourses.vue'),
      },
      {
        path: 'all-courses',
        name: 'AllCourses',
        // Assuming this should also point to MyCourses or a different component
        component: () => import('../components/MyCourses.vue'),
      },
      {
        path: 'create-course',
        name: 'CreateCourse',
        component: () => import('../components/CreateCourse.vue'),
      },
      {
        path: 'progress',
        name: 'Progress',
        component: () => import('../components/Progress.vue'),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../components/Settings.vue'),
      },
      {
        path: 'course-player/:id?',
        name: 'CoursePlayer',
        component: () => import('../components/CoursePlayer.vue'),
      },
      {
        path: 'certificate',
        name: 'Certificate',
        component: () => import('../components/Certificate.vue'),
      },
      {
        path: 'courselist', // Corrected typo from 'curselist'
        name: 'CourseList',
        component: () => import('../components/CourseList.vue'),
      },
      {
        path: 'course-preview/:id',
        name: 'CoursePreview',
        component: () => import('../components/CoursePreview.vue'),
        props: true,
      },
      {
        path: 'all-notifications', // Corrected typo
        name: 'AllNotifications',
        component: () => import('../components/AllNotifications.vue'),
      },
    ],
  },
  // Catch-all route for 404s. It's better to have a dedicated 404 component.
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    // Redirecting to DashboardHome might be confusing.
    // Consider creating a specific NotFound.vue component.
    component: () => import('../components/DashboardHome.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,

  // This function ensures you scroll to the top on every new route.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; // Restores scroll position on back/forward navigation.
    } else {
      return { top: 0, behavior: 'smooth' }; // Scrolls to top for all other navigation.
    }
  },
});

// --- REFACTORED NAVIGATION GUARD ---
// This guard handles authentication and loading state more cleanly.
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Show loading screen for any route transition
  document.body.classList.add('loading');

  if (requiresAuth && !isAuthenticated) {
    // User needs to be logged in but isn't. Redirect to login.
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else if ((to.path === '/login' || to.path === '/signup') && isAuthenticated) {
    // User is logged in but trying to access login/signup. Redirect to dashboard.
    next('/dashboard');
  } else {
    // User is allowed to proceed.
    next();
  }
});

// After each navigation, hide the loading screen.
router.afterEach(() => {
  // A small delay can make the transition feel smoother.
  setTimeout(() => document.body.classList.remove('loading'), 300);
});

export default router;