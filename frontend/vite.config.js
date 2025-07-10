import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // <-- Add this import

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // <-- Maps '@' to './src'
    },
  }, server: {
    host: '0.0.0.0',
    port: 5173,
  },
});

