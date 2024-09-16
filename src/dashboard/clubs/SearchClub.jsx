import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import Welcome from './Welcome';
import SearchList from './SearchList'; // 导入 EventList 组件

const SearchClub = () => {
  const title = 'Search Events';
  const [searchQuery, setSearchQuery] = useState(''); // 搜索状态

  // 处理搜索输入的变化
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // 更新搜索查询
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Welcome Section */}

      {/* 一点空隙 */}
      <Box sx={{ height: 15 }} />

      {/* 搜索框 */}
      <TextField
        label="Search Club"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange} // 调用搜索处理函数
        sx={{ marginBottom: 3, color: 'white' }}
      />

      {/* 事件列表部分，传递 searchQuery 作为 prop */}
      <SearchList searchQuery={searchQuery} />
    </Box>
  );
};

export default SearchClub;
