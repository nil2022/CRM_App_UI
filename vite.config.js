import { defineConfig, loadConfigFromFile, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, '', '')
  
  return {
    server: {
      proxy: {
        '/crm/api': 
        {
          target: `${env.CRM_BACKEND_URL}`,
          changeOrigin: true
        }
      },
    },
    plugins: [react()],
  }
})
