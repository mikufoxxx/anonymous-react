import React, { useState,useEffect } from 'react';
import {
  Box, Button, List, ListItem, ListItemText, Card, CardContent, Typography, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField, Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import useStore from '../../store';
import useSWRMutation from 'swr/mutation';
import clubsApi from '../../api/clubs';

// 假设俱乐部、事件和资金申请的数据，省略数据部分
const clubsData = [
  {
    id: 1,
    name: 'Tech Club',
    events: [
      { id: 101, title: 'Tech Talk', venue: 'Auditorium', dateTime: '2024-08-15 14:00', description: 'A talk about tech.', capacity: '50', cost: '500' },
      { id: 102, title: 'Tech Seminar', venue: 'Tech Hall', dateTime: '2024-10-01 12:00', description: 'Seminar on the latest tech trends.', capacity: '100', cost: '1000' },
      { id: 103, title: 'AI Conference', venue: 'AI Center', dateTime: '2025-01-12 10:00', description: 'A conference about AI advancements.', capacity: '200', cost: '1500' },
    ],
    fundingApplications: [
      { id: 201, semester: '2024-1', requestedAmount: 1000, suggestion: 'Tech equipment', clubID: 1 },
    ],
  },
  {
    id: 2,
    name: 'Music Club',
    events: [
      { id: 104, title: 'Music Festival', venue: 'Central Park', dateTime: '2024-09-10 16:00', description: 'A grand music festival.', capacity: '300', cost: '2000' },
      { id: 105, title: 'Music Workshop', venue: 'Studio X', dateTime: '2024-12-05 15:00', description: 'A workshop on music composition.', capacity: '50', cost: '600' },
    ],
    fundingApplications: [
      { id: 202, semester: '2024-2', requestedAmount: 2000, suggestion: 'Sound equipment', clubID: 2 },
    ],
  },
  {
    id: 3,
    name: 'Photography Club',
    events: [
      { id: 106, title: 'Photography Exhibition', venue: 'Art Gallery', dateTime: '2024-11-20 10:00', description: 'An exhibition of modern photography.', capacity: '150', cost: '1200' },
      { id: 107, title: 'Photography Workshop', venue: 'Studio Y', dateTime: '2024-12-01 13:00', description: 'A workshop on advanced photography techniques.', capacity: '50', cost: '700' },
    ],
    fundingApplications: [
      { id: 203, semester: '2024-1', requestedAmount: 1500, suggestion: 'Photography equipment', clubID: 3 },
    ],
  },
  // 更多俱乐部...
];

export default function ClubList() {
  const { currentStudent } = useStore();
  const clubsData = currentStudent.clubs;
  const [openEventsDialog, setOpenEventsDialog] = useState(false);
  const [openFundingDialog, setOpenFundingDialog] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingFunding, setEditingFunding] = useState(null);

  // 分页状态
  const [clubPage, setClubPage] = useState(1);
  const clubsPerPage = 3;
  const [eventPage, setEventPage] = useState(1);
  const eventsPerPage = 3;
  const [fundingPage, setFundingPage] = useState(1);
  const fundingsPerPage = 3;

  const { trigger: getAllEventsByClubID, data: events } = useSWRMutation("getAllEventsByClubID", async (_, { arg }) => {
    const { data } = await clubsApi.getAllEventsByClubID(arg)
    return data.events || [];
  })

  const { trigger: getAllApplicationByClubID, data: apps } = useSWRMutation("getAllEventsByClubID", async (_, { arg }) => {
    const { data } = await clubsApi.getAllApplicationByClubID(arg)
    return data ? [data] : [];
  })


  const { trigger: updateApplication } = useSWRMutation("updateApplication", async (_, { arg }) => {
    const { data } = await clubsApi.updateApplication({
      description: '',
      clubID: selectedClub.clubID,
      ...editingFunding,
      ...arg,
    })

    if (arg.isSubmit) {
      await clubsApi.saveApplication({ clubID: selectedClub.clubID })
    }

    return data ? [data] : [];
  }, {
    onSuccess: async () => {
      setEditingFunding(null)
      getAllApplicationByClubID(selectedClub.clubID)
    }
  })

  const { trigger: updateEvent } = useSWRMutation("updateEvent", async (_, { arg }) => {
    const { data } = await clubsApi.updateEvent({
      clubID: selectedClub.clubID,
      ...editingEvent,
      ...arg,
    })
    return data ? [data] : [];
  }, {
    onSuccess: async () => {
      setEditingEvent(null)
      getAllEventsByClubID(selectedClub.clubID)
    }
  })

  const { trigger: deleteEvent } = useSWRMutation("deleteEvent", async (_, { arg }) => {
    const { data } = await clubsApi.deleteEvent(arg.eventID)
    return data;
  }, {
    onSuccess: async () => {
      setEditingEvent(null)
      getAllEventsByClubID(selectedClub.clubID)
    }
  })

  const { trigger: createEvent } = useSWRMutation("createEvent", async (_, { arg }) => {
    const { data } = await clubsApi.createEvent({
      clubID: selectedClub.clubID,
      ...editingEvent,
      ...arg,
    })
    return data ? [data] : [];
  }, {
    onSuccess: async () => {
      setEditingEvent(null)
      getAllEventsByClubID(selectedClub.clubID)
    }
  })

  const {data:allVenues,trigger:mutate} =useSWRMutation("getAllVenue", async () => {
    const {data} = await clubsApi.getVenue();
    return data?.venues || [];
  });

  useEffect(() => {
    mutate()
  },[])

  // 获取当前分页的俱乐部
  const getPaginatedClubs = () => {
    const startIndex = (clubPage - 1) * clubsPerPage;
    return clubsData.slice(startIndex, startIndex + clubsPerPage);
  };

  // 获取当前分页的事件
  const getPaginatedEvents = () => {
    return events || [];
  };

  // 获取当前分页的资金申请
  const getPaginatedFundings = () => {
    // const startIndex = (fundingPage - 1) * fundingsPerPage;
    // return selectedClub?.fundingApplications.slice(startIndex, startIndex + fundingsPerPage);
    return apps || [];
  };

  // 事件对话框处理函数
  const handleOpenEventsDialog = (club) => {
    setSelectedClub(club);
    setEventPage(1); // 重置分页
    setOpenEventsDialog(true);
    getAllEventsByClubID(club.clubID)
  };

  // 资金申请对话框处理函数
  const handleOpenFundingDialog = (club) => {
    setSelectedClub(club);
    setFundingPage(1); // 重置分页
    setOpenFundingDialog(true);
    getAllApplicationByClubID(club.clubID)
  };

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
      {/* 俱乐部列表 */}
      <Card sx={{ width: '80%', maxHeight: '600px', overflowY: 'auto' }}>
        <CardContent>
          <List>
            {getPaginatedClubs().map((club) => (
              <ListItem
                key={club.id}
                sx={{
                  backgroundColor: 'rgba(46, 59, 85, 0.7)',
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
                  primary={<Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>{club.name}</Typography>}
                />
                <Box>
                  <Button variant="contained" onClick={() => handleOpenEventsDialog(club)} sx={{ backgroundColor: '#2196F3', marginRight: '8px' }}>
                    Events
                  </Button>
                  <Button variant="contained" onClick={() => handleOpenFundingDialog(club)} sx={{ backgroundColor: '#FF5722' }}>
                    Funding Application
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <Pagination
        count={Math.ceil(clubsData.length / clubsPerPage)}
        page={clubPage}
        onChange={(e, value) => setClubPage(value)}
        sx={{ marginTop: 2 }}
      />

      {/* 事件对话框 */}
      <Dialog open={openEventsDialog} onClose={() => setOpenEventsDialog(false)} maxWidth="sm" sx={{ alignItems: 'center' }} fullWidth>
        <DialogTitle>Events for {selectedClub?.name}</DialogTitle>
        <DialogContent>
          <List>
            {getPaginatedEvents()?.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: 'rgba(46, 59, 85, 0.7)',
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
                  primary={<Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>{event.title}</Typography>}
                  secondary={
                    <>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>VenueId: {event.venueID}</Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Date: {event.startDate} {event.startTime}</Typography>
                    </>
                  }
                />
                <Button variant="contained" sx={{ backgroundColor: '#red',margin:"0 10px"}} onClick={() => deleteEvent(event)}>Delete Event</Button>
                <Button variant="contained" onClick={() => setEditingEvent(event)} sx={{ backgroundColor: '#FF5722' }}>Edit</Button>
              </ListItem>
            ))}
          </List>
          <Pagination
            count={Math.ceil(getPaginatedEvents().length / eventsPerPage)}
            page={eventPage}
            onChange={(e, value) => setEventPage(value)}
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingEvent({})}>Create Event</Button>
          <Button onClick={() => setOpenEventsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* 资金申请对话框 */}
      <Dialog open={openFundingDialog} onClose={() => setOpenFundingDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Funding Applications for {selectedClub?.name}</DialogTitle>
        <DialogContent>
          <List>
            {getPaginatedFundings()?.map((funding) => (
              <ListItem
                key={funding.id}
                sx={{
                  backgroundColor: 'rgba(46, 59, 85, 0.7)',
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
                  primary={<Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>Semester: {funding.semester}</Typography>}
                  secondary={
                    <>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Amount: ${funding.requestedAmount}</Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Suggestion: {funding.suggestion}</Typography>
                    </>
                  }
                />
                <Button disabled={funding.status === "Submitted"} variant="contained" onClick={() => {
                  setEditingFunding(funding)
                }} sx={{ backgroundColor: '#FF5722' }}>Edit</Button>
              </ListItem>
            ))}
          </List>
          <Pagination
            count={Math.ceil(getPaginatedFundings() / fundingsPerPage)}
            page={fundingPage}
            onChange={(e, value) => setFundingPage(value)}
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={getPaginatedFundings().length} onClick={() => setEditingFunding({})}>Create Funding</Button>
          <Button onClick={() => setOpenFundingDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* 编辑事件对话框 */}
      {editingEvent && (
        <Dialog component="form" onSubmit={(event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);
          const data = Object.fromEntries(formData.entries()); // Convert FormData to a plain object
          editingEvent.eventID ? updateEvent(data):createEvent({ ...data})
          return false;
        }} open={Boolean(editingEvent)}>
          <DialogTitle>{editingEvent.eventID ? 'Edit Event' : 'Create Event'}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Title"
              name="title"
              fullWidth
              defaultValue={editingEvent.title || ''}
            />
            <TextField
              margin="dense"
              label="Description"
              name="description"
              fullWidth
              defaultValue={editingEvent.description || ''}
            />
            <TextField
              margin="dense"
              label="Capacity"
              name="capacity"
              fullWidth
              defaultValue={editingEvent.capacity || ''}
            />
            <TextField
              margin="dense"
              label="Start Date"
              name="startDate"
              type="date"
              fullWidth
              defaultValue={editingEvent.startDate || ''}
            />
            <TextField
              margin="dense"
              label="End Date"
              type="date"
              name="endDate"
              fullWidth
              defaultValue={editingEvent.endDate || ''}
            />
            <TextField
              margin="dense"
              label="Start Time"
              name="startTime"
              type="time"
              fullWidth
              defaultValue={editingEvent.startTime || ''}
            />
            <TextField
              margin="dense"
              label="End Time"
              type="time"
              name="endTime"
              fullWidth
              defaultValue={editingEvent.endTime || ''}
            />
            <TextField
              margin="dense"
              label="Cost"
              type='number'
              name="cost"
              fullWidth
              defaultValue={editingEvent.cost || ''}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="venue-select-label">Venue</InputLabel>
              <Select
                name="venueID"
                labelId="venue-select-label"
                defaultValue={editingEvent.venueID || ''}
              >
                {allVenues.map((venue) => (
                  <MenuItem key={venue.venueID} value={venue.venueID}>
                    {venue.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditingEvent(null)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* 编辑资金申请对话框 */}
      {editingFunding && (
        <Dialog component="form" open={Boolean(editingFunding)} onClose={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const data = Object.fromEntries(formData.entries()); // Convert FormData to a plain object
          updateApplication(data)
        }} onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const data = Object.fromEntries(formData.entries()); // Convert FormData to a plain object
          updateApplication({ ...data, isSubmit: true })
          return false;
        }}>
          <DialogTitle>{editingFunding.clubID ? 'Edit Funding' : 'Create Funding'}</DialogTitle>
          <DialogContent>
            <TextField
              name='semester'
              margin="dense"
              label="Semester"
              fullWidth
              defaultValue={editingFunding.semester || ''}
              required
            />
            <TextField
              name='requestedAmount'
              margin="dense"
              label="Requested Amount"
              fullWidth
              defaultValue={editingFunding.requestedAmount || ''}
              required
            />
            <TextField
              name="suggestion"
              margin="dense"
              label="Suggestion"
              fullWidth
              defaultValue={editingFunding.suggestion || ''}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditingFunding(null)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
