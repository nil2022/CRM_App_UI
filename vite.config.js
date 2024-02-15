import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, '', '')
  
  return {
    server: {
      proxy: {
        '/crm/api': 
        {
          target: `${env.VITE_CRM_BACKEND_URL}`,
          changeOrigin: true,
        }
      },
      cors: true
    },
    define: {
      VITE_CRM_BACKEND_URL: JSON.stringify(env.VITE_CRM_BACKEND_URL),
    },
    plugins: [react()],
  }
})
