import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  envDir: './src',
  plugins: [
    tailwindcss(),
  ],
})
