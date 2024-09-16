import React from 'react';
import { Box } from '@mui/material';
import Welcome from './Welcome';
import EventList from './EventList'; // 导入上面实现的 EventList 组件

const OngoingEvents = () => {
  const title = 'Ongoing Events';

  return (
    <Box sx={{ padding: 2 }}>
      {/* Welcome Section */}
      <Welcome title={title} />

      {/* 一点空隙 */}
      <Box sx={{ height: 15 }} />

      {/* 事件列表部分 */}
      <EventList type={0} />  {/* 调用上面的 EventList 组件 */}
    </Box>
  );
};

export default OngoingEvents;
