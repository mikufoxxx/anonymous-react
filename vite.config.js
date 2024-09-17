import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // 避免生成过多的静态文件
      }
    }
  },
  // 重要的配置：history fallback
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    historyApiFallback: true,  // 确保所有路由重定向到 index.html
    host: true,  // 确保Vite能够监听所有接口
  },
})
