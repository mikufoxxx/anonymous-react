// Welcome.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Welcome = ({ title }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#2E3B55',
        color: 'white',
        padding: '16px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center', // 垂直居中
      }}
    >
      {/* Welcome 文字部分 */}
      <Typography variant="h5">
        This is {title}!
      </Typography>
    </Box>
  );
};

export default Welcome;
