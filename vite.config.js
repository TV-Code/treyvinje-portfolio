import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/treyvinje-portfolio/',
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  assetsInclude: ['**/*.PNG']
})
