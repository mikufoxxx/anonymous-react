import React, { useState } from 'react';
import {
  Box, Button, List, ListItem, ListItemText, Card, CardContent, Typography, Pagination, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField
} from '@mui/material';
import useStore from '../../store';
import useSWRMutation from 'swr/mutation';
import clubsApi from '../../api/clubs';
import eventsApi from '../../api/event';
import { useEffect } from 'react';

const eventsData = [
  { id: 1, title: 'Tech Talk', venue: 'Auditorium', dateTime: '2024-08-15 14:00', description: 'A talk about tech.' },
  { id: 2, title: 'Music Festival', venue: 'Central Park', dateTime: '2024-09-10 16:00', description: 'A grand music festival.' },
  { id: 3, title: 'Art Exhibition', venue: 'Art Gallery', dateTime: '2024-09-20 10:00', description: 'An exhibition showcasing modern art.' },
  // 假设还有更多事件数据...
];

export default function EventList({ searchQuery }) { // 接收 searchQuery prop
  const [page, setPage] = useState(1);
  const eventsPerPage = 3;

  // RSVP Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvpData, setRsvpData] = useState({
    attendeeID: '',
    applicantID: '',
    eventID: '',
  });

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // 打开 RSVP 对话框
  const handleOpenDialog = (event) => {
    setSelectedEvent(event);
    setRsvpData({ ...rsvpData, eventID: event.id }); // 设置 eventID
    // setOpenDialog(true);
    addRsvp(event)
  };

  // 关闭 RSVP 对话框
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // 处理 RSVP 表单输入
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRsvpData({ ...rsvpData, [name]: value });
  };

  // 提交 RSVP 表单
  const handleRSVPSubmit = () => {
    handleCloseDialog(); // 提交完成后关闭弹窗
  };

  // 获取当前页的 events 数据'
  const { currentStudent } = useStore();
  const { data: events = [],trigger:mutate } = useSWRMutation("getAllEventsByClubID", async () => {
    //const { data } = await eventsApi.getAllEventsByClubID();
    // return  data.events|| [];
    const data =[]
    Object.values(currentStudent.events).forEach((v) => {
      data.push(...v)
    })
    return data;
  });

  const { trigger: addRsvp } = useSWRMutation("getAllApplicationByClubID", async (_,{arg}) => {
    const apps = await clubsApi.getAllApplicationByClubID(arg.clubID);
    const { data } = await eventsApi.addRSVP(currentStudent.studentID,apps.data.applicationID,arg.eventID);
    return  data.events|| [];
  });

  useEffect(() => {
    mutate();
  }, [])

  const eventsData = events;

  // 根据搜索查询过滤事件
  const filteredEvents = eventsData.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venueID.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 获取当前页的 events 数据
  const startIndex = (page - 1) * eventsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

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
          {/* 滚动列表展示 events */}
          <List>
            {paginatedEvents.length > 0 ? (
              paginatedEvents.map((event) => (
                <ListItem
                  key={event.id}
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
                        {event.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" component="span" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Venue: {event.venueID}
                        </Typography>
                        <br />
                        <Typography variant="body2" component="span" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Date: {event.dateTime}
                        </Typography>
                        <br />
                        <Typography variant="body2" component="span" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {event.description}
                        </Typography>
                      </>
                    }
                  />
                  <Button variant="contained" sx={{ backgroundColor: '#FF5722' }} onClick={() => handleOpenDialog(event)}>
                    Apply RSVP
                  </Button>
                </ListItem>
              ))
            ) : (
              <Typography>No events found</Typography>
            )}
          </List>
        </CardContent>
      </Card>

      {/* 分页组件 */}
      {filteredEvents.length > 0 && (
        <Pagination
          count={Math.ceil(filteredEvents.length / eventsPerPage)}
          page={page}
          onChange={handlePageChange}
          sx={{ marginTop: 2 }}
        />
      )}

      {/* RSVP Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>RSVP for {selectedEvent?.title}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Attendee ID"
            type="text"
            fullWidth
            name="attendeeID"
            value={rsvpData.attendeeID}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Applicant ID"
            type="text"
            fullWidth
            name="applicantID"
            value={rsvpData.applicantID}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Event ID"
            type="text"
            fullWidth
            name="eventID"
            value={rsvpData.eventID}
            onChange={handleChange}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleRSVPSubmit} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
