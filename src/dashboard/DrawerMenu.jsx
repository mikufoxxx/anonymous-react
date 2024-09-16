import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { Inbox as InboxIcon, Event, Group } from '@mui/icons-material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Badge from '@mui/material/Badge'; // 导入 Badge 组件
import useStore from '../store';

const drawerWidth = 240;

// Custom styled DrawerHeader
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function DrawerMenu({ open, handleMenuItemClick }) {
  const [openEvent, setOpenEvent] = useState(false);
  const [openManageClubs, setOpenManageClubs] = useState(false);
  const [openRandT, setopenRandT] = useState(false);
  const { currentStudent } = useStore()
  const unreadMessages = currentStudent?.messageCount; // 设定未读消息数量
  const isAdmin = currentStudent.clubs.length

  // Handlers to toggle sub-menus
  const handleEventClick = () => setOpenEvent(!openEvent);
  const handleManageClubsClick = () => setOpenManageClubs(!openManageClubs);
  const handleRandT = () => setopenRandT(!openRandT);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#2E3B55',  // 深色背景
          color: '#FFF',  // 白色字体
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader />
      <Divider sx={{ borderColor: '#FFFFFF33' }} />

      {/* 主菜单 */}
      <List>
        {/* Profile */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuItemClick('Profile')}>
            <ListItemIcon>
              <InboxIcon sx={{ color: '#FFFFFF' }} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>

        {/* Message */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuItemClick('Message')}>
            <ListItemIcon>
              <Badge badgeContent={unreadMessages} color="error"> {/* 使用 Badge 组件 */}
                <InboxIcon sx={{ color: '#FFFFFF' }} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Message" />
          </ListItemButton>
        </ListItem>

        {/* Event 菜单 */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleEventClick}>
            <ListItemIcon>
              <Event sx={{ color: '#FFFFFF' }} />
            </ListItemIcon>
            <ListItemText primary="Events" />
            {openEvent ? <ExpandLess sx={{ color: '#FFFFFF' }} /> : <ExpandMore sx={{ color: '#FFFFFF' }} />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openEvent} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('Upcoming Events')}>
              <ListItemIcon>
                <Event sx={{ color: '#FFFFFF' }} />
              </ListItemIcon>
              <ListItemText primary="Upcoming Events" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('Ongoing Events')}>
              <ListItemIcon>
                <Event sx={{ color: '#FFFFFF' }} />
              </ListItemIcon>
              <ListItemText primary="Ongoing Events" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('Past Events')}>
              <ListItemIcon>
                <Event sx={{ color: '#FFFFFF' }} />
              </ListItemIcon>
              <ListItemText primary="Past Events" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('Search Events')}>
              <ListItemIcon>
                <Event sx={{ color: '#FFFFFF' }} />
              </ListItemIcon>
              <ListItemText primary="Search Events" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* RSVP Events */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleRandT}>
            <ListItemIcon>
              <InboxIcon sx={{ color: '#FFFFFF' }} />
            </ListItemIcon>
            <ListItemText primary="RSVP & Tickets" />
            {openRandT ? <ExpandLess sx={{ color: '#FFFFFF' }} /> : <ExpandMore sx={{ color: '#FFFFFF' }} />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openRandT} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('My RSVP')}>
              <ListItemIcon>
                <Event sx={{ color: '#FFFFFF' }} />
              </ListItemIcon>
              <ListItemText primary="My RSVP" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('My Tickets')}>
              <ListItemIcon>
                <Event sx={{ color: '#FFFFFF' }} />
              </ListItemIcon>
              <ListItemText primary="My Tickets" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Manage Clubs 菜单 */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleManageClubsClick}>
            <ListItemIcon>
              <Group sx={{ color: '#FFFFFF' }} />
            </ListItemIcon>
            <ListItemText primary="Clubs" />
            {openManageClubs ? <ExpandLess sx={{ color: '#FFFFFF' }} /> : <ExpandMore sx={{ color: '#FFFFFF' }} />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openManageClubs} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('Search Club')}>
              <ListItemIcon>
                <Event sx={{ color: '#FFFFFF' }} />
              </ListItemIcon>
              <ListItemText primary="Search Club" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuItemClick('My Clubs')}>
              <ListItemIcon>
                <Event sx={{ color: '#FFFFFF' }} />
              </ListItemIcon>
              <ListItemText primary="My Clubs" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Funding Applications */}
        {isAdmin? <ListItem disablePadding>
          <ListItemButton onClick={() => handleMenuItemClick('Manage Students')}>
            <ListItemIcon>
              <InboxIcon sx={{ color: '#FFFFFF' }} />
            </ListItemIcon>
            <ListItemText primary="Manage Students" />
          </ListItemButton>
        </ListItem>:null}
      </List>
    </Drawer>
  );
}
