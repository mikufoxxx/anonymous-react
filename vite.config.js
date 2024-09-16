import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // 允许外部访问
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // 避免生成过多的静态文件
      }
    }
  },
  preview: {
    port: 10000,  // 设置 Render 所需的端口
    host: '0.0.0.0',
    strictPort: true,
  },
  // 重要的配置：history fallback
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    historyApiFallback: true,  // 确保所有路由重定向到 index.html
  },
})
