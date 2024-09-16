import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ContentContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: 'auto',
  maxWidth: '800px',  // 限制最大宽度
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: '#ffffff',  // 保持卡片的白色背景
}));

const Content = ({ content }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',  // 水平居中
        alignItems: 'center',      // 垂直居中
        width: '100%',             // 占满父容器宽度
        minHeight: '100vh',        // 占满整个视口高度
        backgroundColor: '#f0f2f5',  // 灰色背景覆盖整个内容区域
        padding: 3,
        boxSizing: 'border-box',    // 确保 padding 不影响布局
      }}
    >
      <ContentContainer elevation={3}>
        <Typography variant="h4" gutterBottom>
          {content}
        </Typography>
        <Typography>
          This is the content area for {content}. Use the sidebar to navigate between different options.
        </Typography>
      </ContentContainer>
    </Box>
  );
};

export default Content;
