import React from 'react';
import { Box, Card, CardContent, Typography, Grid, List, ListItem, ListItemText, Divider, styled } from '@mui/material';
import useStore from '../../store';

// 定义卡片标题样式
const CardTitle = styled(Box)(({ theme }) => ({
  backgroundColor: '#2E3B55',
  color: '#fff',
  textAlign: 'center',
  padding: theme.spacing(1),
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
}));

const Info = ({ clubs, events }) => {
  const { currentStudent } = useStore();
  return (
    <Grid container spacing={3} justifyContent="center">
      {/* Clubs Section */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardTitle>
            <Typography variant="h6">
              {currentStudent.name}
            </Typography>
          </CardTitle>
          <CardContent>
            <List>
              {clubs.map((club, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ justifyContent: 'center', textAlign: 'center' }}>
                    <ListItemText primary={club.name} />
                  </ListItem>
                  {index < clubs.length - 1 && <Divider variant="middle" />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Events Section */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardTitle>
            <Typography variant="h6">
              Ongoing Events
            </Typography>
          </CardTitle>
          <CardContent>
            <List>
              {events.map((event, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ justifyContent: 'center', textAlign: 'center' }}>
                    <ListItemText primary={event.title} />
                  </ListItem>
                  {index < events.length - 1 && <Divider variant="middle" />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Info;
