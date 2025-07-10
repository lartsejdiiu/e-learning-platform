<script setup>
import { generateCertificate } from '../utils/certificateGenerator.js';
import { ref, onMounted } from 'vue';

const studentName = ref('Lart Sejdiu');
const courseTitle = ref('Vue 3 Mastery: Building Modern Web Applications');
const completionDate = ref('');

const getFormattedDate = () => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString(undefined, options);
};

onMounted(() => {
  completionDate.value = getFormattedDate();
});

function downloadCertificate() {
  generateCertificate({
    name: studentName.value,
    courseTitle: courseTitle.value,
    date: completionDate.value
  });
}
</script>

<template>
  <div class="main-container">
    <header class="header-section">
      <div class="academy-badge">
        <div class="badge-inner">
          <span>ELA</span>
        </div>
      </div>
      <h1 class="academy-title">
        Elite Learning Academy
      </h1>
      <p class="certification-slogan">
        Certification of Professional Achievement
      </p>
    </header>

    <div class="certificate-container">
      <div class="certificate-border">
        <div class="border-pattern"></div>
        <div class="certificate-card">
          <div class="decorative-elements">
            <div class="decor-circle-blue-dark"></div>
            <div class="decor-circle-blue-light"></div>
            <div class="decor-circle-gradient"></div>
          </div>

          <div class="seal seal-left">
            <svg viewBox="0 0 100 100" class="seal-icon">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#f59e0b" stroke-width="2"/>
              <path d="M50 15 L60 45 L90 50 L60 55 L50 85 L40 55 L10 50 L40 45 Z" fill="#f59e0b" fill-opacity="0.2"/>
            </svg>
          </div>
          <div class="seal seal-right">
            <svg viewBox="0 0 100 100" class="seal-icon">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#f59e0b" stroke-width="2"/>
              <path d="M50 15 L60 45 L90 50 L60 55 L50 85 L40 55 L10 50 L40 45 Z" fill="#f59e0b" fill-opacity="0.2"/>
            </svg>
          </div>

          <div class="card-content">
            <div class="certificate-header">
              <p class="official-cert-text">
                Official Certification
              </p>
              <h2 class="certificate-title">
                Certificate of Completion
              </h2>
              <div class="header-underline"></div>
            </div>

            <div class="main-content-area">
              <div class="awarded-to">
                <p class="presented-text">This is to certify that</p>
                <h3 class="student-name">{{ studentName }}</h3>
                <p class="has-completed">has successfully completed the course</p>
                <h4 class="course-title">{{ courseTitle }}</h4>
              </div>
              
              <div class="signature-section">
                <div class="signature-line"></div>
                <p class="date-text">Date: {{ completionDate }}</p>
                
                <div class="signature-block">
                  <div class="signature-image"></div>
                  <p class="signature-text">Director of Education</p>
                  <p class="signature-name">Dr. Sarah Johnson</p>
                </div>
              </div>
            </div>

            <div class="certificate-id-section">
              <p class="certificate-id-text">
                CERTIFICATE ID: ELA-{{ Math.random().toString(36).substr(2, 8).toUpperCase() }}
              </p>
              <p class="verification-text">
                Verify at: academy.ela/verify
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="download-button-wrapper">
        <button @click="downloadCertificate" class="download-button">
          <span class="button-content">
            <svg class="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Download Official Certificate
          </span>
          <span class="button-hover-effect"></span>
        </button>
      </div>
    </div>

    <footer class="app-footer">
      <p class="footer-text">
        &copy; {{ new Date().getFullYear() }} Elite Learning Academy. All certifications are verifiable through our blockchain registry.
      </p>
    </footer>
  </div>
</template>

<style scoped>
/* Base/Layout */
.main-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  font-family: 'Inter', sans-serif;
}

