import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    host: true, // Allow access from network
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        // The rewrite is only needed if the backend doesn't expect /api
        // but since the proxy target has /api (potentially), we might need to adjust.
        // If the backend is at http://localhost:5001/api, then no rewrite needed.
        // If the backend is at http://localhost:5001/ and we want /api to map to /, then:
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Using esbuild (default) instead of terser to avoid missing dependency error
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'react-redux', '@reduxjs/toolkit'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})