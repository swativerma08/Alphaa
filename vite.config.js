import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three/') || id.endsWith('/three') || id.includes('\\three\\')) {
              return 'three-core';
            }
            if (id.includes('@react-three')) {
              return 'react-three';
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('lucide-react')) {
              return 'lucide';
            }
            if (id.includes('react') || id.includes('scheduler')) {
              return 'react-core';
            }
          }
        },
      },
    },
  },
})
