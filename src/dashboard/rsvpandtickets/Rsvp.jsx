import React from 'react';
import { Box } from '@mui/material';
import Welcome from './Welcome';
import RSVPList from './RSVPList';

const Rsvp = () => {
  const title = 'My RSVP';


  return (
    <Box sx={{ padding: 2 }}>
      {/* Welcome Section */}
      <Welcome title={title} />
      {/* 一点空隙 */}
      <Box sx={{ height: 15 }} />

      {/* 事件列表部分 */}
      <RSVPList />
    </Box>
  );
};

export default Rsvp;
