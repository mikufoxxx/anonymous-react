import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined // 避免生成过多的静态文件
      }
    }
  },
  server: {
    historyApiFallback: true,
    host: true,  // 确保Vite能够监听所有接口
  },
  // 修复404页面问题
  preview: {
    port: 10000,  // 设置为 Render 要求的端口 10000
    host: '0.0.0.0',  // 确保监听所有接口
    strictPort: true, // 确保严格使用端口 10000
  },
})
