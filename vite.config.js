import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/clientes': 'http://localhost:3001',
      '/conta': 'http://localhost:3001',
      '/investimentos': 'http://localhost:3001',
      '/ativos': 'http://localhost:3001',
    }
  }
})