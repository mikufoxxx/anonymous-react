// Welcome.js
import React from 'react';
import { Box, Typography, Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';

const Welcome = ({ userName}) => {
  return (
    <Box
      sx={{
        backgroundColor: '#2E3B55',
        color: 'white',
        padding: '16px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between', // 左右分布
        alignItems: 'center', // 垂直居中
      }}
    >
      {/* Welcome 文字部分 */}
      <Typography variant="h5">
        Welcome, {userName}!
      </Typography>
    </Box>
  );
};

export default Welcome;
