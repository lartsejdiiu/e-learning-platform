<template>
  <div class="ai-supporter-section">
    <!-- Main Container -->
    <div class="ai-container">
      <!-- Header -->
      <div class="ai-header">
        <div class="ai-title">
          <svg class="ai-icon" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-3.5-6a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm7 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
          </svg>
          <h2>AI Learning Assistant</h2>
        </div>
        <p class="ai-subtitle">Get instant help with your course material</p>
      </div>

      <!-- Chat Interface -->
      <div class="ai-chat-interface">
        <!-- Messages Container -->
        <div class="ai-messages" ref="messagesContainer">
          <div v-for="(msg, index) in messages" :key="index" 
               class="message" :class="msg.role">
            <div class="message-content">
              <div class="message-role">{{ msg.role === 'user' ? 'You' : 'AI Tutor' }}</div>
              <div class="message-text">{{ msg.content }}</div>
              <div class="message-time">{{ formatTime(msg.timestamp) }}</div>
            </div>
          </div>
          
          <div v-if="isLoading" class="message assistant">
            <div class="message-content">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="ai-input-area">
          <input
            v-model="userInput"
            @keydown.enter="sendMessage"
            placeholder="Ask about this lesson..."
            :disabled="isLoading"
          />
          <button 
            @click="sendMessage"
            :disabled="!userInput.trim() || isLoading"
            class="send-button"
          >
            <svg viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue';

const messages = ref([]);
const userInput = ref('');
const isLoading = ref(false);
const messagesContainer = ref(null);

// Initial welcome message
onMounted(() => {
  messages.value.push({
    role: 'assistant',
    content: 'Hello! I\'m your AI learning assistant. Ask me anything about this lesson, and I\'ll help explain concepts, clarify doubts, or provide additional examples.',
    timestamp: new Date()
  });
  scrollToBottom();
});

// Auto-scroll to bottom when messages change
watch(messages, () => {
  nextTick(() => {
    scrollToBottom();
  });
}, { deep: true });

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const formatTime = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return;

  const userMessage = {
    role: 'user',
    content: userInput.value,
    timestamp: new Date()
  };
  
  messages.value.push(userMessage);
  userInput.value = '';
  isLoading.value = true;

  try {
    // Simulate API call delay (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const aiResponse = {
      role: 'assistant',
      content: generateAIResponse(userMessage.content),
      timestamp: new Date()
    };
    
    messages.value.push(aiResponse);
  } catch (error) {
    console.error('Error:', error);
    messages.value.push({
      role: 'assistant',
      content: 'Sorry, I encountered an error. Please try again later.',
      timestamp: new Date()
    });
  } finally {
    isLoading.value = false;
  }
};

// Mock AI response generator (replace with real API calls)
const generateAIResponse = (message) => {
  const responses = [
    "That's an excellent question about the lesson. The key concept here is...",
    "I'd be happy to explain that. The main idea is...",
    "Based on the course material, the answer relates to...",
    "Let me break that down for you with an example...",
    "This concept is important because... Here's why...",
    "The lesson covers this in section 3. To summarize..."
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};
</script>

<style scoped>
/* Base Styles */
.ai-supporter-section {
  width: 100%;
  max-width: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin: 20px 0;
}

.ai-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Header Styles */
.ai-header {
  padding: 20px;
  background: linear-gradient(135deg, #7c3aed, #c026d3);
  color: white;
}

.ai-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.ai-title h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.ai-icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

.ai-subtitle {
  font-size: 0.875rem;
  opacity: 0.9;
  margin: 0;
}

/* Chat Interface */
.ai-chat-interface {
  display: flex;
  flex-direction: column;
  height: 400px;
}

.ai-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
  max-width: 85%;
}

.message.user {
  align-self: flex-end;
}

.message.assistant {
  align-self: flex-start;
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.message-role {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
}

.user .message-role {
  text-align: right;
}

.assistant .message-role {
  text-align: left;
}

.message-text {
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 0.9375rem;
  line-height: 1.5;
}

.user .message-text {
  background-color: #6366f1;
  color: white;
  border-bottom-right-radius: 4px;
}

.assistant .message-text {
  background-color: #f3f4f6;
  color: #111827;
  border-bottom-left-radius: 4px;
}

.message-time {
  font-size: 0.6875rem;
  color: #9ca3af;
  padding: 0 4px;
}

.user .message-time {
  text-align: right;
}

.assistant .message-time {
  text-align: left;
}

.typing-indicator {
  display: flex;
  gap: 6px;
  padding: 8px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background-color: #9ca3af;
  border-radius: 50%;
  display: inline-block;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

/* Input Area */
.ai-input-area {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.ai-input-area input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9375rem;
  transition: all 0.2s;
}

.ai-input-area input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.send-button {
  width: 48px;
  height: 48px;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.send-button:hover {
  background-color: #4f46e5;
}

.send-button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}

.send-button svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

/* Animations */
@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-4px);
  }
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .ai-supporter-section {
    background-color: #1f2937;
  }

  .message.assistant .message-text {
    background-color: #374151;
    color: #f3f4f6;
  }

  .message-role {
    color: #9ca3af;
  }

  .ai-input-area {
    background-color: #111827;
    border-top-color: #374151;
  }

  .ai-input-area input {
    background-color: #1f2937;
    border-color: #374151;
    color: white;
  }

  .ai-input-area input:focus {
    border-color: #818cf8;
    box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.3);
  }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .ai-supporter-section {
    border-radius: 0;
    margin: 0;
  }
  
  .ai-chat-interface {
    height: 60vh;
  }
  
  .message {
    max-width: 90%;
  }
}
</style>    