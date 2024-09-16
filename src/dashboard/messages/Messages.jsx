import React from 'react';
import { Box } from '@mui/material';
import Welcome from './Welcome';
import MessageList from './MessageList';

const Messages = () => {
  const title = 'Messages';


  return (
    <Box sx={{ padding: 2 }}>
      {/* Welcome Section */}
      <Welcome title={title} />
      {/* 一点空隙 */}
      <Box sx={{ height: 15 }} />

      {/* 事件列表部分 */}
      <MessageList />  {/* 调用上面的 EventList 组件 */}
    </Box>
  );
};

export default Messages;
