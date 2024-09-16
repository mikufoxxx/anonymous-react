import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; // 引入按钮组件
import axios from 'axios'; // 引入 axios

const drawerWidth = 240;

const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#2E3B55', // 设置 AppBar 的背景颜色
  ...(!open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// eslint-disable-next-line react/prop-types
export default function AppBar({ open, currentTitle }) {
  // 处理登出逻辑
  const handleSignOut = async () => {
    try {
      // 调用登出 API
      await axios.get('/logout');
      // 登出成功后，可以跳转到登录页面或主页
      window.location.href = '/signin'; // 根据需求跳转
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <AppBarStyled position="fixed" open={open}>
      <Toolbar style={{ justifyContent: 'space-between' }}> {/* 添加 justifyContent 来使按钮在右侧 */}
        <Typography variant="h6" noWrap component="div">
          {currentTitle}
        </Typography>
        <Button color="inherit" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Toolbar>
    </AppBarStyled>
  );
}