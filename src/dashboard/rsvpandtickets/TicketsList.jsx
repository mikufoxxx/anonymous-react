import React, { useState } from 'react';
import {
  Box, Button, List, ListItem, ListItemText, Card, CardContent, Typography, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField, Pagination
} from '@mui/material';
import RSVPAndTicketsApi from '../../api/RSVPAndTickets';
import useStore from '../../store';
import useSWR from 'swr';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';

const eventsData = [
  { id: 1, title: 'Tech Talk', venue: 'Auditorium', dateTime: '2024-08-15 14:00', description: 'A talk about tech.' },
  { id: 2, title: 'Music Festival', venue: 'Central Park', dateTime: '2024-09-10 16:00', description: 'A grand music festival.' },
  { id: 3, title: 'Art Exhibition', venue: 'Art Gallery', dateTime: '2024-09-20 10:00', description: 'An exhibition showcasing modern art.' },
  { id: 4, title: 'Tech Seminar', venue: 'Tech Hall', dateTime: '2024-10-01 12:00', description: 'Seminar on the latest tech trends.' },
  { id: 5, title: 'Design Conference', venue: 'Design Center', dateTime: '2024-10-10 09:00', description: 'A conference on innovative design.' },
  { id: 6, title: 'Networking Event', venue: 'Business Lounge', dateTime: '2024-11-15 18:00', description: 'Networking with industry leaders.' },
  { id: 7, title: 'Photography Workshop', venue: 'Studio X', dateTime: '2024-12-05 15:00', description: 'Workshop on photography techniques.' },
  { id: 8, title: 'AI Conference', venue: 'AI Center', dateTime: '2025-01-12 10:00', description: 'A conference about AI advancements.' },
  { id: 9, title: 'Startup Pitch', venue: 'Startup Hub', dateTime: '2025-02-01 13:00', description: 'Pitching competition for startups.' },
  // 假设还有更多事件数据
];

export default function TicketsList() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvpData, setRsvpData] = useState({
    attendeeID: '',
    applicantID: '',
    eventID: '',
  });

  const [page, setPage] = useState(1);
  const eventsPerPage = 3;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // 处理 RSVP 表单输入
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRsvpData({ ...rsvpData, [name]: value });
  };

  const { currentStudent } = useStore();
  const { data: allTickets = [],trigger:mutate } = useSWRMutation("getAllTickets", async () => {
    const { data } = await RSVPAndTicketsApi.getTicketByStudentId(currentStudent.studentID);

    return data.tickets.map((item) => {
      const { event } = item;
      return { id: item.rsvpID, title: event.title, venue: event.title.address, dateTime: `${event.startDate}${event.startTime}`, description: `${event.description}` }
    }) || [];
  });
  useEffect(() => {
    mutate();
  },[])
  // 获取当前页的 events 数据
  const startIndex = (page - 1) * eventsPerPage;
  const paginatedEvents = allTickets.slice(startIndex, startIndex + eventsPerPage);

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
            {paginatedEvents.map((event) => (
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
        Venue: {event.venue}
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

              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* 分页组件 */}
      <Pagination
        count={Math.ceil(allTickets.length / eventsPerPage)}
        page={page}
        onChange={handlePageChange}
        sx={{ marginTop: 2 }}
      />
    </Box>
  );
}
