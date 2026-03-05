import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2018',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['framer-motion', 'recharts', 'react-hook-form', '@hookform/resolvers', 'zod']
        }
      }
    }
  }
});

