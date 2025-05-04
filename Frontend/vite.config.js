import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL || 'https://notehive-jjbz.onrender.com', // Fallback to the URL if the env variable isn't loaded
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
