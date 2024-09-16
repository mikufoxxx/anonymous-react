import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from './AppBar';
import DrawerMenu from './DrawerMenu';
import Profile from './profile/Profile';
import Content from './Content';
import UpComingEvents from './events/UpComingEvents';
import OngoingEvents from './events/OngoingEvents';
import PastEvents from './events/PastEvents';
import Rsvp from './rsvpandtickets/Rsvp';
import Tickets from './rsvpandtickets/Tickets';
import SearchEvents from './events/SearchEvents';
import Messages from './messages/Messages';
import ManageStudent from './managestudents/ManageStudent';
import MyClubs from './clubs/MyClubs';
import SearchClub from './clubs/SearchClub';
import useStore from '../store';
import useSWRMutation from 'swr/mutation';
import RSVPAndTicketsApi from '../api/RSVPAndTickets';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clubsApi from '../api/clubs';
import eventsApi from '../api/event';
import { useRef } from 'react';

const drawerWidth = 240;

function classifyEvents(events) {
    const now = new Date();
    const upcomingEvents = [];
    const ongoingEvents = [];
    const pastEvents = [];

    events.forEach(event => {
        const startDateTime = new Date(`${event.startDate}T${event.startTime}`);
        const endDateTime = new Date(`${event.endDate}T${event.endTime}`);

        if (endDateTime < now) {
            pastEvents.push(event);
        } else if (startDateTime <= now && endDateTime >= now) {
            ongoingEvents.push(event);
        } else {
            upcomingEvents.push(event);
        }
    });

    return {
        upcomingEvents,
        ongoingEvents,
        pastEvents
    };
}


export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [content, setContent] = useState('Profile');
  const [currentTitle, setCurrentTitle] = useState('Profile');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleMenuItemClick = (newContent) => {
    setCurrentTitle(newContent);
    setContent(newContent);
  };

  const renderContent = () => {
    switch (content) {
      case 'Profile':
        return <Profile />;
      case 'Upcoming Events':
        return <UpComingEvents />;
      case 'Ongoing Events':
        return <OngoingEvents />;
      case 'Past Events':
        return <PastEvents />;
      case 'My RSVP':
        return <Rsvp />;
      case 'My Tickets':
        return <Tickets />;
      case 'Search Events':
        return <SearchEvents />;
      case 'Message':
        return <Messages />;
      case 'Manage Students':
        return <ManageStudent />;
      case 'Search Club':
        return <SearchClub />;
      case 'My Clubs':
        return <MyClubs />;
      // 你可以继续添加更多组件
      default:
        return <Content content={content} />;
    }
  };

  const { currentStudent, setCurrentStudent } = useStore();
  if (!currentStudent) {
    location.href = "/signin"
  }
  const timer = useRef(null)
  const { trigger: mutate } = useSWRMutation("getAllTickets", async () => {
    const { data } = await RSVPAndTicketsApi.getTicketByStudentId(currentStudent.studentID);
    // const events = await Promise.all(currentStudent.clubs.map(async ({clubID})=>await  clubsApi.getAllEventsByClubID(clubID)))
    timer.current && clearInterval(timer.current)
    timer.current = setInterval(async() => {
      const { data: { events:allEvents } } = await eventsApi.getAllEventsByClubID()
      // const allEvents = [];
      // events.map((event) => {
      //   allEvents.push(...event.data.events)
      // })

      const student = data?.tickets?.[0]?.attendee || {};
      // data?.tickets.map(({ event }) => event)) }
      if (student) {
        setCurrentStudent({ ...student, ...currentStudent, events: classifyEvents(allEvents) })
      }
    },2000)
  });
  useEffect(() => {
    mutate();
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen} currentTitle={currentTitle} />
      <DrawerMenu open={open} handleMenuItemClick={handleMenuItemClick} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: '64px 24px 24px', // AppBar 的高度
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start', // 从顶部开始排列内容
          backgroundColor: '#f0f2f5', // 灰色背景
          minHeight: 'calc(100vh - 64px)', // 内容占满视口高度，减去 AppBar 的高度
          overflow: 'hidden', // 外层不滚动，避免和内容冲突
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '800px',  // 设置最大宽度
            margin: '0 auto',
            padding: '16px',
            overflowY: 'auto',  // 让内容部分可以滚动
            maxHeight: 'calc(100vh - 64px)', // 内容高度限制
            '::-webkit-scrollbar': { display: 'none' },  // 隐藏滚动条（适用于 Chrome, Safari）
            '-ms-overflow-style': 'none',  // 隐藏滚动条（适用于 IE 和 Edge）
            'scrollbar-width': 'none',  // 隐藏滚动条（适用于 Firefox）
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
}
