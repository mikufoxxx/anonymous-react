import React, { useState } from 'react';
import {
  Box, Button, List, ListItem, ListItemText, Card, CardContent, Typography, Pagination, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

// 假设俱乐部和他们的活动数据
const clubsData = [
  {
    id: 1,
    name: 'Tech Club',
    description: 'A club for tech enthusiasts.',
    location: 'Building A',
    events: [
      { id: 101, title: 'Tech Talk', venue: 'Auditorium', dateTime: '2024-08-15 14:00', description: 'A talk about tech.' },
      { id: 102, title: 'AI Workshop', venue: 'Room 101', dateTime: '2024-09-10 14:00', description: 'Hands-on AI workshop.' },
    ],
  },
  {
    id: 2,
    name: 'Music Club',
    description: 'A place for music lovers.',
    location: 'Building B',
    events: [
      { id: 103, title: 'Music Festival', venue: 'Central Park', dateTime: '2024-09-20 18:00', description: 'A grand music festival.' },
    ],
  },
  // 其他俱乐部数据...
];

export default function SearchList({ searchQuery }) {
  const [page, setPage] = useState(1);
  const clubsPerPage = 3;
  const [openEventsDialog, setOpenEventsDialog] = useState(false);
  const [selectedClubEvents, setSelectedClubEvents] = useState([]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // 打开俱乐部事件的对话框
  const handleOpenEventsDialog = (events) => {
    setSelectedClubEvents(events);
    setOpenEventsDialog(true);
  };

  // 关闭事件的对话框
  const handleCloseEventsDialog = () => {
    setOpenEventsDialog(false);
  };

  // 根据搜索查询过滤俱乐部
  const filteredClubs = clubsData.filter(
    (club) =>
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 获取当前页的俱乐部数据
  const startIndex = (page - 1) * clubsPerPage;
  const paginatedClubs = filteredClubs.slice(startIndex, startIndex + clubsPerPage);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 2,
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card sx={{ width: '80%', maxHeight: '600px', overflowY: 'auto' }}>
        <CardContent>
          {/* 滚动列表展示俱乐部 */}
          <List>
            {paginatedClubs.length > 0 ? (
              paginatedClubs.map((club) => (
                <ListItem
                  key={club.id}
                  sx={{
                    backgroundColor: 'rgba(46, 59, 85, 0.7)', // 50%透明度
                    color: 'white',
                    padding: '16px',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                        {club.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" component="span" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Location: {club.location}
                        </Typography>
                        <br />
                        <Typography variant="body2" component="span" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {club.description}
                        </Typography>
                      </>
                    }
                  />
                  <Box>
                    <Button variant="contained" sx={{ backgroundColor: '#FF5722', marginRight: '8px' }}>
                      Join Club
                    </Button>
                    <Button variant="contained" onClick={() => handleOpenEventsDialog(club.events)} sx={{ backgroundColor: '#2196F3' }}>
                      Events
                    </Button>
                  </Box>
                </ListItem>
              ))
            ) : (
              <Typography>No clubs found</Typography>
            )}
          </List>
        </CardContent>
      </Card>

      {/* 分页组件 */}
      {filteredClubs.length > 0 && (
        <Pagination
          count={Math.ceil(filteredClubs.length / clubsPerPage)}
          page={page}
          onChange={handlePageChange}
          sx={{ marginTop: 2 }}
        />
      )}

      {/* 事件展示对话框 */}
      <Dialog open={openEventsDialog} onClose={handleCloseEventsDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Club Events</DialogTitle>
        <DialogContent>
          <List>
            {selectedClubEvents.length > 0 ? (
              selectedClubEvents.map((event) => (
                <ListItem key={event.id} sx={{ marginBottom: '8px', padding: '8px', backgroundColor: '#f5f5f5' }}>
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <>
                        <Typography variant="body2">Venue: {event.venue}</Typography>
                        <Typography variant="body2">Date: {event.dateTime}</Typography>
                        <Typography variant="body2">{event.description}</Typography>
                      </>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No events available for this club.</Typography>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEventsDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
