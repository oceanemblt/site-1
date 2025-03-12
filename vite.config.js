import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'  // Ajoute cette ligne

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Ajoute cette ligne pour définir l'alias
    }
  }
})