.dark .main-container {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

/* Header */
.header-section {
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
}

.academy-badge {
  width: 8rem;
  height: 8rem;
  margin: 0 auto 1.5rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-inner {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  border: 5px solid #fcd34d;
  box-shadow: 0 10px 25px rgba(30, 58, 138, 0.3);
  transform: rotate(15deg);
}

.badge-inner span {
  transform: rotate(-15deg);
}

.academy-title {
  font-size: 2.5rem;
  font-weight: 700;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(to right, #1e3a8a, #2563eb);
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.025em;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.certification-slogan {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #4b5563;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.dark .certification-slogan {
  color: #9ca3af;
}

/* Certificate Container */
.certificate-container {
  position: relative;
  width: 100%;
  max-width: 56rem;
  margin: 0 auto;
  perspective: 1000px;
}

.certificate-border {
  background: linear-gradient(135deg, #fcd34d, #f59e0b);
  padding: 0.5rem;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}

.certificate-border:hover {
  transform: rotateY(5deg) rotateX(2deg);
}

.border-pattern {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20L0 20z' fill='%23f59e0b' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
  border-radius: 0.75rem;
  pointer-events: none;
}

/* Certificate Card */
.certificate-card {
  position: relative;
  background-color: white;
  border-radius: 0.75rem;
  overflow: hidden;
  width: 100%;
  transform: translateZ(0);
  transition: all 0.3s ease;
}

.dark .certificate-card {
  background-color: #111827;
}

/* Decorative Elements */
.decorative-elements {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.decor-circle-blue-dark {
  position: absolute;
  top: -8rem;
  left: -8rem;
  width: 20rem;
  height: 20rem;
  background-color: rgba(30, 58, 138, 0.05);
  border-radius: 9999px;
  filter: blur(48px);
}

.decor-circle-blue-light {
  position: absolute;
  bottom: -8rem;
  right: -8rem;
  width: 20rem;
  height: 20rem;
  background-color: rgba(37, 99, 235, 0.05);
  border-radius: 9999px;
  filter: blur(48px);
}

.decor-circle-gradient {
  position: absolute;
  top: 50%;
  right: 25%;
  width: 10rem;
  height: 10rem;
  background-image: linear-gradient(to top right, rgba(30, 58, 138, 0.1), rgba(37, 99, 235, 0.1));
  border-radius: 9999px;
  filter: blur(16px);
}

/* Gold Seals */
.seal {
  position: absolute;
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.seal-icon {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.seal-left {
  top: 1.5rem;
  left: 1.5rem;
}

.seal-right {
  top: 1.5rem;
  right: 1.5rem;
}

/* Main Content Container */
.card-content {
  position: relative;
  padding: 3rem 2rem;
  text-align: center;
}

@media (min-width: 768px) {
  .card-content {
    padding: 4rem 3rem;
  }
}

/* Certificate Header */
.certificate-header {
  margin-bottom: 3rem;
}

.official-cert-text {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: #d97706;
  margin-bottom: 1rem;
  font-weight: 500;
}

.dark .official-cert-text {
  color: #fcd34d;
}

.certificate-title {
  font-size: 2.5rem;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
}

.dark .certificate-title {
  color: #f3f4f6;
}

.header-underline {
  width: 10rem;
  height: 0.25rem;
  background: linear-gradient(to right, #fcd34d, #f59e0b, #fcd34d);
  margin: 0 auto;
  border-radius: 9999px;
}

/* Main Content Area */
.main-content-area {
  max-width: 48rem;
  margin: 0 auto;
}

.awarded-to {
  margin-bottom: 3rem;
}

.presented-text {
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 1rem;
}

.dark .presented-text {
  color: #9ca3af;
}

.student-name {
  font-size: 2rem;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  color: #1e3a8a;
  margin: 1rem 0;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(to right, #1e3a8a, #2563eb);
  color: transparent;
}

.dark .student-name {
  background-image: linear-gradient(to right, #93c5fd, #3b82f6);
}

.has-completed {
  font-size: 1.125rem;
  color: #4b5563;
  margin: 1rem 0;
}

.dark .has-completed {
  color: #9ca3af;
}

.course-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 1rem 0;
  font-style: italic;
  line-height: 1.4;
}

.dark .course-title {
  color: #e5e7eb;
}

.signature-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
}

.signature-line {
  width: 15rem;
  height: 1px;
  background-color: #d1d5db;
  margin-bottom: 0.5rem;
}

.dark .signature-line {
  background-color: #4b5563;
}

.date-text {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

.signature-block {
  margin-top: 1.5rem;
}

.signature-image {
  width: 8rem;
  height: 3rem;
  background-image: url("data:image/svg+xml,%3Csvg width='120' height='60' viewBox='0 0 120 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10,30 Q30,10 50,30 T90,30' stroke='%231e3a8a' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 auto;
}

.dark .signature-image {
  background-image: url("data:image/svg+xml,%3Csvg width='120' height='60' viewBox='0 0 120 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10,30 Q30,10 50,30 T90,30' stroke='%233b82f6' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
}

.signature-text {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.5rem;
}

.signature-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-top: 0.25rem;
}

.dark .signature-name {
  color: #e5e7eb;
}

/* Certificate ID */
.certificate-id-section {
  margin-top: 3rem;
  border-top: 1px dashed #d1d5db;
  padding-top: 1.5rem;
}

.dark .certificate-id-section {
  border-top-color: #4b5563;
}

.certificate-id-text {
  font-size: 0.75rem;
  color: #6b7280;
  letter-spacing: 0.05em;
  font-family: monospace;
}

.verification-text {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.5rem;
}

/* Download Button */
.download-button-wrapper {
  margin-top: 3rem;
  text-align: center;
}

.download-button {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  background: linear-gradient(to right, #1e3a8a, #2563eb);
  color: white;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border-radius: 9999px;
  font-size: 1.125rem;
  box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
  transform: scale(1);
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.download-button:hover {
  background: linear-gradient(to right, #1d4ed8, #3b82f6);
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(30, 58, 138, 0.4);
}

.download-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}

.button-content {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.75rem;
}

.button-hover-effect {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #fcd34d, #f59e0b);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.download-button:hover .button-hover-effect {
  opacity: 0.2;
}

/* Footer */
.app-footer {
  margin-top: 3rem;
  text-align: center;
}

.footer-text {
  font-size: 0.875rem;
  color: #6b7280;
  letter-spacing: 0.05em;
}

/* Animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.certificate-container {
  animation: float 6s ease-in-out infinite;
}
</style>