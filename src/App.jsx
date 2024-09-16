import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './home/SignIn';  // 登录组件
import SignUp from './home/SignUp';  // 注册组件
import Dashboard from './dashboard/Dashboard.jsx';
import { useEffect } from 'react';
import useStore from './store';

function App() {
  // const { currentStudent } = useStore();
  // useEffect(() => {
  //   // 这里可以添加你的拦截逻辑
  //   if (!currentStudent) {
  //     // 如果未认证，重定向到登录页
  //     // location.href="/signin"
  //   }
  // }, [currentStudent]);

  return (
    <Router>
      <Routes>
        {/* 路由配置 */}
        <Route path="/" element={<Navigate to="/signin" />} />          {/* 默认显示 Home 页面 */}
        <Route path="/signin" element={<SignIn />} />  {/* 登录页面 */}
        <Route path="/signup" element={<SignUp />} />  {/* 注册页面 */}
        <Route path="/dashboard" element={<Dashboard />} />  {/* 仪表盘页面 */}
      </Routes>
    </Router>
  );
}

export default App;
