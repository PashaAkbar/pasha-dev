import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    base: env.GITHUB_PAGES === 'true' ? '/pasha-dev/' : '/',
    plugins: [react()],
  }
})
