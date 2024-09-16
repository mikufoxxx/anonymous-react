// Profile.js
import React from 'react';
import { Box } from '@mui/material';
import Welcome from './Welcome';
import ProfileCard from './ProfileCard';
import Info from './Info';
import useStore from '../../store';

      // upcomingEvents,
      //   ongoingEvents,
      //   pastEvents
const Profile = () => {
  const { currentStudent } = useStore();
  const userName = currentStudent.name;
  const email = currentStudent.email;
  const role = currentStudent.clubs.length ? 'Admin' : [];
  const clubs =  currentStudent.clubs || [];
  const events = currentStudent.events?.ongoingEvents || [];
  return (
    <Box sx={{ padding: 2 }}>
      {/* Welcome Section */}
      <Welcome userName={userName}/>
      <Box sx={{ height: 30 }} />

      {/* Profile Card Section */}
      <ProfileCard name={userName} email={email} role={role} />
      <Box sx={{ height: 30 }} />
      {/* Info Section */}
      <Info clubs={clubs} events={events} />
    </Box>
  );
};

export default Profile;
