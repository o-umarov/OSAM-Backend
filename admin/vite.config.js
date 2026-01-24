import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),        // 🔥 ENG MUHIM
    tailwindcss(),  // Tailwind v4
  ],
  server: {port: 3007}
})
