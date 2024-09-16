import React from 'react';
import { Box } from '@mui/material';
import Welcome from './Welcome';
import StudentList from './StudentList';

const ManageStudent = () => {
  const title = 'Manage Students';


  return (
    <Box sx={{ padding: 2 }}>
      {/* Welcome Section */}
      <Welcome title={title} />
      {/* 一点空隙 */}
      <Box sx={{ height: 15 }} />

      {/* 事件列表部分 */}
      <StudentList />  {/* 调用上面的 EventList 组件 */}
    </Box>
  );
};

export default ManageStudent;
