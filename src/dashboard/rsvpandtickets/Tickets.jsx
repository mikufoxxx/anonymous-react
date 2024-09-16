import React from 'react';
import { Box } from '@mui/material';
import Welcome from './Welcome';
import TicketsList from './TicketsList';

const Tickets = () => {
  const title = 'My Tickets';


  return (
    <Box sx={{ padding: 2 }}>
      {/* Welcome Section */}
      <Welcome title={title} />
      {/* 一点空隙 */}
      <Box sx={{ height: 15 }} />

      {/* 事件列表部分 */}
      <TicketsList />  {/* 调用上面的 TicketsList 组件 */}
    </Box>
  );
};

export default Tickets;
